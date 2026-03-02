"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

interface Destination {
  slug: string;
  name: string;
  region: string;
  isDomestic: boolean;
  tagline: string;
  tours: number;
  gradient: string;
}

const DESTINATIONS: Destination[] = [
  {
    slug: "rajasthan",
    name: "Rajasthan",
    region: "india",
    isDomestic: true,
    tagline: "Land of Maharajas & Eternal Sands",
    tours: 8,
    gradient: "from-amber-700 to-orange-900",
  },
  {
    slug: "kerala",
    name: "Kerala",
    region: "india",
    isDomestic: true,
    tagline: "God's Own Country",
    tours: 6,
    gradient: "from-green-700 to-emerald-900",
  },
  {
    slug: "leh-ladakh",
    name: "Leh Ladakh",
    region: "india",
    isDomestic: true,
    tagline: "Where the Himalayas Touch the Sky",
    tours: 5,
    gradient: "from-slate-600 to-blue-900",
  },
  {
    slug: "andaman-islands",
    name: "Andaman Islands",
    region: "india",
    isDomestic: true,
    tagline: "Emerald Islands of the Indian Ocean",
    tours: 4,
    gradient: "from-cyan-600 to-teal-900",
  },
  {
    slug: "varanasi",
    name: "Varanasi",
    region: "india",
    isDomestic: true,
    tagline: "The Eternal City on the Ganges",
    tours: 3,
    gradient: "from-orange-600 to-yellow-900",
  },
  {
    slug: "japan",
    name: "Japan",
    region: "asia",
    isDomestic: false,
    tagline: "Ancient Traditions, Timeless Beauty",
    tours: 7,
    gradient: "from-pink-600 to-rose-900",
  },
  {
    slug: "bali",
    name: "Bali",
    region: "asia",
    isDomestic: false,
    tagline: "Island of Gods & Golden Rice Fields",
    tours: 5,
    gradient: "from-green-600 to-lime-900",
  },
  {
    slug: "maldives",
    name: "Maldives",
    region: "asia",
    isDomestic: false,
    tagline: "Paradise at Sea Level",
    tours: 4,
    gradient: "from-sky-500 to-cyan-900",
  },
  {
    slug: "bhutan",
    name: "Bhutan",
    region: "asia",
    isDomestic: false,
    tagline: "The Last Shangri-La",
    tours: 3,
    gradient: "from-stone-600 to-amber-900",
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    region: "europe",
    isDomestic: false,
    tagline: "Alpine Grandeur, Pristine Lakes",
    tours: 4,
    gradient: "from-blue-600 to-indigo-900",
  },
  {
    slug: "italy",
    name: "Italy",
    region: "europe",
    isDomestic: false,
    tagline: "La Dolce Vita, Timeless Splendour",
    tours: 6,
    gradient: "from-red-600 to-rose-900",
  },
  {
    slug: "brazil",
    name: "Brazil",
    region: "americas-oceania",
    isDomestic: false,
    tagline: "Wild Amazon & Carnival Spirit",
    tours: 3,
    gradient: "from-green-700 to-yellow-900",
  },
];

const REGION_TABS = [
  { label: "All Destinations", value: "all" },
  { label: "India", value: "india" },
  { label: "Asia", value: "asia" },
  { label: "Europe", value: "europe" },
  { label: "Middle East & Africa", value: "middle-east-africa" },
  { label: "Americas & Oceania", value: "americas-oceania" },
];

const REGION_LABELS: Record<string, string> = {
  india: "India",
  asia: "Asia",
  europe: "Europe",
  "middle-east-africa": "Middle East & Africa",
  "americas-oceania": "Americas & Oceania",
};

export function DestinationsPageClient() {
  const [activeRegion, setActiveRegion] = useState("all");

  const filtered =
    activeRegion === "all"
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.region === activeRegion);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-brand-dark via-brand-charcoal to-brand-dark py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #E8572A 0%, transparent 50%), radial-gradient(circle at 80% 20%, #D44A1C 0%, transparent 40%)",
          }}
        />
        <div className="section-container relative z-10 text-center">
          <p className="section-eyebrow text-brand-orange mb-4">Explore the World</p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Explore Our Destinations
          </h1>
          <p className="font-lora text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Handcrafted journeys to the world's most extraordinary places. Every destination
            chosen for the depth of experience it offers.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-white/50 text-sm font-sans">
            <span>{DESTINATIONS.length} Destinations</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>
              {DESTINATIONS.reduce((acc, d) => acc + d.tours, 0)}+ Tours
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>6 Regions</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="section-container">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide no-scrollbar">
            {REGION_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveRegion(tab.value)}
                className={cn(
                  "shrink-0 px-5 py-2 rounded-full text-sm font-semibold font-sans transition-all duration-200 whitespace-nowrap",
                  activeRegion === tab.value
                    ? "bg-brand-orange text-white shadow-sm"
                    : "bg-gray-100 text-brand-charcoal hover:bg-gray-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Destination Grid */}
      <div className="section-container py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-brand-grey font-lora text-lg">
            No destinations found for this region yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest) => (
              <DestinationCard key={dest.slug} destination={dest} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  const { slug, name, region, isDomestic, tagline, tours, gradient } = destination;

  return (
    <Link
      href={`/destinations/${slug}`}
      className="group relative rounded-2xl overflow-hidden block"
    >
      {/* Card image area */}
      <div
        className={cn(
          "relative aspect-[4/5] bg-gradient-to-b transition-transform duration-500 group-hover:scale-105",
          gradient
        )}
      >
        {/* Dark overlay gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold font-sans bg-white/20 backdrop-blur-sm text-white uppercase tracking-wide">
            {REGION_LABELS[region] ?? region}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold font-sans uppercase tracking-wide",
              isDomestic
                ? "bg-emerald-500/90 text-white"
                : "bg-blue-500/90 text-white"
            )}
          >
            {isDomestic ? "Domestic" : "International"}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-playfair text-2xl font-bold text-white leading-tight mb-1">
            {name}
          </h3>
          <p className="font-lora text-white/70 text-sm mb-3 leading-snug">
            {tagline}
          </p>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              {tours} Tours
            </span>
            {/* Explore button — appears on hover */}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold font-sans text-white bg-brand-orange px-4 py-1.5 rounded-full">
              Explore &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
