"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Heart } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatINR, formatDuration } from "@/lib/utils/format";
import { urlForSized } from "@/lib/sanity/client";
import type { TourCard as TourCardType } from "@/types";

interface TourCardProps {
  tour: TourCardType;
  className?: string;
  variant?: "default" | "wide";
  onWishlistToggle?: (tourId: string, isSaved: boolean) => void;
  isSaved?: boolean;
}

export function TourCard({
  tour,
  className,
  variant = "default",
  onWishlistToggle,
  isSaved = false,
}: TourCardProps) {
  const imageSrc = tour.heroImage
    ? urlForSized(tour.heroImage, variant === "wide" ? 900 : 600, 400)
    : "/placeholder-tour.jpg";

  const primaryExperience = tour.experienceTypes?.[0];
  const primaryDestination = tour.destinations?.[0];

  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden",
        "shadow-card hover:shadow-card-hover transition-all duration-300",
        variant === "wide" && "flex flex-col md:flex-row",
        className
      )}
    >
      {/* Image */}
      <Link
        href={`/tours/${tour.slug.current}`}
        className={cn(
          "block relative overflow-hidden",
          variant === "wide" ? "md:w-[45%] h-56 md:h-auto" : "h-52"
        )}
        aria-label={tour.title}
      >
        <Image
          src={imageSrc}
          alt={tour.heroImage?.alt ?? tour.title}
          fill
          sizes={variant === "wide" ? "(max-width:768px) 100vw, 45vw" : "(max-width:768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Experience Type Tag */}
        {primaryExperience && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-white/90 text-brand-orange px-2.5 py-1 rounded-full backdrop-blur-sm">
            {primaryExperience.title}
          </span>
        )}

        {/* Domestic / International Tag */}
        <span
          className={cn(
            "absolute top-3 right-10 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full",
            tour.isDomestic
              ? "bg-emerald-500/90 text-white"
              : "bg-sky-500/90 text-white"
          )}
        >
          {tour.isDomestic ? "Domestic" : "International"}
        </span>
      </Link>

      {/* Wishlist button */}
      {onWishlistToggle && (
        <button
          onClick={() => onWishlistToggle(tour._id, isSaved)}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Heart
            size={16}
            className={cn(
              "transition-colors",
              isSaved ? "fill-brand-coral stroke-brand-coral" : "stroke-brand-grey"
            )}
          />
        </button>
      )}

      {/* Content */}
      <div className={cn("p-5", variant === "wide" && "flex-1 flex flex-col justify-between")}>
        <div>
          {/* Destination */}
          {primaryDestination && (
            <p className="flex items-center gap-1 text-xs text-brand-grey mb-2 font-sans">
              <MapPin size={11} strokeWidth={2} />
              {primaryDestination.title}
            </p>
          )}

          {/* Title */}
          <Link href={`/tours/${tour.slug.current}`}>
            <h3 className="font-playfair text-lg font-bold text-brand-dark leading-snug mb-2 group-hover:text-brand-orange transition-colors line-clamp-2">
              {tour.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm text-brand-grey font-lora leading-relaxed line-clamp-2 mb-4">
            {tour.shortDescription}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-brand-grey font-sans">
            <Clock size={12} strokeWidth={2} />
            <span>{formatDuration(tour.duration)}</span>
          </div>
          <div>
            <p className="text-[10px] text-brand-grey font-sans uppercase tracking-wider">From</p>
            <p className="text-brand-orange font-bold font-sans text-base leading-none">
              {formatINR(tour.pricePerAdult)}
            </p>
            <p className="text-[9px] text-brand-grey font-sans">per adult</p>
          </div>
        </div>
      </div>
    </div>
  );
}
