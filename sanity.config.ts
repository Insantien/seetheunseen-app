/**
 * Sanity Studio configuration
 * Accessible at: /studio (in development and production)
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "see-the-unseen",
  title: "See the Unseen — CMS",
  basePath: "/studio",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // ─── Singleton: Site Settings ──────────────────
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            // ─── Tours ────────────────────────────────────
            S.documentTypeListItem("tour").title("Tours"),
            // ─── Experience Types ──────────────────────────
            S.documentTypeListItem("experienceType").title("Experience Types"),
            // ─── Destinations ─────────────────────────────
            S.documentTypeListItem("destination").title("Destinations"),
            S.divider(),
            // ─── Blog ─────────────────────────────────────
            S.documentTypeListItem("blogPost").title("Blog Posts"),
            S.divider(),
            // ─── Add-on Services ──────────────────────────
            S.documentTypeListItem("addOnService").title("Add-On Services"),
          ]),
    }),
    // GROQ-powered vision tool for query testing (dev only)
    ...(process.env.NODE_ENV === "development" ? [visionTool({ defaultApiVersion: "2024-01-01" })] : []),
  ],

  schema: {
    types: schemaTypes,
  },
});
