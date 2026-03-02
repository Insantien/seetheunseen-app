import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Linkedin, MessageCircle } from "lucide-react";

const EXPERIENCE_TYPES = [
  { title: "Scenic Escapes", slug: "scenic-escapes" },
  { title: "Blue Escapes", slug: "blue-escapes" },
  { title: "Earth's Marvels", slug: "earths-marvels" },
  { title: "Family Thrills", slug: "family-thrills" },
  { title: "Legendary Journeys", slug: "legendary-journeys" },
  { title: "Signature Stays", slug: "signature-stays" },
  { title: "Outdoor Thrills", slug: "outdoor-thrills" },
  { title: "Festive Getaways", slug: "festive-getaways" },
  { title: "Wellness Reset", slug: "wellness-reset" },
];

const DESTINATIONS = [
  { title: "Rajasthan", slug: "rajasthan" },
  { title: "Kerala", slug: "kerala" },
  { title: "Ladakh", slug: "ladakh" },
  { title: "Japan", slug: "japan" },
  { title: "Bhutan", slug: "bhutan" },
  { title: "Italy", slug: "italy" },
  { title: "Tanzania", slug: "tanzania" },
  { title: "Morocco", slug: "morocco" },
];

const COMPANY_LINKS = [
  { title: "About Us", href: "/about" },
  { title: "Our Story", href: "/about#story" },
  { title: "The Team", href: "/about#team" },
  { title: "Careers", href: "/careers" },
  { title: "Blog", href: "/blog" },
  { title: "Press", href: "/press" },
  { title: "Contact Us", href: "/contact" },
];

const TRAVELLER_LINKS = [
  { title: "Find Your Journey", href: "/quiz" },
  { title: "All Tours", href: "/tours" },
  { title: "Private Journeys", href: "/private-journeys" },
  { title: "Group Travel", href: "/group-travel" },
  { title: "Book a Consultation", href: "/contact" },
  { title: "My Account", href: "/account" },
  { title: "My Wishlist", href: "/account/wishlist" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      {/* ─── Main Footer ─── */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* ─── Brand Column ─── */}
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-4">
              <span className="font-playfair font-bold text-2xl tracking-wide text-white">See the Unseen</span>
              <br />
              <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-brand-orange">Travels</span>
            </Link>
            <p className="text-sm font-lora text-white/70 leading-relaxed max-w-xs mb-6">
              Curated luxury travel experiences across India, Asia & beyond.
              Expert-designed tours that go beyond the ordinary — because you deserve to see more.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mb-8">
              <SocialLink href="https://instagram.com" icon={<Instagram size={16} />} label="Instagram" />
              <SocialLink href="https://facebook.com" icon={<Facebook size={16} />} label="Facebook" />
              <SocialLink href="https://youtube.com" icon={<Youtube size={16} />} label="YouTube" />
              <SocialLink href="https://linkedin.com" icon={<Linkedin size={16} />} label="LinkedIn" />
              <SocialLink href="https://wa.me/919876543210" icon={<MessageCircle size={16} />} label="WhatsApp" />
            </div>

            {/* Contact */}
            <ul className="space-y-2.5">
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-2.5 text-sm font-sans text-white/70 hover:text-brand-orange transition-colors">
                  <Phone size={14} className="text-brand-orange shrink-0" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:info@stunstravel.in" className="flex items-center gap-2.5 text-sm font-sans text-white/70 hover:text-brand-orange transition-colors">
                  <Mail size={14} className="text-brand-orange shrink-0" />
                  info@stunstravel.in
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm font-sans text-white/70">
                  <MapPin size={14} className="text-brand-orange shrink-0 mt-0.5" />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
              </li>
            </ul>
          </div>

          {/* ─── Experience Types ─── */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-brand-orange mb-4">
              Experiences
            </h4>
            <ul className="space-y-2">
              {EXPERIENCE_TYPES.map((exp) => (
                <li key={exp.slug}>
                  <Link
                    href={`/experiences/${exp.slug}`}
                    className="text-sm font-sans text-white/70 hover:text-white transition-colors"
                  >
                    {exp.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Destinations ─── */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-brand-orange mb-4">
              Destinations
            </h4>
            <ul className="space-y-2">
              {DESTINATIONS.map((dest) => (
                <li key={dest.slug}>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="text-sm font-sans text-white/70 hover:text-white transition-colors"
                  >
                    {dest.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/destinations" className="text-sm font-sans text-brand-orange hover:underline">
                  All destinations →
                </Link>
              </li>
            </ul>
          </div>

          {/* ─── Company + Traveller ─── */}
          <div className="space-y-8">
            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-brand-orange mb-4">
                Company
              </h4>
              <ul className="space-y-2">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm font-sans text-white/70 hover:text-white transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-brand-orange mb-4">
                For Travellers
              </h4>
              <ul className="space-y-2">
                {TRAVELLER_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm font-sans text-white/70 hover:text-white transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Awards / Certifications Strip ─── */}
      <div className="border-t border-white/10">
        <div className="section-container py-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              "IATA Certified",
              "ATOL Protected",
              "ASTA Member",
              "Trusted Partner — Taj Hotels",
              "Preferred Partner — RAAS Hotels",
              "ISO 27001:2022",
            ].map((cert) => (
              <span
                key={cert}
                className="text-[11px] font-sans font-semibold uppercase tracking-widest text-white/40 px-3 py-1 border border-white/10 rounded-full"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="border-t border-white/10">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-sans text-white/40">
            © {new Date().getFullYear()} See the Unseen Travels. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-sans text-white/40 hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-brand-orange hover:text-white transition-all"
    >
      {icon}
    </a>
  );
}
