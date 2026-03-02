"use client";

import dynamic from "next/dynamic";
import type { Config } from "sanity";

// ssr: false is only valid inside a Client Component
const NextStudio = dynamic(
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

export function StudioClient({ config }: { config: Config }) {
  return <NextStudio config={config} />;
}
