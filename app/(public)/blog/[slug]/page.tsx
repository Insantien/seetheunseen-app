import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Top 10 Unmissable Destinations in India for 2026 | Travel Journal | See the Unseen",
  description:
    "From the golden deserts of Rajasthan to the misty hills of Coorg, discover India's most breathtaking corners.",
};

const RELATED_POSTS = [
  {
    slug: "cherry-blossom-japan-guide",
    title: "The Ultimate Guide to Japan's Cherry Blossom Season",
    gradient: "from-pink-600 to-rose-900",
    date: "Feb 10, 2026",
    readTime: "12 min read",
  },
  {
    slug: "wellness-travel-trends-2026",
    title: "Wellness Travel in 2026: The Rise of Transformative Journeys",
    gradient: "from-teal-600 to-cyan-900",
    date: "Feb 5, 2026",
    readTime: "6 min read",
  },
  {
    slug: "kerala-monsoon-travel",
    title: "Why Monsoon is the Best Time to Visit Kerala",
    gradient: "from-green-700 to-emerald-900",
    date: "Jan 3, 2026",
    readTime: "6 min read",
  },
];

const RELATED_TOURS = [
  {
    title: "Enchanting Rajasthan Circuit",
    dest: "Rajasthan, India",
    days: 10,
    price: 85000,
    gradient: "from-amber-700 to-orange-900",
  },
  {
    title: "Kerala Backwater & Spice Trail",
    dest: "Kerala, India",
    days: 7,
    price: 65000,
    gradient: "from-green-700 to-emerald-900",
  },
];

const TAGS = ["India Travel", "Destinations 2026", "Rajasthan", "Luxury Travel"];

export default function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-800 to-orange-950 text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Badge label="Destination" variant="orange" />
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Top 10 Unmissable Destinations in India for 2026
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
                P
              </span>
              <span className="font-semibold text-white">Priya Sharma</span>
            </div>
            <span>&bull;</span>
            <span>Feb 15, 2026</span>
            <span>&bull;</span>
            <span>8 min read</span>
          </div>
        </div>
      </div>

      {/* Article + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article body */}
          <article className="lg:col-span-2">
            {/* Hero image placeholder */}
            <div className="bg-gradient-to-br from-amber-700 to-orange-900 rounded-2xl aspect-video mb-8 flex items-end p-6">
              <span className="text-white/30 font-playfair text-2xl font-bold">
                Top 10 Destinations in India for 2026
              </span>
            </div>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-brand-grey mb-8">
              <Link href="/blog" className="hover:text-brand-orange transition-colors">
                Blog
              </Link>
              <span>/</span>
              <Link
                href="/blog?category=destination"
                className="hover:text-brand-orange transition-colors"
              >
                Destination
              </Link>
              <span>/</span>
              <span className="text-brand-dark font-semibold line-clamp-1">
                Top 10 Unmissable Destinations...
              </span>
            </nav>

            {/* Rich text content */}
            <div className="prose prose-lg max-w-none font-lora text-brand-charcoal leading-relaxed">
              <p className="text-lg mb-6">
                India is a land of extraordinary contrast and beauty. From the
                crystalline waters of the Andaman Islands to the snow-capped
                peaks of Ladakh, from the ancient temples of Tamil Nadu to the
                grand palaces of Rajasthan — every corner of this vast
                subcontinent offers an experience unlike anything else on Earth.
                As we step into 2026, here are the ten destinations that every
                discerning traveller should have on their list.
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-dark mt-8 mb-4">
                1. Rajasthan: The Kingdom of Kings
              </h2>
              <p className="mb-6">
                Rajasthan remains the crown jewel of Indian tourism — and for
                good reason. The state's majestic forts, ornate palaces, and
                vibrant bazaars tell the story of a civilisation that thrived for
                centuries. The Pink City of Jaipur, the Blue City of Jodhpur, the
                City of Lakes in Udaipur, and the golden sands of Jaisalmer each
                offer a unique window into Rajputana heritage.
              </p>

              {/* Tip box */}
              <div className="border-l-4 border-brand-orange bg-brand-orange/5 rounded-r-xl p-5 mb-6">
                <p className="font-semibold text-brand-dark mb-1">
                  Expert Tip
                </p>
                <p className="text-brand-charcoal text-sm">
                  Visit between October and March for the best weather.
                  The Pushkar Camel Fair (November) and Jaipur Literature
                  Festival (January) are unmissable annual events worth
                  planning your trip around.
                </p>
              </div>

              <h2 className="font-playfair text-2xl font-bold text-brand-dark mt-8 mb-4">
                2. Kerala: God's Own Country
              </h2>
              <p className="mb-6">
                The backwaters of Alleppey, the tea estates of Munnar, the
                pristine beaches of Varkala — Kerala is a sensory feast that
                stays with you long after you've left. 2026 is shaping up to be
                a landmark year for sustainable luxury tourism here, with several
                new eco-resorts opening that blend seamlessly with the lush
                Western Ghats landscape.
              </p>

              {/* Pull quote */}
              <blockquote className="border-l-2 border-brand-coral pl-6 py-2 my-8">
                <p className="font-playfair text-xl italic text-brand-dark">
                  "Travel is the only thing you buy that makes you richer — and
                  India has more riches per square kilometre than almost anywhere
                  else on the planet."
                </p>
                <footer className="text-sm text-brand-grey mt-2">
                  — Priya Sharma, See the Unseen
                </footer>
              </blockquote>

              <h2 className="font-playfair text-2xl font-bold text-brand-dark mt-8 mb-4">
                3. Ladakh: The Land of High Passes
              </h2>
              <p className="mb-6">
                Few places on Earth match the raw, spiritual beauty of Ladakh.
                At over 3,500 metres above sea level, the landscape is lunar and
                vast, dotted with ancient gompas (monasteries), prayer flags, and
                turquoise glacial lakes. The Pangong Lake at sunrise, framed by
                mountains of orange, rust, and snow, is one of the most
                transcendent sights you will ever witness. New direct flights from
                Delhi and Mumbai in 2026 are making Ladakh more accessible than
                ever without diminishing its remoteness.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-200">
              <span className="text-sm font-semibold text-brand-grey mr-2">
                Tags:
              </span>
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-gray-100 text-brand-charcoal text-sm font-medium hover:bg-brand-orange/10 hover:text-brand-orange transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Author card */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-orange to-brand-coral flex items-center justify-center text-white text-2xl font-bold shrink-0">
                  P
                </div>
                <div>
                  <p className="font-playfair text-lg font-bold text-brand-dark">
                    Priya Sharma
                  </p>
                  <p className="text-brand-grey text-sm mb-2">
                    Senior Travel Writer & Destination Specialist
                  </p>
                  <p className="text-brand-charcoal text-sm leading-relaxed">
                    Priya has spent over a decade exploring India's most
                    extraordinary destinations, curating itineraries that go
                    beyond the guidebook to uncover the soul of each place she
                    visits.
                  </p>
                  <Link
                    href="/blog?author=priya-sharma"
                    className="text-brand-orange text-sm font-semibold mt-2 inline-block hover:underline"
                  >
                    All posts by Priya →
                  </Link>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm font-semibold text-brand-dark mb-4">
                Share this article
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] text-sm font-semibold hover:bg-[#1DA1F2]/20 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Share on X
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1877F2]/10 text-[#1877F2] text-sm font-semibold hover:bg-[#1877F2]/20 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 text-[#25D366] text-sm font-semibold hover:bg-[#25D366]/20 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-brand-charcoal text-sm font-semibold hover:bg-gray-200 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Link
                </button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Plan your trip card */}
              <div className="bg-gradient-to-br from-brand-orange to-brand-coral rounded-2xl p-6 text-white">
                <p className="font-playfair text-lg font-bold mb-2">
                  Plan Your Trip
                </p>
                <p className="text-white/80 text-sm mb-4">
                  Inspired by this article? Let us find your perfect India tour.
                </p>
                <Button
                  as="a"
                  href="/quiz"
                  variant="white"
                  size="sm"
                  fullWidth
                >
                  Find Your Perfect Tour
                </Button>
              </div>

              {/* Related tours */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="font-playfair text-lg font-bold text-brand-dark mb-4">
                  Featured Tours
                </p>
                <div className="space-y-4">
                  {RELATED_TOURS.map((tour) => (
                    <Link
                      key={tour.title}
                      href="/tours"
                      className="group flex gap-3 items-start"
                    >
                      <div
                        className={`bg-gradient-to-br ${tour.gradient} w-16 h-16 rounded-xl shrink-0`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-brand-dark text-sm leading-snug group-hover:text-brand-orange transition-colors line-clamp-2">
                          {tour.title}
                        </p>
                        <p className="text-brand-grey text-xs mt-1">
                          {tour.days} days &bull; {formatINR(tour.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related articles */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="font-playfair text-lg font-bold text-brand-dark mb-4">
                  Related Articles
                </p>
                <div className="space-y-4">
                  {RELATED_POSTS.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex gap-3 items-start"
                    >
                      <div
                        className={`bg-gradient-to-br ${post.gradient} w-14 h-14 rounded-xl shrink-0`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-brand-dark text-sm leading-snug group-hover:text-brand-orange transition-colors line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-brand-grey text-xs mt-1">
                          {post.date} &bull; {post.readTime}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter signup */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="font-playfair text-lg font-bold text-brand-dark mb-1">
                  Travel Inspiration
                </p>
                <p className="text-brand-grey text-sm mb-4">
                  Get the latest stories and travel tips direct to your inbox.
                </p>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-brand-dark placeholder:text-brand-grey focus:outline-none focus:border-brand-orange transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-brand-dark placeholder:text-brand-grey focus:outline-none focus:border-brand-orange transition-colors"
                  />
                  <Button variant="brand" size="sm" fullWidth>
                    Get Travel Inspiration
                  </Button>
                </form>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Related Articles */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="font-playfair text-2xl font-bold text-brand-dark mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div
                  className={`bg-gradient-to-br ${post.gradient} h-44 flex items-end p-4`}
                >
                  <span className="text-white/30 font-playfair font-bold text-base line-clamp-2 group-hover:text-white/50 transition-colors">
                    {post.title}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-playfair text-base font-bold text-brand-dark mb-2 leading-snug group-hover:text-brand-orange transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-brand-grey">
                    {post.date} &bull; {post.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
