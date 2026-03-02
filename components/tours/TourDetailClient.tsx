"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Users,
  CalendarDays,
  Tag,
  Check,
  X,
  Star,
  Heart,
  Share2,
  ChevronRight,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";
import { formatINR, formatDuration } from "@/lib/utils/format";

// ─── Types ────────────────────────────────────────────────

interface TourDetailClientProps {
  slug: string;
}

type TabId = "overview" | "itinerary" | "accommodation" | "inclusions" | "reviews";
type InquiryStatus = "idle" | "loading" | "success" | "error";

// ─── Mock tour data (keyed by slug) ───────────────────────

interface MockTourDetail {
  id: string;
  slug: string;
  title: string;
  dest: string;
  days: number;
  price: number;
  exp: string;
  isDomestic: boolean;
  gradient: string;
  groupTypes: string[];
  bestTime: string;
}

const MOCK_TOURS: Record<string, MockTourDetail> = {
  "enchanting-rajasthan-circuit":   { id: "1",  slug: "enchanting-rajasthan-circuit",   title: "Enchanting Rajasthan Circuit",       dest: "Rajasthan, India",        days: 10, price: 85000,  exp: "Scenic Escapes",     isDomestic: true,  gradient: "from-amber-800 via-orange-900 to-brand-dark",  groupTypes: ["Couple", "Family"],  bestTime: "Oct–Mar" },
  "kerala-backwater-spice-trail":   { id: "2",  slug: "kerala-backwater-spice-trail",   title: "Kerala Backwater & Spice Trail",     dest: "Kerala, India",           days: 7,  price: 65000,  exp: "Scenic Escapes",     isDomestic: true,  gradient: "from-green-800 via-emerald-900 to-brand-dark", groupTypes: ["Couple", "Family"],  bestTime: "Oct–Feb" },
  "japan-cherry-blossom":           { id: "3",  slug: "japan-cherry-blossom",           title: "Japan Cherry Blossom Tour",          dest: "Tokyo & Kyoto, Japan",    days: 12, price: 185000, exp: "Scenic Escapes",     isDomestic: false, gradient: "from-pink-700 via-rose-900 to-brand-dark",    groupTypes: ["Couple", "Solo"],    bestTime: "Mar–Apr" },
  "swiss-alps-rhine-cruise":        { id: "4",  slug: "swiss-alps-rhine-cruise",        title: "Swiss Alps & Rhine Cruise",          dest: "Switzerland",             days: 10, price: 240000, exp: "Blue Escapes",       isDomestic: false, gradient: "from-blue-700 via-indigo-900 to-brand-dark",  groupTypes: ["Couple", "Family"],  bestTime: "Jun–Sep" },
  "maldives-overwater-paradise":    { id: "5",  slug: "maldives-overwater-paradise",    title: "Maldives Overwater Paradise",        dest: "Maldives",                days: 6,  price: 145000, exp: "Signature Stays",    isDomestic: false, gradient: "from-sky-600 via-cyan-900 to-brand-dark",     groupTypes: ["Couple", "Solo"],    bestTime: "Nov–Apr" },
  "himalayan-expedition-ladakh":    { id: "6",  slug: "himalayan-expedition-ladakh",    title: "Himalayan Expedition: Leh Ladakh",   dest: "Leh-Ladakh, India",       days: 8,  price: 72000,  exp: "Outdoor Thrills",    isDomestic: true,  gradient: "from-slate-700 via-blue-900 to-brand-dark",   groupTypes: ["Solo", "Group"],     bestTime: "Jun–Sep" },
  "bali-wellness-retreat":          { id: "7",  slug: "bali-wellness-retreat",          title: "Bali Spiritual & Wellness Retreat",  dest: "Bali, Indonesia",         days: 9,  price: 120000, exp: "Wellness Reset",     isDomestic: false, gradient: "from-teal-700 via-green-900 to-brand-dark",   groupTypes: ["Solo", "Couple"],    bestTime: "Apr–Oct" },
  "tuscany-food-wine":              { id: "8",  slug: "tuscany-food-wine",              title: "Tuscany Food & Wine Tour",           dest: "Tuscany, Italy",          days: 8,  price: 210000, exp: "Legendary Journeys",  isDomestic: false, gradient: "from-red-800 via-rose-900 to-brand-dark",     groupTypes: ["Couple", "Group"],   bestTime: "Apr–Oct" },
  "amazon-adventure":               { id: "9",  slug: "amazon-adventure",               title: "Amazon Rainforest Adventure",        dest: "Amazon, Brazil",          days: 10, price: 275000, exp: "Outdoor Thrills",    isDomestic: false, gradient: "from-green-800 via-lime-900 to-brand-dark",   groupTypes: ["Solo", "Group"],     bestTime: "Jun–Nov" },
  "andaman-islands-escape":         { id: "10", slug: "andaman-islands-escape",         title: "Andaman Islands Escape",             dest: "Andaman Islands, India",  days: 6,  price: 58000,  exp: "Blue Escapes",       isDomestic: true,  gradient: "from-cyan-700 via-teal-900 to-brand-dark",    groupTypes: ["Couple", "Family"],  bestTime: "Oct–May" },
  "bhutan-kingdom-tigers-nest":     { id: "11", slug: "bhutan-kingdom-tigers-nest",     title: "Bhutan Kingdom & Tiger's Nest",      dest: "Thimphu & Paro, Bhutan",  days: 7,  price: 130000, exp: "Earth's Marvels",    isDomestic: false, gradient: "from-stone-700 via-amber-900 to-brand-dark",  groupTypes: ["Solo", "Couple"],    bestTime: "Mar–May" },
  "diwali-varanasi":                { id: "12", slug: "diwali-varanasi",                title: "Diwali in Varanasi Experience",      dest: "Varanasi, India",         days: 5,  price: 45000,  exp: "Festive Getaways",   isDomestic: true,  gradient: "from-orange-700 via-yellow-900 to-brand-dark", groupTypes: ["Family", "Group"],  bestTime: "Oct–Nov" },
};

const FALLBACK_TOUR: MockTourDetail = MOCK_TOURS["enchanting-rajasthan-circuit"];

// ─── Shared input class ───────────────────────────────────

const inputCls = cn(
  "w-full rounded-xl px-4 py-3 text-sm font-sans",
  "bg-white border border-gray-200 text-brand-dark placeholder-brand-grey/50",
  "focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20",
  "transition-colors duration-150"
);

// ─── Tab: Overview ────────────────────────────────────────

function TabOverview({ tour }: { tour: MockTourDetail }) {
  const highlights = [
    "Private sightseeing with a dedicated expert guide throughout the journey",
    "Handpicked heritage and luxury accommodation reflecting each destination",
    "Immersive cultural experiences and authentic local encounters",
    "All internal transfers in air-conditioned vehicles",
    "Carefully curated dining at acclaimed local restaurants",
    "Flexible pacing — never rushed, always savoured",
  ];

  const galleryGradients = [
    "from-amber-600 to-orange-800",
    "from-rose-600 to-pink-800",
    "from-teal-600 to-emerald-800",
    "from-blue-600 to-indigo-800",
    "from-stone-500 to-amber-800",
    "from-green-600 to-lime-800",
  ];

  return (
    <div className="space-y-10">
      {/* About */}
      <div>
        <h2 className="font-playfair text-2xl font-bold text-brand-dark mb-4">About This Tour</h2>
        <p className="font-lora text-brand-grey leading-relaxed mb-4">
          This meticulously crafted journey takes you through the very heart of {tour.dest}, weaving together
          iconic landmarks, hidden gems, and genuine cultural immersion. Every detail — from the rhythm of
          your days to the calibre of your accommodation — has been thoughtfully designed to offer a travel
          experience that is as effortless as it is extraordinary.
        </p>
        <p className="font-lora text-brand-grey leading-relaxed">
          Whether this is your first time discovering {tour.dest} or a return visit with fresh eyes,
          our {tour.days}-day itinerary promises revelations at every turn. Small group sizes ensure
          personal attention, while our network of local partners opens doors that independent travellers
          simply cannot access.
        </p>
      </div>

      {/* Highlights */}
      <div>
        <h2 className="font-playfair text-2xl font-bold text-brand-dark mb-5">Tour Highlights</h2>
        <ul className="space-y-3">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                <Check size={11} className="text-brand-orange" strokeWidth={3} />
              </span>
              <span className="font-lora text-brand-grey text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Photo Gallery */}
      <div>
        <h2 className="font-playfair text-2xl font-bold text-brand-dark mb-5">Photo Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryGradients.map((grad, i) => (
            <div
              key={i}
              className={cn(
                "h-48 rounded-xl bg-gradient-to-br overflow-hidden",
                grad
              )}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="pt-2">
        <Button variant="brand" size="lg">
          Book This Tour
        </Button>
      </div>
    </div>
  );
}

// ─── Tab: Itinerary ───────────────────────────────────────

const ITINERARY_DAYS = [
  {
    day: 1,
    title: "Arrival & Welcome",
    desc: "Meet your dedicated guide on arrival. Transfer to your heritage hotel and settle in. An evening orientation walk through the old quarter reveals the first flavours of this remarkable destination.",
    hotel: "Heritage Luxury Property",
    city: "Starting City",
  },
  {
    day: 2,
    title: "Immersive Old Town Exploration",
    desc: "A full day discovering the architectural grandeur and living culture of the historic centre — palaces, markets, temples and hidden laneways that guidebooks overlook.",
    hotel: "Heritage Luxury Property",
    city: "Starting City",
  },
  {
    day: 3,
    title: "Village Life & Artisan Encounters",
    desc: "Travel into the surrounding countryside for an intimate look at traditional craft and daily life. Lunch hosted by a local family; afternoon spent at your leisure.",
    hotel: "Boutique Countryside Retreat",
    city: "Rural Region",
  },
  {
    day: 4,
    title: "Scenic Journey to Next Destination",
    desc: "A scenic drive with photo stops at panoramic viewpoints. Arrive at your next destination in time for a private sunset experience at a location inaccessible to general tourists.",
    hotel: "Luxury Design Hotel",
    city: "Second City",
  },
  {
    day: 5,
    title: "Farewell Morning & Departure",
    desc: "Leisurely morning with a final breakfast overlooking a breathtaking view. Your guide accompanies you to the departure point with fond memories safely stored.",
    hotel: "Luxury Design Hotel",
    city: "Second City",
  },
];

function TabItinerary() {
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <div className="space-y-3">
      <h2 className="font-playfair text-2xl font-bold text-brand-dark mb-6">Day-by-Day Itinerary</h2>
      {ITINERARY_DAYS.map((day) => {
        const isOpen = expanded === day.day;
        return (
          <div
            key={day.day}
            className={cn(
              "rounded-xl border transition-all duration-200",
              isOpen
                ? "border-brand-orange/40 shadow-sm"
                : "border-gray-200 hover:border-brand-orange/20"
            )}
          >
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : day.day)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center font-sans font-bold text-sm shrink-0 transition-colors",
                    isOpen
                      ? "bg-brand-orange text-white"
                      : "bg-brand-orange/10 text-brand-orange"
                  )}
                >
                  {day.day}
                </span>
                <span className="font-playfair font-bold text-brand-dark text-base">
                  Day {day.day}: {day.title}
                </span>
              </div>
              {isOpen ? (
                <ChevronUp size={16} className="text-brand-grey shrink-0" />
              ) : (
                <ChevronDown size={16} className="text-brand-grey shrink-0" />
              )}
            </button>

            {isOpen && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                <p className="font-lora text-brand-grey text-sm leading-relaxed mb-4">
                  {day.desc}
                </p>
                <div className="flex items-center gap-2 text-xs font-sans text-brand-charcoal bg-brand-light rounded-lg px-3 py-2 w-fit">
                  <span className="text-brand-orange">🏨</span>
                  <span>
                    Overnight at:{" "}
                    <strong>{day.hotel}</strong>,{" "}
                    {day.city}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Tab: Accommodation ───────────────────────────────────

const ACCOMMODATION_TIERS = [
  {
    tier: "Standard",
    stars: 4,
    hotels: ["Comfortable Heritage Inn", "Classic Business Hotel", "Colonial Guesthouse"],
    roomType: "Superior Room",
    priceSupplement: null,
    tagColor: "bg-gray-100 text-gray-700",
  },
  {
    tier: "Deluxe",
    stars: 5,
    hotels: ["Luxury Heritage Palace", "Five-Star City Hotel", "Boutique Design Hotel"],
    roomType: "Deluxe Room / Suite",
    priceSupplement: 15000,
    tagColor: "bg-brand-orange/10 text-brand-orange",
  },
  {
    tier: "Ultra-Luxury",
    stars: 5,
    hotels: ["Private Palace Suite", "Icon Luxury Collection", "Award-Winning Retreat"],
    roomType: "Suite / Private Villa",
    priceSupplement: 45000,
    tagColor: "bg-brand-golden/20 text-amber-700",
  },
];

function TabAccommodation() {
  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-brand-dark mb-2">Accommodation Options</h2>
      <p className="font-lora text-brand-grey text-sm mb-8">
        Choose the tier that matches your style. All options have been personally vetted by our team.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ACCOMMODATION_TIERS.map((acc) => (
          <div
            key={acc.tier}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={cn(
                  "font-sans font-bold text-xs uppercase tracking-wider px-2.5 py-1 rounded-full",
                  acc.tagColor
                )}
              >
                {acc.tier}
              </span>
              <div className="flex gap-0.5">
                {Array.from({ length: acc.stars }).map((_, i) => (
                  <Star key={i} size={12} className="fill-brand-golden text-brand-golden" />
                ))}
              </div>
            </div>

            <h3 className="font-playfair text-lg font-bold text-brand-dark mb-3">{acc.tier} Properties</h3>

            <p className="font-sans text-xs text-brand-grey uppercase tracking-wider font-semibold mb-2">
              Representative Hotels
            </p>
            <ul className="space-y-1.5 flex-1">
              {acc.hotels.map((h) => (
                <li key={h} className="flex items-start gap-2 font-lora text-sm text-brand-grey">
                  <span className="text-brand-orange mt-0.5 shrink-0">·</span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-4 border-t border-gray-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs text-brand-grey">Room Type</span>
                <span className="font-sans text-xs font-semibold text-brand-dark">{acc.roomType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs text-brand-grey">Price Supplement</span>
                <span className="font-sans text-xs font-semibold text-brand-dark">
                  {acc.priceSupplement
                    ? `+ ${formatINR(acc.priceSupplement)} / person`
                    : "Included"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Inclusions ─────────────────────────────────────

const INCLUSIONS = [
  "All accommodation as per the selected tier",
  "Daily breakfast and select meals as per itinerary",
  "All internal transfers in private air-conditioned vehicle",
  "Dedicated English-speaking expert guide throughout",
  "All entrance fees to monuments and attractions",
  "Airport / railway station pick-up and drop",
  "Bottled water during all transfers and sightseeing",
  "24/7 emergency support helpline",
  "Welcome amenity at first hotel",
  "Tour documentation and digital itinerary package",
];

const EXCLUSIONS = [
  "International / domestic flights (unless stated)",
  "Visa fees and travel insurance",
  "Personal expenses, tips and gratuities",
  "Meals not mentioned in the itinerary",
  "Optional activities and excursions",
  "Porterage and laundry charges",
];

const ADD_ONS = [
  {
    icon: "✈",
    title: "Visa Assistance",
    desc: "End-to-end documentation guidance and liaison support for visa applications.",
    price: "₹3,500 / person",
  },
  {
    icon: "🛡",
    title: "Travel Insurance",
    desc: "Comprehensive travel insurance covering medical, cancellation and baggage.",
    price: "₹2,200 / person",
  },
  {
    icon: "🚗",
    title: "Airport Transfers",
    desc: "Private chauffeur-driven transfer to/from your nearest international airport.",
    price: "₹4,500 / trip",
  },
  {
    icon: "📷",
    title: "Photography Package",
    desc: "Professional travel photographer for one full day + edited digital album.",
    price: "₹18,000 / day",
  },
];

function TabInclusions() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-playfair text-2xl font-bold text-brand-dark mb-6">Inclusions &amp; Exclusions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Included */}
          <div className="bg-emerald-50 rounded-2xl p-6">
            <h3 className="font-playfair font-bold text-emerald-800 text-lg mb-4 flex items-center gap-2">
              <Check size={18} className="text-emerald-600" />
              What&apos;s Included
            </h3>
            <ul className="space-y-2.5">
              {INCLUSIONS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check size={13} className="text-emerald-600 mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="font-lora text-sm text-emerald-900 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not included */}
          <div className="bg-red-50 rounded-2xl p-6">
            <h3 className="font-playfair font-bold text-red-800 text-lg mb-4 flex items-center gap-2">
              <X size={18} className="text-red-500" />
              Not Included
            </h3>
            <ul className="space-y-2.5">
              {EXCLUSIONS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <X size={13} className="text-red-400 mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="font-lora text-sm text-red-900 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Add-Ons */}
      <div>
        <h2 className="font-playfair text-2xl font-bold text-brand-dark mb-5">Optional Add-Ons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ADD_ONS.map((addon) => (
            <div
              key={addon.title}
              className="bg-white border border-gray-100 rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow flex gap-4"
            >
              <span className="text-2xl shrink-0">{addon.icon}</span>
              <div>
                <h4 className="font-sans font-bold text-brand-dark text-sm mb-1">{addon.title}</h4>
                <p className="font-lora text-xs text-brand-grey leading-relaxed mb-2">{addon.desc}</p>
                <span className="font-sans font-bold text-brand-orange text-xs">{addon.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Reviews ─────────────────────────────────────────

const REVIEWS = [
  { name: "Priya & Rahul Mehta",        avatar: "PM", location: "Mumbai",       rating: 5, date: "Jan 2025", text: "Absolutely flawless from start to finish. Every detail was considered before we even knew we needed it. The itinerary flowed beautifully and the guide became a friend within hours." },
  { name: "James Holbrook",             avatar: "JH", location: "London, UK",   rating: 5, date: "Dec 2024", text: "See the Unseen opened up this destination in a way we never expected. Private access, rooms in genuine heritage properties, world-class organisation throughout." },
  { name: "Akira Tanaka",               avatar: "AT", location: "Tokyo, Japan", rating: 5, date: "Nov 2024", text: "The team handled every logistical challenge invisibly. I simply experienced — which is exactly what luxury travel should feel like. Would return without hesitation." },
  { name: "Nandita Krishnamurthy",      avatar: "NK", location: "Bengaluru",    rating: 5, date: "Oct 2024", text: "They exceeded every expectation. The attention to timing, to quiet moments, and to the extraordinary properties they chose made this trip truly unforgettable." },
];

const STAR_BREAKDOWN = [
  { stars: 5, pct: 91 },
  { stars: 4, pct: 6 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];

function TabReviews() {
  return (
    <div className="space-y-8">
      <h2 className="font-playfair text-2xl font-bold text-brand-dark">Traveller Reviews</h2>

      {/* Rating summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-brand-light rounded-2xl p-6">
        <div className="text-center sm:text-left shrink-0">
          <p className="font-playfair text-5xl font-bold text-brand-dark leading-none">4.9</p>
          <div className="flex gap-0.5 mt-1.5 justify-center sm:justify-start">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-brand-golden text-brand-golden" />
            ))}
          </div>
          <p className="font-sans text-xs text-brand-grey mt-1">47 reviews</p>
        </div>

        <div className="w-px h-16 bg-gray-200 hidden sm:block" />

        <div className="flex-1 w-full space-y-1.5">
          {STAR_BREAKDOWN.map(({ stars, pct }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="font-sans text-xs text-brand-grey w-4 shrink-0">{stars}★</span>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-golden rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="font-sans text-xs text-brand-grey w-6 shrink-0 text-right">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {REVIEWS.map((review) => (
          <div key={review.name} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
            <div className="flex gap-1 mb-3">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={13} className="fill-brand-golden text-brand-golden" />
              ))}
            </div>
            <p className="font-lora text-brand-grey text-sm leading-relaxed italic mb-5">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-orange to-brand-coral flex items-center justify-center text-white font-bold text-xs font-sans shrink-0">
                {review.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-bold text-brand-dark text-sm">{review.name}</p>
                <p className="font-sans text-xs text-brand-grey">{review.location}</p>
              </div>
              <p className="font-sans text-xs text-brand-grey shrink-0">{review.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Inquiry Form ─────────────────────────────────────────

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function InquiryForm({ tourTitle }: { tourTitle: string }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    numAdults: 2,
    numChildren: 0,
    preferredMonth: "",
    message: "",
  });
  const [status, setStatus] = useState<InquiryStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tourTitle,
          source: "tour-detail",
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-10 px-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <Check size={28} className="text-emerald-600" strokeWidth={2.5} />
        </div>
        <h3 className="font-playfair text-xl font-bold text-brand-dark mb-2">Enquiry Sent!</h3>
        <p className="font-lora text-brand-grey text-sm leading-relaxed max-w-xs">
          We&apos;ll be in touch within 24 hours with a personalised response.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 font-sans text-xs text-brand-orange font-semibold hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-playfair text-xl font-bold text-brand-dark">
        Enquire About This Tour
      </h3>

      {/* Full Name */}
      <div>
        <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
          Full Name *
        </label>
        <input
          type="text"
          value={form.fullName}
          onChange={(e) => set("fullName", e.target.value)}
          placeholder="Your full name"
          required
          className={inputCls}
        />
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
            Email *
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
            required
            className={inputCls}
          />
        </div>
        <div>
          <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 98765 43210"
            className={inputCls}
          />
        </div>
      </div>

      {/* Adults + Children */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
            Adults
          </label>
          <input
            type="number"
            min={1}
            max={20}
            value={form.numAdults}
            onChange={(e) => set("numAdults", parseInt(e.target.value, 10))}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
            Children
          </label>
          <input
            type="number"
            min={0}
            max={10}
            value={form.numChildren}
            onChange={(e) => set("numChildren", parseInt(e.target.value, 10))}
            className={inputCls}
          />
        </div>
      </div>

      {/* Preferred Month */}
      <div>
        <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
          Preferred Month
        </label>
        <select
          value={form.preferredMonth}
          onChange={(e) => set("preferredMonth", e.target.value)}
          className={inputCls}
        >
          <option value="">Select a month...</option>
          {MONTHS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block font-sans text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1.5">
          Message
        </label>
        <textarea
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Any special requests, questions, or notes for our team..."
          rows={3}
          className={cn(inputCls, "resize-none leading-relaxed")}
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm font-sans">{errorMsg}</p>
      )}

      <Button
        type="submit"
        variant="brand"
        size="md"
        fullWidth
        loading={status === "loading"}
        iconRight={status !== "loading" ? <Send size={14} /> : undefined}
      >
        Send Enquiry
      </Button>

      {/* Trust signals */}
      <div className="pt-2 space-y-2">
        {[
          "Free Expert Consultation",
          "No Commitment Required",
          "Best Price Guarantee",
        ].map((signal) => (
          <div key={signal} className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Check size={9} className="text-emerald-600" strokeWidth={3} />
            </span>
            <span className="font-sans text-xs text-brand-grey">{signal}</span>
          </div>
        ))}
      </div>
    </form>
  );
}

// ─── Suggested tours (bottom) ─────────────────────────────

const SUGGESTED = [
  { slug: "kerala-backwater-spice-trail",   title: "Kerala Backwater & Spice Trail",    gradient: "from-green-700 to-emerald-900" },
  { slug: "bali-wellness-retreat",          title: "Bali Spiritual & Wellness Retreat",  gradient: "from-teal-600 to-green-900" },
  { slug: "bhutan-kingdom-tigers-nest",     title: "Bhutan Kingdom & Tiger's Nest",     gradient: "from-stone-600 to-amber-900" },
];

// ─── Main Component ───────────────────────────────────────

export function TourDetailClient({ slug }: TourDetailClientProps) {
  const tour = MOCK_TOURS[slug] ?? FALLBACK_TOUR;

  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const TABS: { id: TabId; label: string }[] = [
    { id: "overview",       label: "Overview" },
    { id: "itinerary",      label: "Itinerary" },
    { id: "accommodation",  label: "Accommodation" },
    { id: "inclusions",     label: "Inclusions" },
    { id: "reviews",        label: "Reviews" },
  ];

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        className={cn(
          "relative h-96 bg-gradient-to-br overflow-hidden",
          tour.gradient
        )}
      >
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-white/60 font-sans text-xs mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/tours" className="hover:text-white transition-colors">Tours</Link>
            <ChevronRight size={12} />
            <span className="text-white/90 truncate max-w-[200px]">{tour.title}</span>
          </nav>

          {/* Experience type badge */}
          <div className="mb-3">
            <Badge label={tour.exp} variant="orange" />
          </div>

          {/* Title */}
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 max-w-3xl">
            {tour.title}
          </h1>

          {/* Destination + duration row */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-white/80 font-sans text-sm">
              <MapPin size={14} />
              {tour.dest}
            </span>
            <span className="flex items-center gap-1.5 text-white/80 font-sans text-sm">
              <Clock size={14} />
              {formatDuration(tour.days)}
            </span>
            <span className="bg-brand-orange text-white font-sans font-bold text-sm px-4 py-1.5 rounded-full">
              From {formatINR(tour.price)} / person
            </span>
          </div>
        </div>
      </section>

      {/* ── Quick info bar ───────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-4 text-sm font-sans">
            <div className="flex items-center gap-2 text-brand-charcoal">
              <Clock size={15} className="text-brand-orange" />
              <span><strong>{formatDuration(tour.days)}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-brand-charcoal">
              <Users size={15} className="text-brand-orange" />
              <span>{tour.groupTypes.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2 text-brand-charcoal">
              <CalendarDays size={15} className="text-brand-orange" />
              <span><strong>{tour.bestTime}</strong> Best Season</span>
            </div>
            <div className="flex items-center gap-2 text-brand-charcoal">
              <Tag size={15} className="text-brand-orange" />
              <span>{tour.exp}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky tab nav ───────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-0 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "shrink-0 px-5 py-4 font-sans text-sm font-semibold border-b-2 transition-all duration-150",
                  activeTab === tab.id
                    ? "text-brand-orange border-brand-orange"
                    : "text-brand-grey border-transparent hover:text-brand-dark hover:border-gray-300"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Two-column content ───────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 py-8">

          {/* Left: tab panels */}
          <div className="min-w-0">
            {activeTab === "overview"       && <TabOverview tour={tour} />}
            {activeTab === "itinerary"      && <TabItinerary />}
            {activeTab === "accommodation"  && <TabAccommodation />}
            {activeTab === "inclusions"     && <TabInclusions />}
            {activeTab === "reviews"        && <TabReviews />}
          </div>

          {/* Right: sidebar */}
          <aside className="space-y-4">
            {/* Inquiry form card */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-6 sticky top-20">
              <InquiryForm tourTitle={tour.title} />

              {/* Wishlist + Share */}
              <div className="flex gap-3 mt-5 pt-5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsWishlisted((p) => !p)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border font-sans text-sm font-semibold transition-all duration-150",
                    isWishlisted
                      ? "bg-brand-coral/10 text-brand-coral border-brand-coral/30"
                      : "border-gray-200 text-brand-grey hover:border-brand-coral/30 hover:text-brand-coral"
                  )}
                >
                  <Heart
                    size={15}
                    className={isWishlisted ? "fill-brand-coral text-brand-coral" : ""}
                  />
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </button>
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-gray-200 text-brand-grey hover:border-brand-orange/30 hover:text-brand-orange font-sans text-sm font-semibold transition-all duration-150"
                >
                  <Share2 size={15} />
                  Share
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── You Might Also Like ──────────────────────────────── */}
      <section className="bg-brand-light py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-brand-dark mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SUGGESTED.map((t) => (
              <div
                key={t.slug}
                className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className={cn("h-40 bg-gradient-to-br", t.gradient)} />
                <div className="p-4">
                  <h3 className="font-playfair font-bold text-brand-dark text-base leading-snug mb-3 group-hover:text-brand-orange transition-colors line-clamp-2">
                    {t.title}
                  </h3>
                  <Link href={`/tours/${t.slug}`}>
                    <Button variant="outline" size="sm" fullWidth>
                      View Tour
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quiz CTA ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-dark via-stone-900 to-brand-charcoal py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="section-eyebrow text-brand-soft mb-3">PERSONALISED MATCH</p>
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-3">
            Not sure which tour is right for you?
          </h2>
          <p className="font-lora text-white/60 mb-8 max-w-md mx-auto">
            Take our 2-minute travel quiz and let us match you with your perfect journey.
          </p>
          <Link href="/quiz">
            <Button variant="brand" size="lg">
              Take the Quiz
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
