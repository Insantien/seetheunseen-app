/**
 * Sanity Studio — embedded in Next.js App Router
 * Accessible at /studio
 */

import { StudioClient } from "./StudioClient";
import config from "@/sanity.config";

export { viewport } from "next-sanity/studio";

export const metadata = {
  title: "CMS Studio | See the Unseen",
};

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <StudioClient config={config} />;
}
