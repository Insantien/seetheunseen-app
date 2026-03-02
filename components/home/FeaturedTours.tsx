import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatINR, formatDuration } from "@/lib/utils/format";
import type { TourCard } from "@/types";

// Mock tours — replaced with Sanity data when connected
const MOCK_TOURS: TourCard[] = [
  {
    _id: "1",
    title: "The Palace on Wheels",
    slug: { _type: "slug", current: "palace-on-wheels" },
    heroImage: { _type: "image", asset: { _ref: "", _type: "reference" } },
    duration: 8,
    pricePerAdult: 285000,
    shortDescription: "India's iconic luxury train journey through Rajasthan's royal cities, reimagined for the modern traveller.",
    isDomestic: true,
    tags: ["bucket-list", "luxury"],
    experienceTypes: [{ _id: "1", title: "Scenic Escapes", slug: { _type: "slug", current: "scenic-escapes" } }],
    destinations: [{ _id: "1", title: "Rajasthan", slug: { _type: "slug", current: "rajasthan" } }],
  },
  {
    _id: "2",
    title: "Japan in Bloom — Cherry Blossom Circuit",
    slug: { _type: "slug", current: "japan-cherry-blossom" },
    heroImage: { _type: "image", asset: { _ref: "", _type: "reference" } },
    duration: 12,
    pricePerAdult: 425000,
    shortDescription: "Chase the sakura through Tokyo, Kyoto, Hakone, and Hiroshima during Japan's most magical season.",
    isDomestic: false,
    tags: ["bucket-list", "cultural", "photography"],
    experienceTypes: [{ _id: "5", title: "Legendary Journeys", slug: { _type: "slug", current: "legendary-journeys" } }],
    destinations: [{ _id: "2", title: "Japan", slug: { _type: "slug", current: "japan" } }],
  },
  {
    _id: "3",
    title: "Kerala Backwaters & Ayurveda Retreat",
    slug: { _type: "slug", current: "kerala-backwaters-ayurveda" },
    heroImage: { _type: "image", asset: { _ref: "", _type: "reference" } },
    duration: 10,
    pricePerAdult: 195000,
    shortDescription: "Float through Kerala's emerald backwaters on a private houseboat, then surrender to ancient Ayurvedic healing.",
    isDomestic: true,
    tags: ["wellness", "honeymoon", "luxury"],
    experienceTypes: [{ _id: "9", title: "Wellness Reset", slug: { _type: "slug", current: "wellness-reset" } }],
    destinations: [{ _id: "3", title: "Kerala", slug: { _type: "slug", current: "kerala" } }],
  },
  {
    _id: "4",
    title: "Bhutan: Thunder Dragon Odyssey",
    slug: { _type: "slug", current: "bhutan-thunder-dragon" },
    heroImage: { _type: "image", asset: { _ref: "", _type: "reference" } },
    duration: 9,
    pricePerAdult: 315000,
    shortDescription: "Explore the last Himalayan kingdom — ancient dzongs, pristine valleys, and a culture unchanged by time.",
    isDomestic: false,
    tags: ["offbeat", "cultural", "adventure"],
    experienceTypes: [{ _id: "3", title: "Earth's Marvels", slug: { _type: "slug", current: "earths-marvels" } }],
    destinations: [{ _id: "4", title: "Bhutan", slug: { _type: "slug", current: "bhutan" } }],
  },
  {
    _id: "5",
    title: "Tanzania Safari & Zanzibar Idyll",
    slug: { _type: "slug", current: "tanzania-safari-zanzibar" },
    heroImage: { _type: "image", asset: { _ref: "", _type: "reference" } },
    duration: 14,
    pricePerAdult: 625000,
    shortDescription: "Witness the Great Migration on the Serengeti, then unwind on Zanzibar's powder-white beaches.",
    isDomestic: false,
    tags: ["bucket-list", "wildlife", "luxury"],
    experienceTypes: [{ _id: "3", title: "Earth's Marvels", slug: { _type: "slug", current: "earths-marvels" } }],
    destinations: [{ _id: "5", title: "Tanzania", slug: { _type: "slug", current: "tanzania" } }],
  },
  {
    _id: "6",
    title: "Ladakh — Land of High Passes",
    slug: { _type: "slug", current: "ladakh-high-passes" },
    heroImage: { _type: "image", asset: { _ref: "", _type: "reference" } },
    duration: 11,
    pricePerAdult: 220000,
    shortDescription: "Ride the world's highest motorable passes, explore ancient monasteries, and camp under a sea of stars.",
    isDomestic: true,
    tags: ["adventure", "photography", "offbeat"],
    experienceTypes: [{ _id: "7", title: "Outdoor Thrills", slug: { _type: "slug", current: "outdoor-thrills" } }],
    destinations: [{ _id: "6", title: "Ladakh", slug: { _type: "slug", current: "ladakh" } }],
  },
];

// Background gradients for tour cards (placeholder before Sanity images)
const TOUR_GRADIENTS = [
  "linear-gradient(135deg, #7a5c3a 0%, #4a3520 100%)",
  "linear-gradient(135deg, #3a5c7a 0%, #1a2d40 100%)",
  "linear-gradient(135deg, #3a7a5c 0%, #1a4035 100%)",
  "linear-gradient(135deg, #6a5a3a 0%, #3a3015 100%)",
  "linear-gradient(135deg, #8a5a3a 0%, #4a2515 100%)",
  "linear-gradient(135deg, #5a6a8a 0%, #2a3050 100%)",
];

interface FeaturedToursProps {
  tours?: TourCard[];
}

export default function FeaturedTours({ tours = MOCK_TOURS }: FeaturedToursProps) {
  return (
    <section className="py-20 md:py-28 bg-brand-light">
      <div className="section-container">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <SectionHeader
            eyebrow="Handpicked Journeys"
            title="Our Featured Tours"
            subtitle="Carefully curated experiences, each one a masterpiece of planning and discovery."
            align="left"
            className="mb-0"
          />
          <Link
            href="/tours"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold font-sans text-brand-orange hover:underline shrink-0 ml-8"
          >
            View all tours <ArrowRight size={16} />
          </Link>
        </div>

        {/* Horizontal scroll container */}
        <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-none">
          {tours.map((tour, i) => (
            <FeaturedTourCard key={tour._id} tour={tour} gradient={TOUR_GRADIENTS[i % TOUR_GRADIENTS.length]} />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/tours" className="btn-brand">
            View All Tours <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface FeaturedTourCardProps {
  tour: TourCard;
  gradient: string;
}

function FeaturedTourCard({ tour, gradient }: FeaturedTourCardProps) {
  const primaryExp = tour.experienceTypes?.[0];
  const primaryDest = tour.destinations?.[0];

  return (
    <div className="group relative shrink-0 w-72 md:w-80 snap-start rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
      {/* Image / gradient */}
      <div className="h-52 relative" style={{ background: gradient }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Tag */}
        {primaryExp && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-white/90 text-brand-orange px-2.5 py-1 rounded-full">
            {primaryExp.title}
          </span>
        )}
        {/* Domestic/Int badge */}
        <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${tour.isDomestic ? "bg-emerald-500/90 text-white" : "bg-sky-500/90 text-white"}`}>
          {tour.isDomestic ? "India" : "International"}
        </span>
      </div>

      {/* Content */}
      <div className="bg-white p-5">
        {primaryDest && (
          <p className="flex items-center gap-1 text-xs text-brand-grey font-sans mb-1.5">
            <MapPin size={10} /> {primaryDest.title}
          </p>
        )}
        <Link href={`/tours/${tour.slug.current}`}>
          <h3 className="font-playfair font-bold text-brand-dark text-lg leading-snug mb-1.5 group-hover:text-brand-orange transition-colors line-clamp-2">
            {tour.title}
          </h3>
        </Link>
        <p className="text-sm font-lora text-brand-grey leading-relaxed line-clamp-2 mb-4">
          {tour.shortDescription}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs font-sans text-brand-grey">
            <Clock size={12} /> {formatDuration(tour.duration)}
          </div>
          <div className="text-right">
            <p className="text-[10px] font-sans text-brand-grey uppercase tracking-wide">From</p>
            <p className="text-base font-bold font-sans text-brand-orange">{formatINR(tour.pricePerAdult)}</p>
            <p className="text-[9px] font-sans text-brand-grey">per adult</p>
          </div>
        </div>
      </div>
    </div>
  );
}
