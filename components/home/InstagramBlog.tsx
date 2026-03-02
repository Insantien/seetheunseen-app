/**
 * InstagramBlog — See the Unseen
 *
 * Two-column section: Instagram feed preview (left) + latest blog posts (right).
 * Accepts optional `posts` prop for live Sanity data; falls back to mock data.
 * Server component — no client-side interactivity needed.
 */

import Link from "next/link";
import { Heart, Instagram, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import type { BlogPost } from "@/types";

// ─── Mock blog posts ──────────────────────────────────────────────────────────

const MOCK_POSTS = [
  {
    id: "1",
    category: "Destination",
    title: "Rajasthan Beyond the Palaces: A Journey into the Desert Villages",
    excerpt:
      "Beyond the gilded forts and royal residences lies a Rajasthan few tourists ever encounter — and it is more captivating than anything in the guidebooks.",
    slug: "rajasthan-beyond-palaces",
    gradient: "from-amber-700 via-orange-800 to-brand-dark",
  },
  {
    id: "2",
    category: "Travel Tips",
    title: "How to Choose the Right Time to Visit Kerala",
    excerpt:
      "Kerala's backwaters, hill stations, and beaches each have their own ideal season. Our guide helps you plan a visit that matches your travel style.",
    slug: "best-time-visit-kerala",
    gradient: "from-emerald-800 via-teal-900 to-brand-dark",
  },
  {
    id: "3",
    category: "Experience",
    title: "Bhutan's Gross National Happiness: Travelling with Intention",
    excerpt:
      "There is a reason Bhutan measures its success in happiness rather than GDP. Spending a week here rewired our entire perspective on meaningful travel.",
    slug: "bhutan-gross-national-happiness",
    gradient: "from-brand-charcoal via-stone-700 to-slate-900",
  },
];

// ─── Instagram grid ───────────────────────────────────────────────────────────

const INSTAGRAM_TILES = [
  { id: 1, gradient: "from-amber-600 via-orange-700 to-rose-800" },
  { id: 2, gradient: "from-teal-700 via-emerald-800 to-green-900" },
  { id: 3, gradient: "from-blue-800 via-indigo-900 to-slate-900" },
  { id: 4, gradient: "from-brand-orange via-brand-coral to-rose-700" },
  { id: 5, gradient: "from-stone-600 via-brand-charcoal to-brand-dark" },
  { id: 6, gradient: "from-violet-800 via-purple-900 to-brand-dark" },
];

// ─── Category badge colours ───────────────────────────────────────────────────

const CATEGORY_STYLES: Record<string, string> = {
  Destination: "bg-brand-orange/10 text-brand-orange",
  "Travel Tips": "bg-teal-100 text-teal-700",
  Experience: "bg-violet-100 text-violet-700",
  "Company News": "bg-blue-100 text-blue-700",
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface InstagramBlogProps {
  posts?: BlogPost[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InstagramBlog({ posts }: InstagramBlogProps) {
  const blogCards =
    posts && posts.length > 0
      ? posts.slice(0, 3).map((p, i) => ({
          id: p._id,
          category:
            p.category.charAt(0).toUpperCase() +
            p.category.slice(1).replace(/-/g, " "),
          title: p.title,
          excerpt: p.excerpt,
          slug: p.slug.current,
          gradient: MOCK_POSTS[i % MOCK_POSTS.length].gradient,
        }))
      : MOCK_POSTS;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left — Instagram feed preview */}
          <div>
            <p className="section-eyebrow mb-4">FOLLOW US @SEETHEUNSEEN</p>
            <div className="grid grid-cols-3 gap-2 mb-5">
              {INSTAGRAM_TILES.map((tile) => (
                <div
                  key={tile.id}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
                      tile.gradient
                    )}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-black/0 group-hover:bg-black/40",
                      "transition-colors duration-300",
                      "flex items-center justify-center"
                    )}
                  >
                    <Heart
                      size={28}
                      className={cn(
                        "text-white fill-white",
                        "opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100",
                        "transition-all duration-300"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://www.instagram.com/seetheunseen"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2.5",
                "font-sans text-sm font-semibold text-brand-charcoal",
                "border border-gray-200 rounded-full px-5 py-2.5",
                "hover:border-brand-orange hover:text-brand-orange",
                "transition-colors duration-200"
              )}
            >
              <Instagram size={16} />
              Follow on Instagram
            </a>
          </div>

          {/* Right — Latest blog posts */}
          <div>
            <p className="section-eyebrow mb-2">FROM THE JOURNAL</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-dark leading-tight mb-8">
              Stories &amp; Inspiration
            </h2>
            <div className="space-y-5">
              {blogCards.map((post) => (
                <article
                  key={post.id}
                  className={cn(
                    "group flex gap-4 p-4 rounded-2xl",
                    "border border-gray-100 hover:border-brand-orange/20",
                    "hover:shadow-card transition-all duration-200"
                  )}
                >
                  <div
                    className={cn(
                      "shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br",
                      post.gradient
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <span
                      className={cn(
                        "inline-block font-sans text-[10px] font-bold uppercase tracking-wider",
                        "rounded-full px-2.5 py-1 mb-1.5",
                        CATEGORY_STYLES[post.category] ?? "bg-gray-100 text-brand-grey"
                      )}
                    >
                      {post.category}
                    </span>
                    <h3 className="font-playfair text-base font-bold text-brand-dark leading-snug mb-1 line-clamp-2 group-hover:text-brand-orange transition-colors duration-150">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="font-lora text-xs text-brand-grey leading-relaxed line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-brand-orange hover:gap-2 transition-all duration-150"
                    >
                      Read More <ArrowRight size={12} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-7">
              <Button as="a" href="/blog" variant="outline" size="md">
                View All Articles
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
