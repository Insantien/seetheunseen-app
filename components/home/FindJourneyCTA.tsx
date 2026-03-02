import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function FindJourneyCTA() {
  return (
    <section className="py-20 md:py-28 bg-brand-dark overflow-hidden relative">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #FF8C42 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, #FF6F61 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <p className="section-eyebrow text-brand-orange">Personalised For You</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Not Sure Where to Begin?<br />
              <span className="text-gradient">Let the Journey Find You.</span>
            </h2>
            <p className="font-lora text-white/70 text-lg leading-relaxed mb-8">
              Answer 6 simple questions about how you love to travel, and our algorithm
              matches you with your perfect journeys — complete with expert recommendations.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/quiz" className="btn-brand text-sm">
                Start the Quiz <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold font-sans text-sm rounded-full px-6 py-3 hover:bg-white/10 transition-all"
              >
                Speak to an Expert
              </Link>
            </div>
          </div>

          {/* Right: Quiz preview steps */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { q: "How do you like to travel?", options: ["Solo", "As a Couple", "With Family", "In a Group"] },
              { q: "What's your ideal travel vibe?", options: ["Adventure", "Culture", "Relaxation", "Exploration"] },
              { q: "How long is your ideal trip?", options: ["4–6 Days", "7–10 Days", "10–14 Days", "15+ Days"] },
              { q: "What's your budget range?", options: ["₹1–2L", "₹2–4L", "₹4–6L", "₹6L+"] },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <p className="text-xs font-semibold font-sans text-white/70">{step.q}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {step.options.map((opt) => (
                    <span
                      key={opt}
                      className="text-[10px] font-sans font-medium text-white/50 bg-white/5 border border-white/10 rounded-full px-2 py-0.5"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-3 gap-6 text-center">
          {[
            { value: "150+", label: "Tours matched by the quiz" },
            { value: "98%", label: "Satisfaction rate" },
            { value: "2 min", label: "To find your perfect journey" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-playfair text-3xl font-bold text-brand-orange">{stat.value}</p>
              <p className="text-xs font-sans text-white/50 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Corner compass icon */}
      <Compass
        size={200}
        strokeWidth={0.5}
        className="absolute -bottom-10 -right-10 text-white/5"
      />
    </section>
  );
}
