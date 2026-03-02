"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";
import { formatINR } from "@/lib/utils/format";

interface ExperienceDetailClientProps {
  slug: string;
}

const SUB_CATEGORIES = [
  {
    title: "Classic Rail Journeys",
    description: "Board legendary trains through mountain passes and coastlines.",
    gradient: "from-amber-600 to-orange-700",
  },
  {
    title: "Scenic Road Trips",
    description: "Drive routes that reward every mile with breathtaking vistas.",
    gradient: "from-stone-600 to-amber-800",
  },
  {
    title: "Heritage City Tours",
    description: "Walk through living history in the world's most storied cities.",
    gradient: "from-rose-600 to-red-800",
  },
  {
    title: "Mountain Panoramas",
    description: "High-altitude landscapes that dwarf every other earthly scale.",
    gradient: "from-slate-600 to-blue-800",
  },
  {
    title: "Coastal Drives",
    description: "Clifftop roads and sea-spray vistas along dramatic shorelines.",
    gradient: "from-cyan-600 to-teal-800",
  },
  {
    title: "Island Hopping",
    description: "Chart a course through archipelagos and hidden island gems.",
    gradient: "from-sky-500 to-cyan-800",
  },
];

const FEATURED_TOURS = [
  {
    title: "The Golden Triangle by Rail",
    duration: "10 Days",
    price: 145000,
    gradient: "from-amber-700 to-orange-900",
    slug: "golden-triangle-by-rail",
  },
  {
    title: "Swiss Alps Grand Traverse",
    duration: "8 Days",
    price: 210000,
    gradient: "from-blue-700 to-indigo-900",
    slug: "swiss-alps-grand-traverse",
  },
  {
    title: "Coastal Kerala Scenic Drive",
    duration: "7 Days",
    price: 95000,
    gradient: "from-green-700 to-emerald-900",
    slug: "coastal-kerala-scenic-drive",
  },
];

const RELATED_DESTINATIONS = [
  { name: "Rajasthan", slug: "rajasthan", gradient: "from-amber-700 to-orange-900" },
  { name: "Kerala", slug: "kerala", gradient: "from-green-700 to-emerald-900" },
  { name: "Japan", slug: "japan", gradient: "from-pink-600 to-rose-900" },
  { name: "Switzerland", slug: "switzerland", gradient: "from-blue-600 to-indigo-900" },
];

export function ExperienceDetailClient({ slug }: ExperienceDetailClientProps) {
  const [brochureForm, setBrochureForm] = useState({ name: "", email: "" });

  const handleBrochureInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrochureForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Brochure download handler — no-op in mock
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-96 bg-gradient-to-br from-amber-800 to-orange-900 overflow-hidden">
        {/* Large background number */}
        <div className="absolute inset-0 flex items-center justify-start pl-16 overflow-hidden pointer-events-none">
          <span
            className="font-playfair font-bold text-white/10 select-none leading-none"
            style={{ fontSize: "16rem" }}
          >
            01
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="relative z-10 section-container h-full flex flex-col justify-end pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-sm font-sans mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/experiences" className="hover:text-white transition-colors">
              Experiences
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">Scenic Escapes</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge label="Experience Type 01" variant="orange" />
            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              24 Tours Available
            </span>
          </div>
          <h1 className="font-playfair text-5xl font-bold text-white leading-tight mb-3">
            Scenic Escapes
          </h1>
          <p className="font-lora text-xl text-white/70">
            Iconic journeys, effortless pace
          </p>
        </div>
      </div>

      <div className="section-container py-12 space-y-16">
        {/* Section 1 — About */}
        <section>
          <h2 className="font-playfair text-3xl font-bold text-brand-dark mb-5">
            About Scenic Escapes
          </h2>
          <div className="space-y-4 font-lora text-brand-charcoal leading-relaxed text-[1.0625rem] max-w-3xl">
            <p>
              Scenic Escapes are journeys built around the profound pleasure of moving through
              extraordinary landscapes at an unhurried pace. Whether aboard a heritage mountain
              railway, behind the wheel on a clifftop coastal road, or gliding between ancient
              cities on a classic train — the journey itself is as memorable as the destination.
              We select only routes where the scenery is genuinely extraordinary, and where the
              rhythm of travel allows you to absorb it fully.
            </p>
            <p>
              Our Scenic Escape tours are designed for travellers who believe that how you
              get somewhere matters as much as where you arrive. Each itinerary balances iconic
              viewpoints with quiet, less-visited stretches of road or rail — the kind that
              rewarded explorers of a previous era, and still reward those willing to look
              beyond the obvious today.
            </p>
          </div>
        </section>

        {/* Section 2 — What's Included */}
        <section>
          <h2 className="font-playfair text-3xl font-bold text-brand-dark mb-6">
            What's Included
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SUB_CATEGORIES.map((cat) => (
              <div
                key={cat.title}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                {/* Icon placeholder */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br mb-4 shrink-0",
                    cat.gradient
                  )}
                />
                <h3 className="font-playfair font-bold text-brand-dark text-base mb-1.5">
                  {cat.title}
                </h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — Featured Tours */}
        <section>
          <SectionHeader
            eyebrow="Hand-Picked"
            title="Featured Scenic Escapes"
            align="left"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {FEATURED_TOURS.map((tour) => (
              <div
                key={tour.slug}
                className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm group hover:shadow-md transition-shadow"
              >
                {/* Gradient image placeholder */}
                <div className={cn("h-48 bg-gradient-to-br relative", tour.gradient)}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <span className="text-xs font-sans font-semibold text-white/90 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {tour.duration}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-playfair font-bold text-brand-dark text-base leading-tight mb-1">
                    {tour.title}
                  </h3>
                  <p className="text-xs font-sans text-brand-grey mb-4">
                    From {formatINR(tour.price)} per person
                  </p>
                  <Link href={`/tours/${tour.slug}`}>
                    <Button variant="outline" size="sm" fullWidth>
                      View Tour
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 — Related Destinations */}
        <section>
          <h2 className="font-playfair text-3xl font-bold text-brand-dark mb-6">
            Destinations for Scenic Escapes
          </h2>
          <div className="flex flex-wrap gap-3">
            {RELATED_DESTINATIONS.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className={cn(
                  "group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold font-sans text-white transition-all duration-200 hover:scale-105 hover:shadow-lg bg-gradient-to-r",
                  dest.gradient
                )}
              >
                {dest.name}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <div className="bg-brand-dark mt-8">
        <div className="section-container py-16">
          <div className="text-center mb-12">
            <p className="section-eyebrow text-brand-orange mb-3">Start Your Journey</p>
            <h2 className="font-playfair text-4xl font-bold text-white mb-4">
              Ready to Explore?
            </h2>
            <p className="font-lora text-white/60 text-lg max-w-lg mx-auto">
              Download our Scenic Escapes brochure or speak to a travel expert who knows
              these routes inside out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Download Brochure */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-playfair font-bold text-white text-xl mb-2">
                Download Brochure
              </h3>
              <p className="font-sans text-white/60 text-sm mb-5">
                Get our full Scenic Escapes guide with itineraries, pricing, and insider tips.
              </p>
              <form onSubmit={handleBrochureSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={brochureForm.name}
                  onChange={handleBrochureInput}
                  required
                  className="w-full px-4 py-2.5 text-sm font-sans rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-orange transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={brochureForm.email}
                  onChange={handleBrochureInput}
                  required
                  className="w-full px-4 py-2.5 text-sm font-sans rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-orange transition-colors"
                />
                <Button type="submit" variant="brand" fullWidth size="md">
                  Download Free Brochure
                </Button>
              </form>
            </div>

            {/* Speak to Expert */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-playfair font-bold text-white text-xl mb-2">
                  Speak to an Expert
                </h3>
                <p className="font-sans text-white/60 text-sm mb-5 leading-relaxed">
                  Our travel designers have walked these routes personally. Tell us what
                  you're looking for and we'll craft the perfect scenic journey for you.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Personalised itinerary design",
                    "No obligation consultation",
                    "Response within 24 hours",
                  ].map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5 text-sm font-sans text-white/70"
                    >
                      <span className="w-4 h-4 rounded-full bg-brand-orange/20 flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/contact">
                <Button variant="outline" fullWidth size="md">
                  Speak to an Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
