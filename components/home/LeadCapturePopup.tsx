"use client";

/**
 * LeadCapturePopup — See the Unseen
 *
 * Appears after 4 seconds on first visit. Uses localStorage key
 * "popup_dismissed" to ensure it only shows once per browser.
 * CSS transitions only — no framer-motion dependency.
 */

import { useState, useEffect, useCallback } from "react";
import { X, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "popup_dismissed";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function LeadCapturePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimating(true));
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }
    }, 300);
  }, []);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) dismiss();
    },
    [dismiss]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: "popup" }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleOverlayClick}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6",
        "bg-black/60 backdrop-blur-sm",
        "transition-opacity duration-300",
        isAnimating ? "opacity-100" : "opacity-0"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Exclusive travel deals"
    >
      <div
        className={cn(
          "relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl",
          "transition-all duration-300",
          isAnimating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-4"
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: luxury image panel */}
          <div className="relative bg-gradient-to-br from-brand-charcoal via-stone-800 to-brand-dark hidden md:flex flex-col justify-end p-8 min-h-[440px]">
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top_right,_#FF8C42_0%,_transparent_60%)]" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="relative flex flex-wrap gap-2 mb-6">
              {["Rajasthan", "Kerala", "Bhutan", "Vietnam"].map((dest) => (
                <span
                  key={dest}
                  className="text-[10px] font-sans font-semibold text-white/70 border border-white/20 rounded-full px-3 py-1"
                >
                  {dest}
                </span>
              ))}
            </div>
            <div className="relative">
              <p className="font-sans text-xs font-semibold text-brand-orange uppercase tracking-widest mb-2">
                See the Unseen
              </p>
              <h3 className="font-playfair text-2xl font-bold text-white leading-tight">
                Your Next Great<br />Adventure Awaits
              </h3>
              <p className="mt-3 font-lora text-sm text-white/60 leading-relaxed">
                Handcrafted journeys to the world&apos;s most extraordinary places.
              </p>
            </div>
          </div>

          {/* Right: form panel */}
          <div className="relative p-8 md:p-10 flex flex-col justify-center">
            <button
              onClick={dismiss}
              aria-label="Close popup"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-brand-charcoal hover:bg-gray-200 transition-colors duration-150"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {status === "success" ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-brand-dark mb-2">
                  You&apos;re In!
                </h3>
                <p className="font-lora text-brand-grey text-sm leading-relaxed mb-6">
                  Welcome to the See the Unseen community. Your first curated
                  travel letter is on its way.
                </p>
                <Button variant="outline" size="sm" onClick={dismiss}>
                  Explore Destinations
                </Button>
              </div>
            ) : (
              <>
                <p className="font-sans text-xs font-semibold text-brand-orange uppercase tracking-widest mb-2">
                  Members Only
                </p>
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-brand-dark leading-tight mb-3">
                  Get Exclusive<br />Travel Deals
                </h3>
                <p className="font-lora text-brand-grey text-sm leading-relaxed mb-5">
                  Join 10,000+ travellers who receive our curated luxury travel
                  offers, destination guides and early-bird deals.
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
                  {["Early-bird pricing", "Exclusive itineraries", "Insider guides"].map((badge) => (
                    <span key={badge} className="flex items-center gap-1.5 font-sans text-xs text-brand-grey">
                      <span className="w-4 h-4 rounded-full bg-brand-orange/15 flex items-center justify-center shrink-0">
                        <Check size={10} className="text-brand-orange" strokeWidth={3} />
                      </span>
                      {badge}
                    </span>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your first name"
                    autoComplete="given-name"
                    className="w-full rounded-xl px-4 py-3 text-sm font-sans bg-brand-light border border-gray-200 text-brand-dark placeholder-brand-grey/60 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-colors duration-150"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl px-4 py-3 text-sm font-sans bg-brand-light border border-gray-200 text-brand-dark placeholder-brand-grey/60 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-colors duration-150"
                  />
                  {status === "error" && (
                    <p className="text-red-500 text-xs font-sans">{errorMsg}</p>
                  )}
                  <Button
                    type="submit"
                    variant="brand"
                    size="md"
                    fullWidth
                    loading={status === "loading"}
                    iconRight={status !== "loading" ? <ArrowRight size={16} /> : undefined}
                    className="mt-1"
                  >
                    Get Exclusive Deals
                  </Button>
                </form>
                <p className="mt-3 text-center font-sans text-[11px] text-brand-grey/50">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
