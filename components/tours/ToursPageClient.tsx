"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, X, SlidersHorizontal, MapPin, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";
import { formatINR, formatDuration } from "@/lib/utils/format";

// ─── Types ────────────────────────────────────────────────

interface MockTour {
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

type SortOption = "featured" | "price-asc" | "price-desc" | "duration-asc" | "duration-desc";
type DurationRange = "any" | "1-5" | "6-9" | "10-14" | "15+";
type DomesticFilter = "all" | "domestic" | "international";

// ─── Mock Data ────────────────────────────────────────────

const MOCK_TOURS: MockTour[] = [
  { id: "1",  slug: "enchanting-rajasthan-circuit",    title: "Enchanting Rajasthan Circuit",       dest: "Rajasthan, India",         days: 10, price: 85000,  exp: "Scenic Escapes",      isDomestic: true,  gradient: "from-amber-700 to-orange-900" },
  { id: "2",  slug: "kerala-backwater-spice-trail",    title: "Kerala Backwater & Spice Trail",     dest: "Kerala, India",            days: 7,  price: 65000,  exp: "Scenic Escapes",      isDomestic: true,  gradient: "from-green-700 to-emerald-900" },
  { id: "3",  slug: "japan-cherry-blossom",            title: "Japan Cherry Blossom Tour",          dest: "Tokyo & Kyoto, Japan",     days: 12, price: 185000, exp: "Scenic Escapes",      isDomestic: false, gradient: "from-pink-600 to-rose-900" },
  { id: "4",  slug: "swiss-alps-rhine-cruise",         title: "Swiss Alps & Rhine Cruise",          dest: "Switzerland",              days: 10, price: 240000, exp: "Blue Escapes",        isDomestic: false, gradient: "from-blue-600 to-indigo-900" },
  { id: "5",  slug: "maldives-overwater-paradise",     title: "Maldives Overwater Paradise",        dest: "Maldives",                 days: 6,  price: 145000, exp: "Signature Stays",     isDomestic: false, gradient: "from-sky-500 to-cyan-900" },
  { id: "6",  slug: "himalayan-expedition-ladakh",     title: "Himalayan Expedition: Leh Ladakh",   dest: "Leh-Ladakh, India",        days: 8,  price: 72000,  exp: "Outdoor Thrills",     isDomestic: true,  gradient: "from-slate-600 to-blue-900" },
  { id: "7",  slug: "bali-wellness-retreat",           title: "Bali Spiritual & Wellness Retreat",  dest: "Bali, Indonesia",          days: 9,  price: 120000, exp: "Wellness Reset",      isDomestic: false, gradient: "from-teal-600 to-green-900" },
  { id: "8",  slug: "tuscany-food-wine",               title: "Tuscany Food & Wine Tour",           dest: "Tuscany, Italy",           days: 8,  price: 210000, exp: "Legendary Journeys",  isDomestic: false, gradient: "from-red-700 to-rose-900" },
  { id: "9",  slug: "amazon-adventure",                title: "Amazon Rainforest Adventure",        dest: "Amazon, Brazil",           days: 10, price: 275000, exp: "Outdoor Thrills",     isDomestic: false, gradient: "from-green-800 to-lime-900" },
  { id: "10", slug: "andaman-islands-escape",          title: "Andaman Islands Escape",             dest: "Andaman Islands, India",   days: 6,  price: 58000,  exp: "Blue Escapes",        isDomestic: true,  gradient: "from-cyan-600 to-teal-900" },
  { id: "11", slug: "bhutan-kingdom-tigers-nest",      title: "Bhutan Kingdom & Tiger's Nest",      dest: "Thimphu & Paro, Bhutan",  days: 7,  price: 130000, exp: "Earth's Marvels",     isDomestic: false, gradient: "from-stone-600 to-amber-900" },
  { id: "12", slug: "diwali-varanasi",                 title: "Diwali in Varanasi Experience",      dest: "Varanasi, India",          days: 5,  price: 45000,  exp: "Festive Getaways",    isDomestic: true,  gradient: "from-orange-600 to-yellow-900" },
];

const EXPERIENCE_TYPES = [
  "Scenic Escapes",
  "Blue Escapes",
  "Earth's Marvels",
  "Family Thrills",
  "Legendary Journeys",
  "Signature Stays",
  "Outdoor Thrills",
  "Festive Getaways",
  "Wellness Reset",
];

const DESTINATIONS = [
  "Rajasthan",
  "Kerala",
  "Japan",
  "Bali",
  "Maldives",
  "Switzerland",
  "Italy",
  "Andaman Islands",
];

const GROUP_TYPES = ["Solo", "Couple", "Family", "Group"];

const DURATION_OPTIONS: { label: string; value: DurationRange }[] = [
  { label: "Any Duration", value: "any" },
  { label: "1–5 Days",     value: "1-5" },
  { label: "6–9 Days",     value: "6-9" },
  { label: "10–14 Days",   value: "10-14" },
  { label: "15+ Days",     value: "15+" },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Featured",          value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Shortest First",    value: "duration-asc" },
  { label: "Longest First",     value: "duration-desc" },
];

const PAGE_SIZE = 12;

// ─── Input class helper ───────────────────────────────────

const inputCls = cn(
  "w-full rounded-xl px-3 py-2 text-sm font-sans",
  "bg-white border border-gray-200 text-brand-dark placeholder-brand-grey/50",
  "focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20",
  "transition-colors duration-150"
);

// ─── Filter Panel Section ─────────────────────────────────

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand-charcoal">
          {title}
        </span>
        {open ? (
          <ChevronUp size={14} className="text-brand-grey" />
        ) : (
          <ChevronDown size={14} className="text-brand-grey" />
        )}
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

// ─── Tour Card ────────────────────────────────────────────

function TourListCard({ tour }: { tour: MockTour }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
      {/* Image placeholder */}
      <div className={cn("relative h-52 bg-gradient-to-br", tour.gradient)}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Experience type tag */}
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-white/90 text-brand-orange px-2.5 py-1 rounded-full">
          {tour.exp}
        </span>

        {/* Domestic / International tag */}
        <span
          className={cn(
            "absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full",
            tour.isDomestic
              ? "bg-emerald-500/90 text-white"
              : "bg-sky-500/90 text-white"
          )}
        >
          {tour.isDomestic ? "India" : "International"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="flex items-center gap-1 text-xs text-brand-grey font-sans mb-1.5">
          <MapPin size={11} strokeWidth={2} />
          {tour.dest}
        </p>

        <Link href={`/tours/${tour.slug}`}>
          <h3 className="font-playfair text-lg font-bold text-brand-dark leading-snug mb-3 group-hover:text-brand-orange transition-colors line-clamp-2">
            {tour.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-1 text-xs text-brand-grey font-sans">
            <Clock size={12} strokeWidth={2} />
            <span>{formatDuration(tour.days)}</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-brand-grey font-sans uppercase tracking-wider">From</p>
            <p className="text-brand-orange font-bold font-sans text-base leading-none">
              {formatINR(tour.price)}
            </p>
            <p className="text-[9px] text-brand-grey font-sans">per adult</p>
          </div>
        </div>

        <Link href={`/tours/${tour.slug}`} className="mt-4">
          <Button variant="outline" size="sm" fullWidth>
            View Tour
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────

export function ToursPageClient() {
  // Filter state
  const [search, setSearch]             = useState("");
  const [expTypes, setExpTypes]         = useState<string[]>([]);
  const [dests, setDests]               = useState<string[]>([]);
  const [duration, setDuration]         = useState<DurationRange>("any");
  const [groupTypes, setGroupTypes]     = useState<string[]>([]);
  const [domestic, setDomestic]         = useState<DomesticFilter>("all");
  const [sortBy, setSortBy]             = useState<SortOption>("featured");

  // UI state
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Toggle helpers
  const toggleItem = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  };

  // Clear all
  const clearAll = () => {
    setSearch("");
    setExpTypes([]);
    setDests([]);
    setDuration("any");
    setGroupTypes([]);
    setDomestic("all");
    setSortBy("featured");
    setVisibleCount(PAGE_SIZE);
  };

  // Active filter chips
  const activeChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];
    if (search) chips.push({ label: `"${search}"`, onRemove: () => setSearch("") });
    expTypes.forEach((e) => chips.push({ label: e, onRemove: () => toggleItem(expTypes, setExpTypes, e) }));
    dests.forEach((d) => chips.push({ label: d, onRemove: () => toggleItem(dests, setDests, d) }));
    if (duration !== "any") chips.push({ label: `${duration} days`, onRemove: () => setDuration("any") });
    groupTypes.forEach((g) => chips.push({ label: g, onRemove: () => toggleItem(groupTypes, setGroupTypes, g) }));
    if (domestic !== "all") chips.push({ label: domestic === "domestic" ? "India Only" : "International Only", onRemove: () => setDomestic("all") });
    return chips;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, expTypes, dests, duration, groupTypes, domestic]);

  // Filter + sort
  const filtered = useMemo(() => {
    let tours = [...MOCK_TOURS];

    if (search.trim()) {
      const q = search.toLowerCase();
      tours = tours.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.dest.toLowerCase().includes(q) ||
          t.exp.toLowerCase().includes(q)
      );
    }

    if (expTypes.length > 0) {
      tours = tours.filter((t) => expTypes.includes(t.exp));
    }

    if (dests.length > 0) {
      tours = tours.filter((t) =>
        dests.some((d) => t.dest.toLowerCase().includes(d.toLowerCase()))
      );
    }

    if (duration !== "any") {
      tours = tours.filter((t) => {
        if (duration === "1-5")  return t.days >= 1  && t.days <= 5;
        if (duration === "6-9")  return t.days >= 6  && t.days <= 9;
        if (duration === "10-14") return t.days >= 10 && t.days <= 14;
        if (duration === "15+")  return t.days >= 15;
        return true;
      });
    }

    if (domestic === "domestic")      tours = tours.filter((t) => t.isDomestic);
    if (domestic === "international") tours = tours.filter((t) => !t.isDomestic);

    // Sort
    if (sortBy === "price-asc")       tours.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc")      tours.sort((a, b) => b.price - a.price);
    if (sortBy === "duration-asc")    tours.sort((a, b) => a.days - b.days);
    if (sortBy === "duration-desc")   tours.sort((a, b) => b.days - a.days);

    return tours;
  }, [search, expTypes, dests, duration, groupTypes, domestic, sortBy]);

  const visible = filtered.slice(0, visibleCount);

  // ── Filter Panel (shared between sidebar and mobile sheet) ──

  const filterPanel = (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-playfair text-lg font-bold text-brand-dark">Filter Tours</h2>
        <button
          type="button"
          onClick={clearAll}
          className="font-sans text-xs text-brand-orange hover:underline font-semibold"
        >
          Clear All
        </button>
      </div>

      {/* Search */}
      <FilterSection title="Search">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-grey" />
          <input
            type="text"
            placeholder="Search tours..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
            className={cn(inputCls, "pl-8")}
          />
        </div>
      </FilterSection>

      {/* Experience Type */}
      <FilterSection title="Experience Type">
        {EXPERIENCE_TYPES.map((exp) => (
          <label key={exp} className="flex items-center gap-2 cursor-pointer group/cb">
            <input
              type="checkbox"
              checked={expTypes.includes(exp)}
              onChange={() => { toggleItem(expTypes, setExpTypes, exp); setVisibleCount(PAGE_SIZE); }}
              className="w-3.5 h-3.5 accent-brand-orange cursor-pointer"
            />
            <span className="font-sans text-sm text-brand-grey group-hover/cb:text-brand-dark transition-colors">
              {exp}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Destination */}
      <FilterSection title="Destination" defaultOpen={false}>
        {DESTINATIONS.map((dest) => (
          <label key={dest} className="flex items-center gap-2 cursor-pointer group/cb">
            <input
              type="checkbox"
              checked={dests.includes(dest)}
              onChange={() => { toggleItem(dests, setDests, dest); setVisibleCount(PAGE_SIZE); }}
              className="w-3.5 h-3.5 accent-brand-orange cursor-pointer"
            />
            <span className="font-sans text-sm text-brand-grey group-hover/cb:text-brand-dark transition-colors">
              {dest}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Duration */}
      <FilterSection title="Duration" defaultOpen={false}>
        {DURATION_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer group/rb">
            <input
              type="radio"
              name="duration"
              value={opt.value}
              checked={duration === opt.value}
              onChange={() => { setDuration(opt.value); setVisibleCount(PAGE_SIZE); }}
              className="w-3.5 h-3.5 accent-brand-orange cursor-pointer"
            />
            <span className="font-sans text-sm text-brand-grey group-hover/rb:text-brand-dark transition-colors">
              {opt.label}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Group Type */}
      <FilterSection title="Group Type" defaultOpen={false}>
        {GROUP_TYPES.map((g) => (
          <label key={g} className="flex items-center gap-2 cursor-pointer group/cb">
            <input
              type="checkbox"
              checked={groupTypes.includes(g)}
              onChange={() => { toggleItem(groupTypes, setGroupTypes, g); setVisibleCount(PAGE_SIZE); }}
              className="w-3.5 h-3.5 accent-brand-orange cursor-pointer"
            />
            <span className="font-sans text-sm text-brand-grey group-hover/cb:text-brand-dark transition-colors">
              {g}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Domestic / International */}
      <FilterSection title="Region" defaultOpen={false}>
        <div className="flex gap-2 flex-wrap">
          {(["all", "domestic", "international"] as DomesticFilter[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => { setDomestic(v); setVisibleCount(PAGE_SIZE); }}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold font-sans border transition-all duration-150",
                domestic === v
                  ? "bg-brand-orange text-white border-brand-orange"
                  : "bg-white text-brand-grey border-gray-200 hover:border-brand-orange hover:text-brand-orange"
              )}
            >
              {v === "all" ? "All" : v === "domestic" ? "India Only" : "International"}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Sort */}
      <FilterSection title="Sort By" defaultOpen={false}>
        {SORT_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer group/rb">
            <input
              type="radio"
              name="sort"
              value={opt.value}
              checked={sortBy === opt.value}
              onChange={() => setSortBy(opt.value)}
              className="w-3.5 h-3.5 accent-brand-orange cursor-pointer"
            />
            <span className="font-sans text-sm text-brand-grey group-hover/rb:text-brand-dark transition-colors">
              {opt.label}
            </span>
          </label>
        ))}
      </FilterSection>
    </aside>
  );

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-brand-dark via-stone-900 to-brand-charcoal py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_#FF8C42_0%,_transparent_60%)]" />
        <div className="section-container relative text-center">
          <p className="section-eyebrow text-brand-soft mb-3">OUR COLLECTION</p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Explore Our Tours
          </h1>
          <p className="font-lora text-lg text-white/60 max-w-xl mx-auto">
            Handcrafted journeys for the curious traveller
          </p>
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            className="inline-flex items-center gap-2 border border-brand-orange text-brand-orange font-sans font-semibold text-sm rounded-full px-5 py-2.5 hover:bg-brand-orange hover:text-white transition-all duration-200"
          >
            <SlidersHorizontal size={15} />
            Filter &amp; Sort
            {activeChips.length > 0 && (
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-brand-orange text-white text-[10px] font-bold">
                {activeChips.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile filter drawer */}
        {mobileOpen && (
          <div className="lg:hidden mb-6 bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-playfair font-bold text-brand-dark text-lg">Filters</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="text-brand-grey hover:text-brand-dark"
              >
                <X size={18} />
              </button>
            </div>
            {filterPanel}
          </div>
        )}

        {/* Desktop two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

          {/* Sidebar — desktop only */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 sticky top-24">
              {filterPanel}
            </div>
          </div>

          {/* Right: results */}
          <div>
            {/* Sort bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-sans text-sm font-semibold text-brand-dark">
                {filtered.length} Tour{filtered.length !== 1 ? "s" : ""} Found
              </span>

              {/* Active filter chips */}
              {activeChips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={chip.onRemove}
                  className="inline-flex items-center gap-1.5 bg-brand-orange/10 text-brand-orange font-sans font-semibold text-xs rounded-full px-3 py-1 hover:bg-brand-orange/20 transition-colors"
                >
                  {chip.label}
                  <X size={11} />
                </button>
              ))}

              {activeChips.length > 1 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="font-sans text-xs text-brand-grey hover:text-brand-dark underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Grid */}
            {visible.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-playfair text-2xl font-bold text-brand-dark mb-2">No tours found</p>
                <p className="font-lora text-brand-grey mb-6">Try adjusting your filters to discover more journeys.</p>
                <Button variant="outline" onClick={clearAll}>Clear All Filters</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visible.map((tour) => (
                    <TourListCard key={tour.id} tour={tour} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-10 text-center space-y-3">
                  <p className="font-sans text-sm text-brand-grey">
                    Showing {visible.length} of {filtered.length} tour{filtered.length !== 1 ? "s" : ""}
                  </p>
                  {visibleCount < filtered.length && (
                    <Button
                      variant="outline"
                      onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    >
                      Load More Tours
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
