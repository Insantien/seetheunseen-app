import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BlogCategoryFilter } from "@/components/blog/BlogCategoryFilter";

export const metadata: Metadata = {
  title: "Travel Journal | See the Unseen",
  description:
    "Stories, inspiration and expert travel advice from the team at See the Unseen.",
};

const MOCK_POSTS = [
  {
    slug: "top-10-destinations-india-2026",
    title: "Top 10 Unmissable Destinations in India for 2026",
    category: "destination",
    excerpt:
      "From the golden deserts of Rajasthan to the misty hills of Coorg, discover India's most breathtaking corners.",
    author: "Priya Sharma",
    date: "Feb 15, 2026",
    gradient: "from-amber-700 to-orange-900",
    readTime: "8 min read",
  },
  {
    slug: "cherry-blossom-japan-guide",
    title: "The Ultimate Guide to Japan's Cherry Blossom Season",
    category: "destination",
    excerpt:
      "Plan the perfect hanami experience with our expert guide to Japan's most magical time of year.",
    author: "Rahul Mehta",
    date: "Feb 10, 2026",
    gradient: "from-pink-600 to-rose-900",
    readTime: "12 min read",
  },
  {
    slug: "wellness-travel-trends-2026",
    title: "Wellness Travel in 2026: The Rise of Transformative Journeys",
    category: "travel-tips",
    excerpt:
      "From Ayurvedic retreats in Kerala to mindfulness camps in Bhutan, wellness tourism is redefining luxury travel.",
    author: "Ananya Iyer",
    date: "Feb 5, 2026",
    gradient: "from-teal-600 to-cyan-900",
    readTime: "6 min read",
  },
  {
    slug: "scenic-escapes-experience",
    title: "What Makes a Scenic Escape? Our Philosophy of Slow Travel",
    category: "experience-type",
    excerpt:
      "The art of truly seeing a place — how our Scenic Escapes collection is designed for the curious, unhurried traveller.",
    author: "Vikram Nair",
    date: "Jan 28, 2026",
    gradient: "from-blue-600 to-indigo-900",
    readTime: "5 min read",
  },
  {
    slug: "family-travel-tips-india",
    title: "7 Tips for an Unforgettable Family Holiday in India",
    category: "travel-tips",
    excerpt:
      "Travelling with children doesn't mean compromising on luxury. Here's how to plan a holiday the whole family will cherish.",
    author: "Priya Sharma",
    date: "Jan 20, 2026",
    gradient: "from-rose-600 to-pink-900",
    readTime: "7 min read",
  },
  {
    slug: "maldives-overwater-bungalows",
    title: "Maldives Overwater Bungalows: Everything You Need to Know",
    category: "destination",
    excerpt:
      "A comprehensive guide to choosing the right overwater villa, the best resorts, and what to expect.",
    author: "Rahul Mehta",
    date: "Jan 15, 2026",
    gradient: "from-cyan-600 to-sky-900",
    readTime: "10 min read",
  },
  {
    slug: "stuns-travel-story",
    title: "From Idea to Icon: The Story Behind See the Unseen",
    category: "company-news",
    excerpt:
      "How a passion for authentic travel led to the creation of India's most trusted luxury travel brand.",
    author: "Ananya Iyer",
    date: "Jan 8, 2026",
    gradient: "from-slate-700 to-zinc-900",
    readTime: "4 min read",
  },
  {
    slug: "kerala-monsoon-travel",
    title: "Why Monsoon is the Best Time to Visit Kerala",
    category: "destination",
    excerpt:
      "Contrary to popular belief, Kerala in the rain is nothing short of magical — lush, vibrant and wonderfully peaceful.",
    author: "Vikram Nair",
    date: "Jan 3, 2026",
    gradient: "from-green-700 to-emerald-900",
    readTime: "6 min read",
  },
];

const CATEGORY_BADGE: Record<
  string,
  { label: string; variant: "orange" | "coral" | "green" | "grey" | "dark" | "outline" }
> = {
  destination: { label: "Destination", variant: "outline" },
  "experience-type": { label: "Experience", variant: "orange" },
  "travel-tips": { label: "Travel Tips", variant: "green" },
  "company-news": { label: "Company News", variant: "grey" },
};

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "destination", label: "Destination" },
  { id: "experience-type", label: "Experience Type" },
  { id: "travel-tips", label: "Travel Tips" },
  { id: "company-news", label: "Company News" },
];

function getCategoryBadge(category: string) {
  return (
    CATEGORY_BADGE[category] ?? { label: category, variant: "grey" as const }
  );
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  // For static rendering, we won't await searchParams — the category filter is client-side
  const [featuredPost, ...restPosts] = MOCK_POSTS;
  const gridPosts = restPosts.slice(0, 7);

  const featuredBadge = getCategoryBadge(featuredPost.category);

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-dark to-brand-charcoal text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-orange font-semibold text-sm uppercase tracking-widest mb-3">
            See the Unseen
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            From the Journal
          </h1>
          <p className="text-white/70 font-lora text-lg md:text-xl max-w-xl mx-auto">
            Stories, inspiration and expert travel advice
          </p>
        </div>
      </div>

      {/* Category filter (client component) */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogCategoryFilter categories={CATEGORIES} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured post */}
        <div className="mb-12">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              {/* Image placeholder */}
              <div
                className={`bg-gradient-to-br ${featuredPost.gradient} h-64 md:h-full min-h-64 flex items-end p-6`}
              >
                <span className="text-white/40 font-playfair text-3xl font-bold leading-tight line-clamp-2 group-hover:text-white/60 transition-colors">
                  {featuredPost.title}
                </span>
              </div>
              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="mb-4">
                  <Badge
                    label={featuredBadge.label}
                    variant={featuredBadge.variant}
                  />
                </div>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-brand-dark leading-tight mb-4 group-hover:text-brand-orange transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-brand-grey font-lora leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-3 text-sm text-brand-grey mb-6">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-orange to-brand-coral flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {featuredPost.author[0]}
                  </span>
                  <span className="font-semibold text-brand-charcoal">
                    {featuredPost.author}
                  </span>
                  <span>&bull;</span>
                  <span>{featuredPost.date}</span>
                  <span>&bull;</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <Button
                  as="a"
                  href={`/blog/${featuredPost.slug}`}
                  variant="brand"
                  size="md"
                >
                  Read Article
                </Button>
              </div>
            </div>
          </Link>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {gridPosts.map((post) => {
            const badge = getCategoryBadge(post.category);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image placeholder */}
                <div
                  className={`bg-gradient-to-br ${post.gradient} h-48 relative flex items-end p-5`}
                >
                  <span className="text-white/30 font-playfair text-lg font-bold line-clamp-1 group-hover:text-white/50 transition-colors">
                    {post.title}
                  </span>
                </div>
                {/* Card content */}
                <div className="p-6">
                  <div className="mb-3">
                    <Badge label={badge.label} variant={badge.variant} size="sm" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-brand-dark mb-2 leading-snug group-hover:text-brand-orange transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-brand-grey text-sm font-lora leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-brand-grey pt-4 border-t border-gray-100">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-orange to-brand-coral flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {post.author[0]}
                    </span>
                    <span className="font-semibold text-brand-charcoal">
                      {post.author}
                    </span>
                    <span>&bull;</span>
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load more */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
}
