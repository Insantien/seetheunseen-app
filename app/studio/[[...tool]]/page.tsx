/**
 * Sanity Studio — embedded in Next.js App Router
 * Accessible at /studio
 *
 * Must use ssr: false — Sanity Studio uses browser-only APIs
 * that crash during Next.js server-side rendering / page data collection.
 */

import nextDynamic from "next/dynamic";
import config from "@/sanity.config";

export { viewport } from "next-sanity/studio";

export const metadata = {
  title: "CMS Studio | See the Unseen",
};

// Force dynamic rendering (no static pre-render)
export const dynamic = "force-dynamic";

// Disable SSR entirely for the Studio — it relies on browser globals
const NextStudio = nextDynamic(
  () => import("next-sanity/studio").then((mod) => ({ default: mod.NextStudio })),
  {
    ssr: false,
    loading: () => (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "sans-serif",
        fontSize: "14px",
        color: "#666",
      }}>
        Loading Studio…
      </div>
    ),
  }
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}
