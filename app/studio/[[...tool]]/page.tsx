/**
 * Sanity Studio — embedded in Next.js App Router
 * Accessible at /studio
 *
 * NOTE: This page must be excluded from auth middleware.
 * Protect via Sanity's own CORS / user management instead.
 */

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export { viewport } from "next-sanity/studio";

export const metadata = {
  title: "CMS Studio | See the Unseen",
};

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
