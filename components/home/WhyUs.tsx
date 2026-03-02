import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Gem, HeartHandshake, Globe, Users, BookOpen, ShieldCheck
} from "lucide-react";

const USP_ITEMS = [
  {
    icon: <Gem size={28} strokeWidth={1.5} className="text-brand-orange" />,
    title: "Genuinely Curated",
    description: "Every destination, property, and experience on our roster has been personally vetted by our team. No mass-market packages.",
  },
  {
    icon: <HeartHandshake size={28} strokeWidth={1.5} className="text-brand-orange" />,
    title: "Dedicated Travel Designer",
    description: "Each itinerary is crafted one-on-one with a specialist who knows your chosen destination intimately.",
  },
  {
    icon: <Globe size={28} strokeWidth={1.5} className="text-brand-orange" />,
    title: "150+ Destinations",
    description: "From the hidden gems of Bhutan to the romance of the Italian Riviera — we've journeyed everywhere so you don't have to guess.",
  },
  {
    icon: <Users size={28} strokeWidth={1.5} className="text-brand-orange" />,
    title: "Small, Private Groups",
    description: "We keep group sizes intimate so you experience places deeply, not through the lens of a tour bus window.",
  },
  {
    icon: <BookOpen size={28} strokeWidth={1.5} className="text-brand-orange" />,
    title: "15 Years of Expertise",
    description: "Founded in 2009, we bring decade-and-a-half of relationships with the world's finest hotels, guides, and operators.",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} className="text-brand-orange" />,
    title: "IATA & ASTA Certified",
    description: "Travel with complete confidence. Every journey is protected, licensed, and designed with your safety as the foundation.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="section-container">
        <SectionHeader
          eyebrow="Why See the Unseen"
          title="Travel Crafted Differently"
          subtitle="We're not a booking engine. We're your trusted travel companion — obsessive planners, experienced travellers, and passionate storytellers."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {USP_ITEMS.map((item) => (
            <div
              key={item.title}
              className="group p-7 rounded-2xl border border-gray-100 hover:border-brand-orange/30 hover:shadow-card-hover transition-all duration-300 bg-white"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-5 group-hover:bg-brand-orange/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="font-playfair text-xl font-bold text-brand-dark mb-3">
                {item.title}
              </h3>
              <p className="font-lora text-brand-grey text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
