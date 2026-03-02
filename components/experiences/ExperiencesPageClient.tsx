"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface ExperienceType {
  num: string;
  slug: string;
  title: string;
  tagline: string;
  tours: number;
  gradient: string;
}

const EXPERIENCE_TYPES: ExperienceType[] = [
  {
    num: "01",
    slug: "scenic-escapes",
    title: "Scenic Escapes",
    tagline: "Iconic journeys, effortless pace",
    tours: 24,
    gradient: "from-amber-800 to-orange-900",
  },
  {
    num: "02",
    slug: "blue-escapes",
    title: "Blue Escapes",
    tagline: "Sail into the extraordinary",
    tours: 18,
    gradient: "from-cyan-700 to-blue-900",
  },
  {
    num: "03",
    slug: "earths-marvels",
    title: "Earth's Marvels",
    tagline: "Where nature rewrites the rules",
    tours: 15,
    gradient: "from-green-700 to-emerald-900",
  },
  {
    num: "04",
    slug: "family-thrills",
    title: "Family Thrills",
    tagline: "Memories made together",
    tours: 12,
    gradient: "from-rose-600 to-pink-900",
  },
  {
    num: "05",
    slug: "legendary-journeys",
    title: "Legendary Journeys",
    tagline: "Paths walked by kings and explorers",
    tours: 20,
    gradient: "from-stone-700 to-amber-900",
  },
  {
    num: "06",
    slug: "signature-stays",
    title: "Signature Stays",
    tagline: "Properties that are the destination",
    tours: 14,
    gradient: "from-slate-700 to-zinc-900",
  },
  {
    num: "07",
    slug: "outdoor-thrills",
    title: "Outdoor Thrills",
    tagline: "For those who seek the edge",
    tours: 16,
    gradient: "from-lime-700 to-green-900",
  },
  {
    num: "08",
    slug: "festive-getaways",
    title: "Festive Getaways",
    tagline: "Celebrate in colour and culture",
    tours: 10,
    gradient: "from-yellow-600 to-orange-900",
  },
  {
    num: "09",
    slug: "wellness-reset",
    title: "Wellness Reset",
    tagline: "Restore, renew, rediscover",
    tours: 11,
    gradient: "from-teal-700 to-cyan-900",
  },
];

export function ExperiencesPageClient() {
  const totalTours = EXPERIENCE_TYPES.reduce((acc, e) => acc + e.tours, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-brand-dark via-brand-charcoal to-brand-dark py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 40%, #E8572A 0%, transparent 50%), radial-gradient(circle at 20% 70%, #D44A1C 0%, transparent 40%)",
          }}
        />
        <div className="section-container relative z-10 text-center">
          <p className="section-eyebrow text-brand-orange mb-4">9 Ways to Travel</p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Our Experiences
          </h1>
          <p className="font-lora text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Nine curated ways to see the world differently. Every journey we design falls
            into one of these distinct experience types — each a unique lens through which
            to discover the extraordinary.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-white/50 text-sm font-sans">
            <span>9 Experience Types</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{totalTours}+ Tours</span>
          </div>
        </div>
      </div>

      {/* Experience Types Grid */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCE_TYPES.map((exp) => (
            <ExperienceCard key={exp.slug} experience={exp} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-brand-light py-16">
        <div className="section-container text-center">
          <p className="section-eyebrow mb-3">Not Sure Where to Start?</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Let Us Find Your Perfect Experience
          </h2>
          <p className="font-lora text-brand-grey text-lg max-w-xl mx-auto mb-8">
            Take our quick journey quiz and we'll match you to the experience type — and the
            tour — that fits you best.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold font-sans text-white bg-gradient-to-br from-brand-orange to-brand-coral hover:shadow-lg transition-all duration-200 hover:-translate-y-px"
          >
            Take the Journey Quiz &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({ experience }: { experience: ExperienceType }) {
  const { num, slug, title, tagline, tours, gradient } = experience;

  return (
    <Link
      href={`/experiences/${slug}`}
      className="group relative rounded-2xl overflow-hidden block h-72"
    >
      {/* Gradient background */}
      <div className={cn("absolute inset-0 bg-gradient-to-b", gradient)} />

      {/* Large number overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-playfair font-bold text-white/10 select-none leading-none"
          style={{ fontSize: "10rem" }}>
          {num}
        </span>
      </div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Orange hover overlay */}
      <div className="absolute inset-0 bg-brand-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        {/* Number tag */}
        <span className="text-brand-orange font-playfair font-bold text-sm opacity-80 block mb-2">
          {num}
        </span>

        {/* Title */}
        <h3 className="font-playfair text-2xl font-bold text-white leading-tight mb-1">
          {title}
        </h3>

        {/* Tagline — visible on hover */}
        <p className="font-lora text-white/70 text-sm max-h-0 overflow-hidden group-hover:max-h-12 transition-all duration-300 leading-snug">
          {tagline}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs font-sans text-white/60 group-hover:text-white/80 transition-colors">
            {tours} tours
          </span>
          {/* Explore button — appears on hover */}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold font-sans text-white bg-brand-orange/90 px-4 py-1.5 rounded-full">
            Explore &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
