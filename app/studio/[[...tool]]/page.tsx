/**
 * Sanity Studio — embedded in Next.js App Router
 * Accessible at /studio
 *
 * ALL sanity imports (sanity.config, next-sanity/studio) are kept out of
 * this server component to prevent createContext errors during SSR.
 * They are lazy-loaded inside StudioClient (a "use client" component).
 */

import { StudioClient } from "./StudioClient";

export const metadata = {
  title: "CMS Studio | See the Unseen",
};

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <StudioClient />;
}
