import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const EXPERIENCE_TYPES = [
  {
    number: "01",
    title: "Scenic Escapes",
    slug: "scenic-escapes",
    tagline: "Iconic journeys, effortless pace",
    tours: 24,
    gradient: "linear-gradient(180deg, #2c4a3e 0%, #1a2f28 100%)",
  },
  {
    number: "02",
    title: "Blue Escapes",
    slug: "blue-escapes",
    tagline: "Ocean, rivers, lakes — water as the journey",
    tours: 18,
    gradient: "linear-gradient(180deg, #0d3b5e 0%, #0a2840 100%)",
  },
  {
    number: "03",
    title: "Earth's Marvels",
    slug: "earths-marvels",
    tagline: "Wilderness, wildlife, and wonder",
    tours: 21,
    gradient: "linear-gradient(180deg, #2d4a1e 0%, #1a3510 100%)",
  },
  {
    number: "04",
    title: "Family Thrills",
    slug: "family-thrills",
    tagline: "Memories the whole family makes together",
    tours: 16,
    gradient: "linear-gradient(180deg, #5c3a1e 0%, #3b2010 100%)",
  },
  {
    number: "05",
    title: "Legendary Journeys",
    slug: "legendary-journeys",
    tagline: "Routes that defined civilisations",
    tours: 19,
    gradient: "linear-gradient(180deg, #4a3a0a 0%, #2d2408 100%)",
  },
  {
    number: "06",
    title: "Signature Stays",
    slug: "signature-stays",
    tagline: "The destination is the accommodation",
    tours: 12,
    gradient: "linear-gradient(180deg, #3a1a3a 0%, #25102a 100%)",
  },
  {
    number: "07",
    title: "Outdoor Thrills",
    slug: "outdoor-thrills",
    tagline: "Push your limits, find your edge",
    tours: 15,
    gradient: "linear-gradient(180deg, #3a1a0a 0%, #251008 100%)",
  },
  {
    number: "08",
    title: "Festive Getaways",
    slug: "festive-getaways",
    tagline: "The world's great celebrations, yours to join",
    tours: 14,
    gradient: "linear-gradient(180deg, #5c1a1a 0%, #3b0e0e 100%)",
  },
  {
    number: "09",
    title: "Wellness Reset",
    slug: "wellness-reset",
    tagline: "Restore body, mind, and spirit",
    tours: 11,
    gradient: "linear-gradient(180deg, #1a3a3a 0%, #102828 100%)",
  },
];

export default function ExperienceTypes() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="section-container">
        <SectionHeader
          eyebrow="9 Ways to Travel"
          title="Find Your Perfect Experience"
          subtitle="Every journey we design falls into one of nine distinct experience types — each a unique lens through which to discover the world."
        />

        {/* Grid — 4-3-2 layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {EXPERIENCE_TYPES.map((exp) => (
            <ExperienceCard key={exp.slug} {...exp} />
          ))}

          {/* "Explore All" card — 10th slot */}
          <Link
            href="/experiences"
            className="group relative rounded-2xl overflow-hidden aspect-[4/5] flex items-end p-5 bg-brand-light hover:bg-brand-orange/10 transition-colors border-2 border-dashed border-gray-200 hover:border-brand-orange"
          >
            <div>
              <p className="font-playfair text-lg font-bold text-brand-dark group-hover:text-brand-orange transition-colors mb-1">
                View All Experiences
              </p>
              <p className="text-xs font-sans text-brand-grey">9 types · 150+ tours</p>
              <ArrowRight size={20} className="mt-3 text-brand-orange group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  number: string;
  title: string;
  slug: string;
  tagline: string;
  tours: number;
  gradient: string;
}

function ExperienceCard({ number, title, slug, tagline, tours, gradient }: ExperienceCardProps) {
  return (
    <Link
      href={`/experiences/${slug}`}
      className="group relative rounded-2xl overflow-hidden aspect-[4/5] flex flex-col justify-end"
      style={{ background: gradient }}
    >
      {/* Dark gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-brand-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10 p-5">
        {/* Number */}
        <span className="text-brand-orange font-playfair font-bold text-sm leading-none block mb-2 opacity-80">
          {number}
        </span>

        {/* Title */}
        <h3 className="font-playfair font-bold text-white text-lg leading-tight mb-1 group-hover:text-brand-soft transition-colors">
          {title}
        </h3>

        {/* Tagline — shown on hover */}
        <p className="font-lora text-white/70 text-xs leading-snug max-h-0 overflow-hidden group-hover:max-h-12 transition-all duration-300">
          {tagline}
        </p>

        {/* Tour count */}
        <p className="text-[11px] font-sans text-white/50 mt-2 group-hover:text-white/70 transition-colors">
          {tours} tours
        </p>
      </div>

      {/* Explore arrow */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight size={14} className="text-white" />
      </div>
    </Link>
  );
}
