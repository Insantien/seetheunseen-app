import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;
import type { SanityImage } from "@/types";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01", // use a fixed date for stable API behaviour
  useCdn: process.env.NODE_ENV === "production", // CDN for reads in production
  token: process.env.SANITY_API_TOKEN, // required for draft/preview reads
});

/* ─── Image URL Builder ─── */
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage | SanityImageSource) {
  return builder.image(source);
}

/**
 * Generate a sized, WebP-optimised image URL from a Sanity image ref.
 * @example urlForSized(image, 800, 600) → "https://cdn.sanity.io/..."
 */
export function urlForSized(
  source: SanityImage | SanityImageSource,
  width: number,
  height?: number
): string {
  const img = builder.image(source).width(width).format("webp").quality(85);
  return (height ? img.height(height) : img).url();
}
