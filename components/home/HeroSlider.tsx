"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Play } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { HeroSlide } from "@/types";

// Fallback static slides used before CMS data is loaded
const FALLBACK_SLIDES: HeroSlide[] = [
  {
    _key: "1",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    experienceType: "SCENIC ESCAPES",
    headline: "Where the World Reveals Its Grandeur",
    subheadline: "Palace trains, mountain lodges, and routes that take your breath away",
    ctaLabel: "Explore Scenic Escapes",
    ctaLink: "/experiences/scenic-escapes",
  },
  {
    _key: "2",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    experienceType: "BLUE ESCAPES",
    headline: "Let the Water Lead the Way",
    subheadline: "Ocean voyages, river journeys, and lakeside retreats crafted for the discerning",
    ctaLabel: "Explore Blue Escapes",
    ctaLink: "/experiences/blue-escapes",
  },
  {
    _key: "3",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    experienceType: "EARTH'S MARVELS",
    headline: "Into the Wild, Beyond the Ordinary",
    subheadline: "Witness rare wildlife, pristine landscapes, and nature's most extraordinary spectacles",
    ctaLabel: "Explore Earth's Marvels",
    ctaLink: "/experiences/earths-marvels",
  },
  {
    _key: "4",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    experienceType: "WELLNESS RESET",
    headline: "Restore. Reconnect. Rediscover.",
    subheadline: "Transformative wellness journeys set in the world's most serene sanctuaries",
    ctaLabel: "Explore Wellness Reset",
    ctaLink: "/experiences/wellness-reset",
  },
];

// Gradient backgrounds for fallback (before real images load)
const SLIDE_GRADIENTS = [
  "linear-gradient(135deg, #2c4a3e 0%, #1a2f28 50%, #0d1f1a 100%)",
  "linear-gradient(135deg, #0d3b5e 0%, #1a5c8a 50%, #0a2840 100%)",
  "linear-gradient(135deg, #2d4a1e 0%, #1a3510 50%, #3b2b0a 100%)",
  "linear-gradient(135deg, #1e3a3a 0%, #2a4040 50%, #3b2b35 100%)",
];

interface HeroSliderProps {
  slides?: HeroSlide[];
  sanityImages?: Record<string, string>; // _key → image URL
}

export default function HeroSlider({ slides = FALLBACK_SLIDES, sanityImages = {} }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const goTo = useCallback((index: number) => {
    setCurrent(((index % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay, next]);

  const slide = slides[current];
  const imageSrc = sanityImages[slide._key] ?? null;
  const bgStyle = imageSrc ? {} : { background: SLIDE_GRADIENTS[current % SLIDE_GRADIENTS.length] };

  return (
    <section
      className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Slides */}
      {slides.map((s, i) => {
        const src = sanityImages[s._key] ?? null;
        return (
          <div
            key={s._key}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
            style={src ? {} : { background: SLIDE_GRADIENTS[i % SLIDE_GRADIENTS.length] }}
          >
            {src && (
              <Image
                src={src}
                alt={s.headline}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/70" />
          </div>
        );
      })}

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-20 md:pb-24">
        <div className="section-container">
          {/* Experience type label */}
          <p
            key={`eyebrow-${current}`}
            className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-white/80 mb-4 animate-fade-in"
          >
            {slide.experienceType}
          </p>

          {/* Main headline */}
          <h1
            key={`headline-${current}`}
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none mb-4 max-w-3xl animate-slide-up"
          >
            {slide.headline}
          </h1>

          {/* Sub-headline */}
          <p
            key={`sub-${current}`}
            className="text-base md:text-lg font-lora text-white/80 mb-8 max-w-xl leading-relaxed animate-fade-in"
          >
            {slide.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={slide.ctaLink}
              className="inline-flex items-center gap-2 bg-gradient-to-br from-brand-orange to-brand-coral text-white font-semibold font-sans text-sm rounded-full px-7 py-3.5 hover:shadow-brand hover:-translate-y-px transition-all"
            >
              {slide.ctaLabel}
              <ChevronRight size={16} strokeWidth={2.5} />
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-semibold font-sans text-sm rounded-full px-7 py-3.5 hover:bg-white/25 transition-all border border-white/20"
            >
              <Play size={13} strokeWidth={2.5} className="fill-white" />
              Find My Journey
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "transition-all duration-300 rounded-full",
              i === current
                ? "w-8 h-2 bg-brand-orange"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            )}
          />
        ))}
      </div>

      {/* Arrow controls (desktop) */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm items-center justify-center text-white hover:bg-white/30 transition-all border border-white/20"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm items-center justify-center text-white hover:bg-white/30 transition-all border border-white/20"
      >
        <ChevronRight size={20} />
      </button>

      {/* Scroll cue */}
      <div className="absolute bottom-6 right-8 z-20 hidden md:flex flex-col items-center gap-1">
        <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-white/50">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
