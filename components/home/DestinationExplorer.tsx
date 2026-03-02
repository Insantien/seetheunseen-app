import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const DESTINATIONS = [
  { title: "Rajasthan", slug: "rajasthan", subtitle: "India", gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)", size: "large" },
  { title: "Japan", slug: "japan", subtitle: "Asia", gradient: "linear-gradient(135deg, #DC143C 0%, #8B0000 100%)", size: "medium" },
  { title: "Kerala", slug: "kerala", subtitle: "India", gradient: "linear-gradient(135deg, #006400 0%, #228B22 100%)", size: "medium" },
  { title: "Bhutan", slug: "bhutan", subtitle: "Asia", gradient: "linear-gradient(135deg, #FF8C00 0%, #FF4500 100%)", size: "medium" },
  { title: "Italy", slug: "italy", subtitle: "Europe", gradient: "linear-gradient(135deg, #006400 0%, #FFD700 50%, #DC143C 100%)", size: "medium" },
  { title: "Tanzania", slug: "tanzania", subtitle: "Africa", gradient: "linear-gradient(135deg, #228B22 0%, #DAA520 50%, #000080 100%)", size: "large" },
  { title: "Morocco", slug: "morocco", subtitle: "Africa", gradient: "linear-gradient(135deg, #B8860B 0%, #DC143C 100%)", size: "medium" },
  { title: "Ladakh", slug: "ladakh", subtitle: "India", gradient: "linear-gradient(135deg, #4169E1 0%, #8B4513 100%)", size: "medium" },
];

export default function DestinationExplorer() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="section-container">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            eyebrow="Explore the World"
            title="Destinations We Love"
            subtitle="From the golden deserts of Rajasthan to the emerald shores of Zanzibar — every corner of the world, curated."
            align="left"
            className="mb-0 max-w-xl"
          />
          <Link
            href="/destinations"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold font-sans text-brand-orange hover:underline shrink-0 ml-8"
          >
            All destinations <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px]">
          {/* Large card — spans 2 cols and 2 rows */}
          <DestCard dest={DESTINATIONS[0]} className="col-span-2 row-span-2" />

          {/* Medium cards */}
          <DestCard dest={DESTINATIONS[1]} />
          <DestCard dest={DESTINATIONS[2]} />
          <DestCard dest={DESTINATIONS[3]} />
          <DestCard dest={DESTINATIONS[4]} />

          {/* Large card — spans 2 rows */}
          <DestCard dest={DESTINATIONS[5]} className="col-span-2 row-span-2" />

          <DestCard dest={DESTINATIONS[6]} />
          <DestCard dest={DESTINATIONS[7]} />
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/destinations" className="btn-brand">
            Explore All Destinations <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface DestCardProps {
  dest: (typeof DESTINATIONS)[0];
  className?: string;
}

function DestCard({ dest, className = "" }: DestCardProps) {
  return (
    <Link
      href={`/destinations/${dest.slug}`}
      className={`group relative rounded-2xl overflow-hidden flex items-end p-5 ${className}`}
      style={{ background: dest.gradient }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-brand-orange/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Text */}
      <div className="relative z-10">
        <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/60 mb-1">{dest.subtitle}</p>
        <h3 className="font-playfair font-bold text-white text-xl leading-tight group-hover:text-brand-soft transition-colors">
          {dest.title}
        </h3>
      </div>

      {/* Arrow */}
      <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight size={12} className="text-white" />
      </div>
    </Link>
  );
}
