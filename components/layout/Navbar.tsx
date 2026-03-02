"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone, User, Heart } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const EXPERIENCE_TYPES = [
  { title: "Scenic Escapes", slug: "scenic-escapes", number: "01", tagline: "Iconic journeys, effortless pace" },
  { title: "Blue Escapes", slug: "blue-escapes", number: "02", tagline: "Ocean, rivers, lakes — water as the journey" },
  { title: "Earth's Marvels", slug: "earths-marvels", number: "03", tagline: "Wilderness, wildlife, and wonder" },
  { title: "Family Thrills", slug: "family-thrills", number: "04", tagline: "Memories that the whole family makes together" },
  { title: "Legendary Journeys", slug: "legendary-journeys", number: "05", tagline: "Routes that defined civilisations" },
  { title: "Signature Stays", slug: "signature-stays", number: "06", tagline: "The destination is the accommodation" },
  { title: "Outdoor Thrills", slug: "outdoor-thrills", number: "07", tagline: "Push your limits, find your edge" },
  { title: "Festive Getaways", slug: "festive-getaways", number: "08", tagline: "The world's great celebrations, yours to join" },
  { title: "Wellness Reset", slug: "wellness-reset", number: "09", tagline: "Restore body, mind, and spirit" },
];

const DESTINATIONS = [
  { region: "India", items: ["Rajasthan", "Kerala", "Himachal Pradesh", "Uttarakhand", "Ladakh"] },
  { region: "Asia", items: ["Japan", "Bhutan", "Sri Lanka", "Vietnam", "Thailand"] },
  { region: "Europe", items: ["Italy", "France", "Switzerland", "Greece", "Portugal"] },
  { region: "Beyond", items: ["Morocco", "Tanzania", "Peru", "New Zealand", "Oman"] },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navBase = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    isScrolled || mobileOpen
      ? "bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)] py-3"
      : "bg-transparent py-5"
  );

  const textColor = isScrolled || mobileOpen ? "text-brand-dark" : "text-white";
  const logoColor = isScrolled || mobileOpen ? "text-brand-dark" : "text-white";

  return (
    <nav className={navBase} ref={dropdownRef}>
      <div className="section-container flex items-center justify-between">
        {/* ─── Logo ─── */}
        <Link href="/" className="flex flex-col shrink-0" onClick={() => setMobileOpen(false)}>
          <span className={cn("font-playfair font-bold text-xl leading-none tracking-wide transition-colors", logoColor)}>
            See the Unseen
          </span>
          <span className={cn("text-[10px] font-sans font-semibold tracking-[0.2em] uppercase transition-colors mt-0.5", isScrolled || mobileOpen ? "text-brand-orange" : "text-white/80")}>
            Travels
          </span>
        </Link>

        {/* ─── Desktop Nav ─── */}
        <ul className="hidden lg:flex items-center gap-1">
          {/* Destinations */}
          <li className="relative group">
            <button
              className={cn("flex items-center gap-1 px-3 py-2 text-sm font-sans font-semibold transition-colors hover:text-brand-orange", textColor)}
              onMouseEnter={() => setActiveDropdown("destinations")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              Destinations <ChevronDown size={14} strokeWidth={2.5} className={cn("transition-transform", activeDropdown === "destinations" && "rotate-180")} />
            </button>
            {/* Destinations Megamenu */}
            <div
              onMouseEnter={() => setActiveDropdown("destinations")}
              onMouseLeave={() => setActiveDropdown(null)}
              className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6 mt-1",
                "transition-all duration-200 origin-top",
                activeDropdown === "destinations" ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
              )}
            >
              <div className="grid grid-cols-4 gap-4">
                {DESTINATIONS.map((group) => (
                  <div key={group.region}>
                    <p className="section-eyebrow mb-3">{group.region}</p>
                    <ul className="space-y-1.5">
                      {group.items.map((dest) => (
                        <li key={dest}>
                          <Link
                            href={`/destinations/${dest.toLowerCase().replace(/ /g, "-")}`}
                            className="block text-sm font-sans text-brand-dark hover:text-brand-orange transition-colors py-0.5"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {dest}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/destinations" className="text-sm font-semibold font-sans text-brand-orange hover:underline" onClick={() => setActiveDropdown(null)}>
                  View all destinations →
                </Link>
              </div>
            </div>
          </li>

          {/* Experience Types */}
          <li className="relative group">
            <button
              className={cn("flex items-center gap-1 px-3 py-2 text-sm font-sans font-semibold transition-colors hover:text-brand-orange", textColor)}
              onMouseEnter={() => setActiveDropdown("experiences")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              Experiences <ChevronDown size={14} strokeWidth={2.5} className={cn("transition-transform", activeDropdown === "experiences" && "rotate-180")} />
            </button>
            {/* Experiences Megamenu */}
            <div
              onMouseEnter={() => setActiveDropdown("experiences")}
              onMouseLeave={() => setActiveDropdown(null)}
              className={cn(
                "absolute top-full left-1/2 -translate-x-1/2 w-[740px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6 mt-1",
                "transition-all duration-200 origin-top",
                activeDropdown === "experiences" ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
              )}
            >
              <div className="grid grid-cols-3 gap-3">
                {EXPERIENCE_TYPES.map((exp) => (
                  <Link
                    key={exp.slug}
                    href={`/experiences/${exp.slug}`}
                    className="flex gap-3 p-3 rounded-xl hover:bg-brand-light transition-colors group/item"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <span className="text-brand-orange font-playfair font-bold text-sm leading-none mt-0.5 shrink-0">
                      {exp.number}
                    </span>
                    <div>
                      <p className="text-sm font-semibold font-sans text-brand-dark group-hover/item:text-brand-orange transition-colors">
                        {exp.title}
                      </p>
                      <p className="text-xs font-lora text-brand-grey mt-0.5 leading-snug">
                        {exp.tagline}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {/* Tours */}
          <li>
            <Link href="/tours" className={cn("px-3 py-2 text-sm font-sans font-semibold transition-colors hover:text-brand-orange", textColor)}>
              Tours
            </Link>
          </li>

          {/* Blog */}
          <li>
            <Link href="/blog" className={cn("px-3 py-2 text-sm font-sans font-semibold transition-colors hover:text-brand-orange", textColor)}>
              Blog
            </Link>
          </li>

          {/* About */}
          <li>
            <Link href="/about" className={cn("px-3 py-2 text-sm font-sans font-semibold transition-colors hover:text-brand-orange", textColor)}>
              About
            </Link>
          </li>
        </ul>

        {/* ─── Desktop Right Actions ─── */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Phone */}
          <a
            href="tel:+919876543210"
            className={cn("flex items-center gap-1.5 text-xs font-sans font-semibold transition-colors hover:text-brand-orange", textColor)}
          >
            <Phone size={13} strokeWidth={2.5} />
            <span>+91 98765 43210</span>
          </a>

          {/* Wishlist */}
          <Link
            href="/account/wishlist"
            aria-label="My Wishlist"
            className={cn("p-2 rounded-full transition-colors hover:bg-white/20", textColor)}
          >
            <Heart size={18} strokeWidth={2} />
          </Link>

          {/* Account */}
          <Link
            href="/account"
            aria-label="My Account"
            className={cn("p-2 rounded-full transition-colors hover:bg-white/20", textColor)}
          >
            <User size={18} strokeWidth={2} />
          </Link>

          {/* CTA */}
          <Link
            href="/contact"
            className={cn(
              "ml-2 px-5 py-2.5 rounded-full text-sm font-semibold font-sans transition-all",
              isScrolled
                ? "bg-gradient-to-br from-brand-orange to-brand-coral text-white hover:shadow-brand hover:-translate-y-px"
                : "bg-white text-brand-dark hover:bg-brand-orange hover:text-white"
            )}
          >
            Book a Consultation
          </Link>
        </div>

        {/* ─── Mobile Hamburger ─── */}
        <button
          className={cn("lg:hidden p-2 rounded-lg transition-colors", textColor)}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ─── Mobile Menu ─── */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-white",
          mobileOpen ? "max-h-screen border-t border-gray-100" : "max-h-0"
        )}
      >
        <div className="section-container py-4 space-y-1">
          <MobileNavLink href="/destinations" onClick={() => setMobileOpen(false)}>Destinations</MobileNavLink>
          <MobileNavAccordion label="Experiences">
            {EXPERIENCE_TYPES.map((exp) => (
              <Link
                key={exp.slug}
                href={`/experiences/${exp.slug}`}
                className="flex items-center gap-2 py-2 pl-4 text-sm font-sans text-brand-grey hover:text-brand-orange transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-brand-orange text-xs font-bold">{exp.number}</span>
                {exp.title}
              </Link>
            ))}
          </MobileNavAccordion>
          <MobileNavLink href="/tours" onClick={() => setMobileOpen(false)}>Tours</MobileNavLink>
          <MobileNavLink href="/blog" onClick={() => setMobileOpen(false)}>Blog</MobileNavLink>
          <MobileNavLink href="/about" onClick={() => setMobileOpen(false)}>About</MobileNavLink>
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href="/account"
              className="flex items-center gap-2 py-2 text-sm font-semibold font-sans text-brand-dark hover:text-brand-orange"
              onClick={() => setMobileOpen(false)}
            >
              <User size={16} /> My Account
            </Link>
            <Link
              href="/contact"
              className="btn-brand text-center justify-center mt-1"
              onClick={() => setMobileOpen(false)}
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-2.5 text-base font-semibold font-sans text-brand-dark hover:text-brand-orange transition-colors border-b border-gray-50"
    >
      {children}
    </Link>
  );
}

function MobileNavAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2.5 text-base font-semibold font-sans text-brand-dark hover:text-brand-orange transition-colors"
      >
        {label}
        <ChevronDown size={16} className={cn("transition-transform text-brand-grey", open && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden transition-all duration-200", open ? "max-h-[500px] pb-2" : "max-h-0")}>
        {children}
      </div>
    </div>
  );
}
