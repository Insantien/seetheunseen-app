"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatINR, formatDuration } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

// ─── Mock data ────────────────────────────────────────────────────────────────

interface WishlistTour {
  id: string;
  slug: string;
  name: string;
  destination: string;
  durationDays: number;
  priceFrom: number;
  gradientFrom: string;
  gradientTo: string;
}

const INITIAL_WISHLIST: WishlistTour[] = [
  {
    id: "1",
    slug: "enchanting-rajasthan-circuit",
    name: "Enchanting Rajasthan Circuit",
    destination: "Rajasthan, India",
    durationDays: 8,
    priceFrom: 85000,
    gradientFrom: "from-amber-700",
    gradientTo: "to-orange-400",
  },
  {
    id: "2",
    slug: "bali-sacred-temples",
    name: "Bali Sacred Temples & Rice Terraces",
    destination: "Bali, Indonesia",
    durationDays: 7,
    priceFrom: 95000,
    gradientFrom: "from-emerald-700",
    gradientTo: "to-teal-400",
  },
  {
    id: "3",
    slug: "swiss-alps-winter-escape",
    name: "Swiss Alps Winter Escape",
    destination: "Switzerland",
    durationDays: 9,
    priceFrom: 280000,
    gradientFrom: "from-blue-700",
    gradientTo: "to-sky-400",
  },
];

// ─── Tour card ────────────────────────────────────────────────────────────────

function WishlistCard({
  tour,
  onRemove,
}: {
  tour: WishlistTour;
  onRemove: (id: string) => void;
}) {
  const [removing, setRemoving] = useState(false);

  function handleRemove() {
    setRemoving(true);
    // Short animation delay before state update
    setTimeout(() => onRemove(tour.id), 200);
  }

  return (
    <div
      className={cn(
        "bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-200",
        removing && "opacity-0 scale-95"
      )}
    >
      {/* Gradient image placeholder */}
      <div
        className={cn(
          "h-44 bg-gradient-to-br relative",
          tour.gradientFrom,
          tour.gradientTo
        )}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-3 left-4">
          <span className="text-xs font-medium text-white/90 bg-black/30 px-2 py-1 rounded-full">
            {tour.destination}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-playfair font-semibold text-brand-dark text-base leading-snug mb-1">
          {tour.name}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-brand-grey">{formatDuration(tour.durationDays)}</p>
          <p className="text-sm font-semibold text-brand-dark">
            from {formatINR(tour.priceFrom)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/tours/${tour.slug}`}
            className={cn(
              "flex-1 text-center text-sm font-semibold py-2.5 rounded-full",
              "border-[1.5px] border-brand-orange text-brand-orange",
              "hover:bg-brand-orange hover:text-white transition-colors duration-200"
            )}
          >
            View Tour
          </Link>
          <button
            onClick={handleRemove}
            className={cn(
              "p-2.5 rounded-full border border-gray-200 transition-colors duration-200",
              "text-red-400 hover:bg-red-50 hover:border-red-200"
            )}
            aria-label={`Remove ${tour.name} from wishlist`}
          >
            <Heart className="h-4 w-4 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-5">
        <Heart className="h-7 w-7 text-gray-400" />
      </div>
      <h2 className="font-playfair text-xl font-bold text-brand-dark mb-2">
        Your wishlist is empty
      </h2>
      <p className="text-brand-grey text-sm mb-6 max-w-xs">
        Save tours you love and come back to them anytime
      </p>
      <Button as="a" href="/tours" variant="brand">
        Discover Tours
      </Button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistTour[]>(INITIAL_WISHLIST);

  function handleRemove(id: string) {
    setWishlist((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-brand-dark">
          My Wishlist
        </h1>
        <p className="text-brand-grey text-sm mt-1">
          {wishlist.length > 0
            ? `${wishlist.length} tour${wishlist.length !== 1 ? "s" : ""} saved`
            : "No tours saved yet"}
        </p>
      </div>

      {wishlist.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {wishlist.map((tour) => (
            <WishlistCard key={tour.id} tour={tour} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
}
