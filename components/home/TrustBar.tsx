import { Shield, Award, Users, Star } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: <Shield size={18} className="text-brand-orange" />,
    label: "IATA & ASTA Certified",
    sublabel: "Licensed & regulated",
  },
  {
    icon: <Award size={18} className="text-brand-orange" />,
    label: "15+ Years of Excellence",
    sublabel: "Crafting journeys since 2009",
  },
  {
    icon: <Users size={18} className="text-brand-orange" />,
    label: "10,000+ Happy Travellers",
    sublabel: "From 42 countries",
  },
  {
    icon: <Star size={18} className="text-brand-orange fill-brand-orange" />,
    label: "4.9 / 5 Average Rating",
    sublabel: "Across 2,400+ reviews",
  },
  {
    icon: <Award size={18} className="text-brand-orange" />,
    label: "Travel + Leisure Award 2024",
    sublabel: "Best Luxury Tour Operator — India",
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-gray-100 bg-white py-5">
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {/* Divider (hidden on first item) */}
              {i > 0 && (
                <span className="hidden md:block w-px h-8 bg-gray-200" />
              )}
              <div className="flex items-center gap-2">
                <span className="shrink-0">{item.icon}</span>
                <div>
                  <p className="text-xs font-bold font-sans text-brand-dark leading-none">{item.label}</p>
                  <p className="text-[11px] font-sans text-brand-grey mt-0.5">{item.sublabel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
