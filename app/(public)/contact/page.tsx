/**
 * Contact Page — See the Unseen
 */

import type { Metadata } from "next";
import { ContactClient } from "@/components/contact/ContactClient";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | See the Unseen",
  description:
    "Get in touch with our travel experts. We're here to help you plan your perfect luxury journey.",
};

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
    sub: "Mon–Sat, 9am–7pm IST",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@stunstravel.in",
    sub: "We reply within 24 hours",
    href: "mailto:info@stunstravel.in",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "12, Luxury Lane, Koramangala",
    sub: "Bengaluru, Karnataka 560034",
    href: "#map",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon–Sat: 9am – 7pm",
    sub: "Sunday: 10am – 2pm",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-brand-dark via-stone-900 to-brand-charcoal py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_#FF8C42_0%,_transparent_60%)]" />
        <div className="section-container relative text-center">
          <p className="section-eyebrow text-brand-soft mb-3">GET IN TOUCH</p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Let&apos;s Plan Your<br className="hidden md:block" /> Dream Journey
          </h1>
          <p className="font-lora text-lg text-white/60 max-w-xl mx-auto">
            Our travel experts are ready to craft a bespoke itinerary just for you.
            Reach out — the adventure starts with a conversation.
          </p>
        </div>
      </section>

      {/* ── Contact cards row ─────────────────────────────────── */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {CONTACT_INFO.map(({ icon: Icon, label, value, sub, href }) => {
              const inner = (
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 p-5 rounded-2xl border border-gray-100 hover:border-brand-orange/30 hover:shadow-card transition-all duration-200 h-full">
                  <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-bold uppercase tracking-wider text-brand-grey mb-1">
                      {label}
                    </p>
                    <p className="font-sans text-sm font-semibold text-brand-dark leading-snug">
                      {value}
                    </p>
                    <p className="font-sans text-xs text-brand-grey mt-0.5">{sub}</p>
                  </div>
                </div>
              );
              return href ? (
                <a key={label} href={href} className="block">
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Form + Map section ────────────────────────────────── */}
      <section className="bg-brand-light py-20 md:py-28">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: contact form */}
            <div>
              <p className="section-eyebrow mb-2">SEND A MESSAGE</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-dark mb-3">
                Tell Us About Your Trip
              </h2>
              <p className="font-lora text-brand-grey leading-relaxed mb-8">
                Fill in the details below and one of our travel consultants will
                get back to you within one business day.
              </p>
              <ContactClient />
            </div>

            {/* Right: map placeholder + FAQ */}
            <div className="space-y-8">
              {/* Map placeholder */}
              <div
                id="map"
                className="relative rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center"
              >
                <div className="text-center">
                  <MapPin size={36} className="text-slate-600 mx-auto mb-2" />
                  <p className="font-sans text-sm text-slate-600 font-medium">
                    12, Luxury Lane, Koramangala
                  </p>
                  <p className="font-sans text-xs text-slate-500">
                    Bengaluru, Karnataka 560034
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block font-sans text-xs font-semibold text-brand-orange hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="font-playfair text-xl font-bold text-brand-dark mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      q: "How quickly will I hear back?",
                      a: "We aim to respond to all enquiries within 24 hours on business days. For urgent travel, call us directly.",
                    },
                    {
                      q: "Can I customise an existing tour?",
                      a: "Absolutely. All our tours can be tailored to your preferences — dates, accommodation, activities and more.",
                    },
                    {
                      q: "Do you handle visa assistance?",
                      a: "Yes, we offer visa guidance and documentation support as an add-on service for international destinations.",
                    },
                    {
                      q: "What's the booking deposit?",
                      a: "We typically require a 25% deposit to secure your booking, with the balance due 45 days before departure.",
                    },
                  ].map(({ q, a }) => (
                    <div
                      key={q}
                      className="p-4 bg-white rounded-xl border border-gray-100"
                    >
                      <p className="font-sans text-sm font-semibold text-brand-dark mb-1">
                        {q}
                      </p>
                      <p className="font-lora text-sm text-brand-grey leading-relaxed">
                        {a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA strip ────────────────────────────────── */}
      <section className="bg-emerald-600 py-10">
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-playfair text-xl font-bold text-white">
              Prefer to chat on WhatsApp?
            </p>
            <p className="font-lora text-emerald-100 text-sm mt-1">
              Message us directly for quick answers and instant support.
            </p>
          </div>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 font-sans font-semibold text-sm rounded-full px-6 py-3 hover:shadow-lg transition-shadow duration-200 shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
