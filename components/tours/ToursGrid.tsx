"use client";

import Link from "next/link";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatINR, formatDuration } from "@/lib/utils/format";

export interface MockTour {
  id: string;
  slug: string;
  title: string;
  dest: string;
  days: number;
  price: number;
  exp: string;
  isDomestic: boolean;
  gradient: string;
}

interface ToursGridProps {
  tours: MockTour[];
  className?: string;
}

export function ToursGrid({ tours, className }: ToursGridProps) {
  if (tours.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <MapPin className="h-7 w-7 text-gray-400" />
        </div>
        <h3 className="font-playfair text-xl font-bold text-brand-dark mb-2">
          No tours match your filters
        </h3>
        <p className="text-brand-grey text-sm max-w-xs">
          Try adjusting your filters or clearing them to see all tours.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {tours.map((tour) => (
        <TourGridCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}

function TourGridCard({ tour }: { tour: MockTour }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      <Link href={`/tours/${tour.slug}`} className="block relative h-52 overflow-hidden">
        <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105", tour.gradient)} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-white/90 text-brand-orange px-2.5 py-1 rounded-full backdrop-blur-sm">
          {tour.exp}
        </span>
        <span className={cn("absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full", tour.isDomestic ? "bg-emerald-500/90 text-white" : "bg-sky-500/90 text-white")}>
          {tour.isDomestic ? "Domestic" : "Intl"}
        </span>
      </Link>
      <div className="p-5">
        <p className="flex items-center gap-1 text-xs text-brand-grey mb-1.5 font-sans">
          <MapPin size={11} strokeWidth={2} /> {tour.dest}
        </p>
        <Link href={`/tours/${tour.slug}`}>
          <h3 className="font-playfair text-base font-bold text-brand-dark leading-snug mb-3 group-hover:text-brand-orange transition-colors line-clamp-2">
            {tour.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-brand-grey font-sans">
            <Clock size={12} strokeWidth={2} />
            <span>{formatDuration(tour.days)}</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-brand-grey font-sans uppercase tracking-wider">From</p>
            <p className="text-brand-orange font-bold font-sans text-sm leading-none">{formatINR(tour.price)}</p>
          </div>
        </div>
        <Link href={`/tours/${tour.slug}`} className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-orange hover:gap-2 transition-all duration-150">
          View Tour <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
