import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About Us | See the Unseen",
  description:
    "Founded in 2018, See the Unseen is India's most trusted luxury travel brand. Learn our story, values, and the team behind every unforgettable journey.",
};

const TEAM = [
  {
    initials: "AK",
    name: "Arjun Kapoor",
    role: "Founder & CEO",
    gradient: "from-brand-orange to-brand-coral",
    bio: "Arjun founded See the Unseen after a decade of independent travel across 60 countries, driven by the belief that authentic journeys change people.",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    role: "Head of Experiences",
    gradient: "from-pink-600 to-rose-800",
    bio: "Priya leads our experience design team, crafting itineraries that go beyond the surface to reveal the true soul of every destination.",
  },
  {
    initials: "RM",
    name: "Rahul Mehta",
    role: "Lead Travel Curator",
    gradient: "from-green-600 to-emerald-800",
    bio: "Rahul's encyclopaedic knowledge of South and Southeast Asia has made him the architect behind some of our most celebrated tour collections.",
  },
  {
    initials: "AI",
    name: "Ananya Iyer",
    role: "Customer Experience Head",
    gradient: "from-indigo-600 to-blue-800",
    bio: "Ananya ensures that every touchpoint — from first enquiry to welcome home — reflects the care and warmth that defines See the Unseen.",
  },
];

const VALUES = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Our Mission",
    description:
      "To craft deeply personal, luxurious travel experiences that connect people to the world's most extraordinary places — seen and unseen.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Our Vision",
    description:
      "A world where every journey is transformative — where travel becomes a lens through which we see ourselves, and the world, more clearly.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "Our Values",
    description:
      "Authenticity, integrity, and excellence guide every decision — from the partners we choose to the stories we help our travellers create.",
  },
];

const STATS = [
  { value: "6+", label: "Years of Excellence" },
  { value: "5,000+", label: "Travellers Served" },
  { value: "150+", label: "Curated Tours" },
  { value: "4.9/5", label: "Average Rating" },
];

const CERTS = [
  { label: "IATA Accredited", description: "International Air Transport Association" },
  { label: "ATOL Protected", description: "Air Travel Organisers' Licensing" },
  { label: "ASTA Member", description: "American Society of Travel Advisors" },
  { label: "ISO 9001:2015", description: "Quality Management Certified" },
];

const TESTIMONIALS = [
  {
    quote:
      "See the Unseen didn't just plan a trip — they created a memory that our family will cherish for the rest of our lives. The attention to detail, the personalisation, the sheer care they brought to every moment was extraordinary.",
    author: "Deepa & Suresh Nair",
    detail: "Kerala & Rajasthan, 14 days",
    gradient: "from-amber-700 to-orange-900",
  },
  {
    quote:
      "I've travelled with a dozen operators over the years, but nothing comes close to what See the Unseen offers. Their insider access, expert guides, and seamless logistics let me be fully present — just experiencing, not managing.",
    author: "Karan Malhotra",
    detail: "Japan Cherry Blossom, 12 days",
    gradient: "from-pink-600 to-rose-900",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-dark to-brand-charcoal text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">
            Our Story
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            About See the Unseen
          </h1>
          <p className="text-white/70 font-lora text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Revealing the world's extraordinary soul — one journey at a time.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-gradient-to-r from-brand-orange to-brand-coral text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="font-playfair text-3xl md:text-4xl font-bold">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-eyebrow mb-3">Who We Are</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-dark leading-tight mb-6">
              Born From a Passion for{" "}
              <span className="text-brand-orange">Authentic Travel</span>
            </h2>
            <div className="space-y-4 font-lora text-brand-charcoal leading-relaxed">
              <p>
                Founded in 2018 by a group of passionate travellers, See the
                Unseen was born from a simple belief: that truly great travel
                should reveal the world as it truly is — not just its surfaces,
                but its soul.
              </p>
              <p>
                We were tired of cookie-cutter itineraries that herded tourists
                from landmark to landmark without ever pausing to truly
                experience a place. We wanted something different — journeys
                that felt personal, meaningful, and transformative.
              </p>
              <p>
                Today, we're proud to be one of India's most trusted luxury
                travel brands, having taken over 5,000 travellers on experiences
                they'll never forget. But we're still driven by the same simple
                belief that started it all: the world is more extraordinary than
                most people ever get to see.
              </p>
              <p>
                Our job is to change that.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button as="a" href="/tours" variant="brand" size="md">
                Explore Our Tours
              </Button>
              <Button as="a" href="/contact" variant="outline" size="md">
                Talk to Us
              </Button>
            </div>
          </div>
          {/* Image placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-amber-700 to-orange-900 rounded-2xl aspect-[4/3] flex items-end p-8">
              <div>
                <p className="text-white/50 font-playfair text-xl font-bold">
                  See the Unseen
                </p>
                <p className="text-white/30 text-sm">Est. 2018, India</p>
              </div>
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-brand-orange to-brand-coral rounded-2xl flex items-center justify-center">
              <div className="text-white text-center">
                <div className="font-playfair text-2xl font-bold">6+</div>
                <div className="text-xs text-white/80">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="bg-brand-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What Drives Us"
            title="Mission, Vision & Values"
            subtitle="Three pillars that guide every experience we craft and every journey we curate."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-5">
                  {value.icon}
                </div>
                <h3 className="font-playfair text-xl font-bold text-brand-dark mb-3">
                  {value.title}
                </h3>
                <p className="text-brand-grey font-lora leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader
          eyebrow="The People Behind the Journeys"
          title="Meet Our Team"
          subtitle="Passionate travellers, expert curators, and dedicated advisors — all committed to making your journey extraordinary."
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow group"
            >
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-105 transition-transform`}
              >
                {member.initials}
              </div>
              <h3 className="font-playfair text-lg font-bold text-brand-dark">
                {member.name}
              </h3>
              <p className="text-brand-orange text-sm font-semibold mb-3">
                {member.role}
              </p>
              <p className="text-brand-grey text-sm font-lora leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-brand-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What Our Travellers Say"
            title="Stories That Inspire Us"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div
                  className={`bg-gradient-to-br ${t.gradient} h-4`}
                />
                <div className="p-8">
                  <svg
                    className="w-8 h-8 text-brand-orange mb-4 opacity-60"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="font-lora text-brand-charcoal leading-relaxed mb-6 italic">
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                    >
                      {t.author[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-dark text-sm">
                        {t.author}
                      </p>
                      <p className="text-brand-grey text-xs">{t.detail}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="section-eyebrow mb-2">Trust & Accreditation</p>
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-brand-dark">
            Certified &amp; Accredited
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CERTS.map((cert) => (
            <div
              key={cert.label}
              className="bg-brand-light border border-gray-200 rounded-2xl p-6 text-center hover:border-brand-orange/30 hover:bg-brand-orange/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange font-bold text-sm mx-auto mb-3">
                {cert.label.slice(0, 4)}
              </div>
              <p className="font-bold text-brand-dark text-sm">{cert.label}</p>
              <p className="text-brand-grey text-xs mt-1 leading-tight">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-brand-dark to-brand-charcoal text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Ready to See the Unseen?
          </h2>
          <p className="text-white/70 font-lora text-lg mb-8 leading-relaxed">
            Let us take you somewhere extraordinary. Browse our curated tours or
            reach out to speak with one of our travel experts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button as="a" href="/tours" variant="brand" size="lg">
              Browse Tours
            </Button>
            <Button as="a" href="/contact" variant="white" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
