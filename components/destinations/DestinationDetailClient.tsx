"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { formatINR } from "@/lib/utils/format";

interface DestinationDetailClientProps {
  slug: string;
}

const BEST_TIME_ROWS = [
  {
    season: "Oct – Mar",
    label: "Peak Season",
    badge: "Best",
    weather: "Cool & dry. Ideal for sightseeing, desert camps, and wildlife safaris.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    season: "Apr – Jun",
    label: "Summer",
    badge: "Hot",
    weather: "Intense heat, especially in the Thar Desert. Not recommended for outdoor touring.",
    color: "bg-orange-50 text-orange-700",
  },
  {
    season: "Jul – Sep",
    label: "Monsoon",
    badge: "Monsoon",
    weather: "Occasional rains refresh the landscape. Fewer tourists, but some roads may flood.",
    color: "bg-blue-50 text-blue-700",
  },
];

const WHY_VISIT = [
  "UNESCO World Heritage sites including Amber Fort and Jantar Mantar",
  "Vibrant folk culture, music, and the living arts of Rajasthani craft",
  "Luxury palace hotels with world-class Rajput hospitality",
  "The vast Thar Desert — camel safaris and star-lit camps",
  "Ranthambore National Park — Bengal Tiger sightings",
  "Colourful bazaars of Jaipur, Jodhpur, and Udaipur",
];

const MOCK_TOURS = [
  {
    title: "Royal Rajasthan Grand Tour",
    duration: "12 Days",
    price: 185000,
    gradient: "from-amber-700 to-orange-900",
    slug: "royal-rajasthan-grand-tour",
  },
  {
    title: "Desert Dunes & Palace Stays",
    duration: "8 Days",
    price: 125000,
    gradient: "from-orange-600 to-red-900",
    slug: "desert-dunes-palace-stays",
  },
  {
    title: "Rajasthan Wildlife & Culture",
    duration: "10 Days",
    price: 155000,
    gradient: "from-stone-600 to-amber-900",
    slug: "rajasthan-wildlife-culture",
  },
];

export function DestinationDetailClient({ slug }: DestinationDetailClientProps) {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Guide download handler — no-op in mock
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-96 bg-gradient-to-br from-amber-700 to-orange-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 60%, #fff 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 section-container h-full flex flex-col justify-end pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-sm font-sans mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/destinations" className="hover:text-white transition-colors">
              Destinations
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">Rajasthan</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Badge label="India" variant="orange" />
            <Badge label="Domestic" variant="green" />
          </div>
          <h1 className="font-playfair text-5xl font-bold text-white leading-tight mb-3">
            Rajasthan
          </h1>
          <p className="font-lora text-xl text-white/70">
            Land of Maharajas &amp; Eternal Sands
          </p>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="section-container py-4">
          <div className="flex flex-wrap gap-4 md:gap-8">
            {[
              { label: "Region", value: "India" },
              { label: "Travel Type", value: "Domestic" },
              { label: "Tours Available", value: "8 Tours" },
              { label: "Best Season", value: "Oct – Mar" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="text-xs font-sans font-semibold uppercase tracking-wide text-brand-grey">
                  {stat.label}
                </span>
                <span className="text-sm font-sans font-bold text-brand-dark">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          {/* LEFT CONTENT */}
          <div className="space-y-12">
            {/* About */}
            <section>
              <h2 className="font-playfair text-3xl font-bold text-brand-dark mb-4">
                About Rajasthan
              </h2>
              <div className="space-y-4 font-lora text-brand-charcoal leading-relaxed text-[1.0625rem]">
                <p>
                  Rajasthan, the "Land of Kings," is India's largest state and arguably its most
                  theatrical. Vast stretches of golden Thar Desert give way to dramatic forts atop
                  rocky hills, shimmering lake palaces, and walled medieval cities painted in shades
                  of blue, pink, and gold. For centuries, warrior clans — the Rajputs — built some
                  of the subcontinent's most magnificent architecture here, and their legacy is etched
                  into every carved haveli facade and echoing palace corridor.
                </p>
                <p>
                  Beyond the architecture, Rajasthan pulses with a living culture — camel herders at
                  dawn, folk musicians in candlelit courtyards, artisans weaving block-printed textiles
                  that have been exported since the Mughal era. A journey through Rajasthan is an
                  immersion in contrasts: bone-dry deserts and serene lakes, ancient traditions and
                  world-class luxury, silence under a billion stars and the cacophony of its legendary
                  bazaars.
                </p>
              </div>
            </section>

            {/* Why Visit */}
            <section>
              <h2 className="font-playfair text-3xl font-bold text-brand-dark mb-5">
                Why Visit?
              </h2>
              <ul className="space-y-3">
                {WHY_VISIT.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-brand-orange" />
                    </span>
                    <span className="font-sans text-brand-charcoal text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Best Time to Visit */}
            <section>
              <h2 className="font-playfair text-3xl font-bold text-brand-dark mb-5">
                Best Time to Visit
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm font-sans border-collapse">
                  <thead>
                    <tr className="bg-brand-light">
                      <th className="px-4 py-3 text-left font-semibold text-brand-dark">Season</th>
                      <th className="px-4 py-3 text-left font-semibold text-brand-dark">Months</th>
                      <th className="px-4 py-3 text-left font-semibold text-brand-dark">Conditions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BEST_TIME_ROWS.map((row, idx) => (
                      <tr
                        key={idx}
                        className={cn(
                          "border-t border-gray-100",
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        )}
                      >
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
                              row.color
                            )}
                          >
                            {row.badge}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-brand-dark">{row.season}</td>
                        <td className="px-4 py-3 text-brand-grey leading-relaxed">{row.weather}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Photo Gallery */}
            <section>
              <h2 className="font-playfair text-3xl font-bold text-brand-dark mb-5">
                Gallery
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "from-amber-600 to-orange-800",
                  "from-rose-600 to-red-900",
                  "from-stone-500 to-amber-800",
                  "from-orange-500 to-yellow-800",
                  "from-red-700 to-orange-900",
                  "from-amber-800 to-stone-900",
                ].map((grad, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "h-40 rounded-xl bg-gradient-to-br",
                      grad
                    )}
                  />
                ))}
              </div>
            </section>

            {/* Tours in Rajasthan */}
            <section>
              <h2 className="font-playfair text-3xl font-bold text-brand-dark mb-6">
                Tours in Rajasthan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {MOCK_TOURS.map((tour) => (
                  <div
                    key={tour.slug}
                    className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm group"
                  >
                    <div
                      className={cn(
                        "h-40 bg-gradient-to-br relative",
                        tour.gradient
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="text-xs font-sans font-semibold text-white/80 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          {tour.duration}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-playfair font-bold text-brand-dark text-base leading-tight mb-1">
                        {tour.title}
                      </h3>
                      <p className="text-xs font-sans text-brand-grey mb-3">
                        From {formatINR(tour.price)} per person
                      </p>
                      <Link
                        href={`/tours/${tour.slug}`}
                        className="inline-flex items-center text-sm font-semibold font-sans text-brand-orange hover:underline"
                      >
                        View Tour &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-20 self-start">
            {/* Download Guide Card */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="h-28 bg-gradient-to-br from-amber-700 to-orange-900 relative flex items-end p-5">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="relative z-10">
                  <p className="text-white/70 text-xs font-sans uppercase tracking-widest">
                    Free Download
                  </p>
                  <p className="text-white font-playfair font-bold text-lg leading-tight">
                    Rajasthan Destination Guide
                  </p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-brand-grey text-sm font-sans mb-4 leading-relaxed">
                  Get our expert guide — best routes, hidden gems, and insider tips.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInput}
                    required
                    className="w-full px-4 py-2.5 text-sm font-sans rounded-lg border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInput}
                    required
                    className="w-full px-4 py-2.5 text-sm font-sans rounded-lg border border-gray-200 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                  <Button type="submit" variant="brand" fullWidth size="sm">
                    Download Free Guide
                  </Button>
                </form>
              </div>
            </div>

            {/* Plan Your Trip Card */}
            <div className="rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="font-playfair font-bold text-brand-dark text-lg">
                Plan Your Trip
              </h3>
              <p className="text-brand-grey text-sm font-sans leading-relaxed">
                Ready to explore Rajasthan? Find a tour that fits your style and travel dates.
              </p>
              <div className="space-y-2">
                <Button variant="brand" fullWidth size="sm" as="a" href="/tours?destination=rajasthan">
                  Find Your Perfect Tour
                </Button>
                <Button variant="outline" fullWidth size="sm" as="a" href="/contact">
                  Speak to an Expert
                </Button>
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-playfair font-bold text-brand-dark text-lg mb-4">
                Quick Facts
              </h3>
              <dl className="space-y-3">
                {[
                  { term: "Capital City", def: "Jaipur" },
                  { term: "Language", def: "Hindi, Rajasthani" },
                  { term: "Currency", def: "Indian Rupee (₹)" },
                  { term: "Best Season", def: "October to March" },
                  { term: "Time Zone", def: "IST (UTC+5:30)" },
                ].map((fact) => (
                  <div
                    key={fact.term}
                    className="flex items-start justify-between gap-4 border-b border-gray-50 pb-2 last:border-0 last:pb-0"
                  >
                    <dt className="text-xs font-sans font-semibold uppercase tracking-wide text-brand-grey shrink-0">
                      {fact.term}
                    </dt>
                    <dd className="text-sm font-sans text-brand-dark font-medium text-right">
                      {fact.def}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
