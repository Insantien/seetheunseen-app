"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-brand-dark via-brand-charcoal to-brand-dark">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center mx-auto mb-5">
            <Mail size={22} className="text-brand-orange" />
          </div>

          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3">
            Get Inspired, Every Week
          </h2>
          <p className="font-lora text-white/60 text-base mb-8 leading-relaxed">
            Curated travel inspiration, insider destination guides, early access to new tours,
            and exclusive offers — delivered to your inbox.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <p className="font-sans font-semibold text-white">
                You&apos;re subscribed! Welcome to See the Unseen.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first name"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-brand-orange transition-colors"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-[2] bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-brand-orange transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-brand-orange to-brand-coral text-white font-semibold font-sans text-sm rounded-full px-7 py-3.5 hover:shadow-brand hover:-translate-y-px transition-all disabled:opacity-60 shrink-0"
              >
                {status === "loading" ? (
                  <span className="w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin" />
                ) : (
                  <>Subscribe <ArrowRight size={16} /></>
                )}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-red-400 text-sm font-sans mt-3">Something went wrong. Please try again.</p>
          )}

          <p className="text-white/30 text-xs font-sans mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
