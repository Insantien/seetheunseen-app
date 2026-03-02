"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Check, X } from "lucide-react";

type TabId = "overview" | "itinerary" | "accommodation" | "inclusions" | "reviews";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "accommodation", label: "Accommodation" },
  { id: "inclusions", label: "Inclusions" },
  { id: "reviews", label: "Reviews" },
];

const MOCK_ITINERARY = [
  { day: 1, title: "Arrive in Jaipur — City of Pink", desc: "Arrive at Jaipur International Airport. Transfer to your heritage hotel. Evening at leisure. Welcome dinner at the hotel.", hotel: "Heritage Hotel, Jaipur" },
  { day: 2, title: "Amber Fort & City Palace", desc: "Morning visit to the magnificent Amber Fort by elephant or jeep. Afternoon explore City Palace and Jantar Mantar observatory. Sunset at Nahargarh Fort.", hotel: "Heritage Hotel, Jaipur" },
  { day: 3, title: "Jodhpur — The Blue City", desc: "Morning drive to Jodhpur. Visit the towering Mehrangarh Fort and the vibrant Sardar Market. Explore the labyrinthine lanes of the old city.", hotel: "Haveli Hotel, Jodhpur" },
  { day: 4, title: "Udaipur — Lake City Romance", desc: "Drive to Udaipur, the City of Lakes. Visit the Lake Palace, City Palace and the Saheliyon Ki Bari garden. Evening boat cruise on Lake Pichola.", hotel: "Lake View Resort, Udaipur" },
  { day: 5, title: "Jaisalmer — The Golden City", desc: "Drive through the Thar Desert to Jaisalmer. Explore the golden sandstone Jaisalmer Fort. Sunset camel safari on the Sam Sand Dunes.", hotel: "Desert Camp, Jaisalmer" },
];

const INCLUSIONS = [
  "Accommodation in handpicked heritage hotels & resorts",
  "Daily breakfast and select dinners",
  "All intercity road transfers in private AC vehicle",
  "Expert local guides at all monuments",
  "Camel safari at Sam Sand Dunes",
  "Entrance fees to all mentioned monuments",
  "Elephant or jeep ride at Amber Fort",
  "Boat cruise on Lake Pichola, Udaipur",
  "Welcome and farewell dinners",
  "24/7 travel assistance & support",
];

const EXCLUSIONS = [
  "Airfare to/from Jaipur",
  "Personal expenses, tips, laundry",
  "Camera/video charges at monuments",
  "Travel insurance",
  "Meals not mentioned in itinerary",
  "Any activity not specified in inclusions",
];

const REVIEWS = [
  { name: "Priya & Rahul M.", initials: "PR", rating: 5, date: "Jan 2026", text: "An absolutely magical journey through Rajasthan. Every hotel was stunning, the guides were incredibly knowledgeable, and the camel safari at sunset was the highlight of our trip. See the Unseen truly delivers on their promise of luxury." },
  { name: "James & Sarah K.", initials: "JS", rating: 5, date: "Dec 2025", text: "This was our third booking with See the Unseen and they never disappoint. Rajasthan is breathtaking and having a private guide made all the difference. The Amber Fort experience was simply unforgettable." },
  { name: "Ananya T.", initials: "AT", rating: 5, date: "Nov 2025", text: "Travelling solo with a luxury tour company felt intimidating at first, but the team made me feel completely at ease. The itinerary was perfectly paced — not too rushed, plenty of free time to explore on my own." },
  { name: "The Iyer Family", initials: "IF", rating: 4, date: "Oct 2025", text: "We did this tour as a family of four including two teenagers. The kids loved the camel safari and the heritage hotel stays. Highly recommend the family package — great value and impeccably organised." },
];

interface TourDetailTabsProps {
  className?: string;
}

export function TourDetailTabs({ className }: TourDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  return (
    <div className={className}>
      {/* Tab nav */}
      <div className="sticky top-16 z-20 bg-white border-b border-gray-100 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex overflow-x-auto scrollbar-hide gap-1 -mb-px">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "shrink-0 px-4 py-3 font-sans text-sm font-semibold border-b-2 transition-colors duration-150 whitespace-nowrap",
                activeTab === tab.id
                  ? "border-brand-orange text-brand-orange"
                  : "border-transparent text-brand-grey hover:text-brand-dark"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="pt-8">
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-brand-dark mb-4">About This Tour</h2>
              <p className="font-lora text-brand-grey leading-relaxed mb-3">
                Rajasthan is one of India&apos;s most spectacular destinations — a land where medieval forts crown desert ridges, royal palaces shimmer in still lakes, and the golden sands of the Thar Desert stretch to the horizon. This 10-day journey takes you through the very heart of this regal state.
              </p>
              <p className="font-lora text-brand-grey leading-relaxed">
                You&apos;ll stay in handpicked heritage hotels — palaces and havelis that have been lovingly restored while retaining their original grandeur. Private guides bring each monument to life with stories of the Maharajas, and every evening reveals a different face of Rajasthani culture.
              </p>
            </div>
            <div>
              <h3 className="font-playfair text-xl font-bold text-brand-dark mb-4">Tour Highlights</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Stay in authentic heritage havelis and palace hotels", "Private guided tour of Amber Fort with elephant ride", "Camel safari at Sam Sand Dunes at sunset", "Romantic boat cruise on Lake Pichola", "Explore Jaisalmer's living sandstone fort", "Immersive cultural evening with folk music & dance"].map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-brand-orange" strokeWidth={3} />
                    </div>
                    <span className="font-sans text-sm text-brand-charcoal">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Photo gallery */}
            <div>
              <h3 className="font-playfair text-xl font-bold text-brand-dark mb-4">Photo Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["from-amber-700 to-orange-900", "from-rose-700 to-red-900", "from-stone-600 to-amber-800", "from-orange-600 to-yellow-800", "from-amber-800 to-red-900", "from-yellow-700 to-amber-900"].map((g, i) => (
                  <div key={i} className={cn("h-48 rounded-xl bg-gradient-to-br", g)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Itinerary */}
        {activeTab === "itinerary" && (
          <div className="space-y-3">
            <h2 className="font-playfair text-2xl font-bold text-brand-dark mb-6">Day-by-Day Itinerary</h2>
            {MOCK_ITINERARY.map((day) => (
              <div key={day.day} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                  className="w-full text-left p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                      <span className="font-playfair text-sm font-bold text-brand-orange">{day.day}</span>
                    </div>
                    <div>
                      <p className="font-sans text-xs text-brand-grey uppercase tracking-wider">Day {day.day}</p>
                      <p className="font-playfair font-bold text-brand-dark">{day.title}</p>
                    </div>
                  </div>
                  <span className="text-brand-grey text-lg">{expandedDay === day.day ? "−" : "+"}</span>
                </button>
                {expandedDay === day.day && (
                  <div className="px-5 pb-5 border-t border-gray-100">
                    <p className="font-lora text-brand-grey leading-relaxed mt-4 mb-3">{day.desc}</p>
                    <p className="font-sans text-xs text-brand-grey">
                      <span className="font-semibold text-brand-charcoal">Overnight: </span>{day.hotel}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Accommodation */}
        {activeTab === "accommodation" && (
          <div>
            <h2 className="font-playfair text-2xl font-bold text-brand-dark mb-6">Accommodation Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { tier: "Standard", stars: 3, supplement: 0, hotels: ["Zostel Heritage, Jaipur", "Blue City Hostel, Jodhpur", "Lake View Inn, Udaipur"], room: "Deluxe Double Room" },
                { tier: "Deluxe", stars: 4, supplement: 15000, hotels: ["Narain Niwas Palace, Jaipur", "Pal Haveli, Jodhpur", "Jagat Niwas Palace, Udaipur"], room: "Heritage Suite" },
                { tier: "Ultra-Luxury", stars: 5, supplement: 45000, hotels: ["Rambagh Palace, Jaipur", "Umaid Bhawan, Jodhpur", "Taj Lake Palace, Udaipur"], room: "Royal Suite" },
              ].map(({ tier, stars, supplement, hotels, room }) => (
                <div key={tier} className={cn("rounded-2xl border-2 overflow-hidden", tier === "Deluxe" ? "border-brand-orange" : "border-gray-100")}>
                  {tier === "Deluxe" && (
                    <div className="bg-brand-orange text-white text-center py-1.5 font-sans text-xs font-bold uppercase tracking-widest">Most Popular</div>
                  )}
                  <div className="p-5">
                    <h3 className="font-playfair text-lg font-bold text-brand-dark mb-1">{tier}</h3>
                    <div className="flex gap-0.5 mb-3">{Array.from({ length: stars }).map((_, i) => <span key={i} className="text-brand-golden text-sm">★</span>)}</div>
                    <p className="font-sans text-xs text-brand-grey mb-2">{room}</p>
                    <ul className="space-y-1 mb-4">
                      {hotels.map((h) => (<li key={h} className="font-sans text-xs text-brand-charcoal flex gap-1.5"><span className="text-brand-orange">•</span>{h}</li>))}
                    </ul>
                    {supplement > 0 ? (
                      <p className="font-sans text-sm font-semibold text-brand-orange">+₹{supplement.toLocaleString("en-IN")} per person</p>
                    ) : (
                      <p className="font-sans text-sm font-semibold text-emerald-600">Included in base price</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inclusions */}
        {activeTab === "inclusions" && (
          <div className="space-y-8">
            <h2 className="font-playfair text-2xl font-bold text-brand-dark mb-6">Inclusions & Exclusions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-2xl p-6">
                <h3 className="font-playfair text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                  <Check size={18} className="text-emerald-600" /> What&apos;s Included
                </h3>
                <ul className="space-y-2.5">
                  {INCLUSIONS.map((item) => (<li key={item} className="flex items-start gap-2.5"><Check size={14} className="text-emerald-500 mt-0.5 shrink-0" /><span className="font-lora text-sm text-emerald-900">{item}</span></li>))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-2xl p-6">
                <h3 className="font-playfair text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                  <X size={18} className="text-red-500" /> Not Included
                </h3>
                <ul className="space-y-2.5">
                  {EXCLUSIONS.map((item) => (<li key={item} className="flex items-start gap-2.5"><X size={14} className="text-red-400 mt-0.5 shrink-0" /><span className="font-lora text-sm text-red-900">{item}</span></li>))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Reviews */}
        {activeTab === "reviews" && (
          <div>
            <h2 className="font-playfair text-2xl font-bold text-brand-dark mb-6">Guest Reviews</h2>
            <div className="flex items-center gap-6 mb-8 p-5 bg-brand-light rounded-2xl">
              <div className="text-center">
                <p className="font-playfair text-5xl font-bold text-brand-orange">4.9</p>
                <div className="flex gap-0.5 mt-1 justify-center">{Array.from({ length: 5 }).map((_, i) => (<span key={i} className="text-brand-golden">★</span>))}</div>
                <p className="font-sans text-xs text-brand-grey mt-1">47 reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[["5 stars", 85], ["4 stars", 12], ["3 stars", 3]].map(([label, pct]) => (
                  <div key={String(label)} className="flex items-center gap-3">
                    <span className="font-sans text-xs text-brand-grey w-12">{label}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-brand-golden rounded-full" style={{ width: `${pct}%` }} /></div>
                    <span className="font-sans text-xs text-brand-grey w-8">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {REVIEWS.map((r) => (
                <div key={r.name} className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold font-sans text-sm">{r.initials}</div>
                    <div>
                      <p className="font-sans text-sm font-semibold text-brand-dark">{r.name}</p>
                      <p className="font-sans text-xs text-brand-grey">{r.date}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">{Array.from({ length: r.rating }).map((_, i) => (<span key={i} className="text-brand-golden text-sm">★</span>))}</div>
                  </div>
                  <p className="font-lora text-sm text-brand-grey leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
