"use client";

import dynamic from "next/dynamic";

// ALL sanity imports must live inside this client component —
// importing sanity.config in a server component causes createContext errors
// because Sanity/styled-components evaluate browser globals during SSR.
const NextStudio = dynamic(
  async () => {
    const [{ NextStudio: Studio }, { default: config }] = await Promise.all([
      import("next-sanity/studio"),
      import("@/sanity.config"),
    ]);
    // Return a component that has config baked in
    return { default: () => <Studio config={config} /> };
  },
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

export function StudioClient() {
  return <NextStudio />;
}
