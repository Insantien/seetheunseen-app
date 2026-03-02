import { defineType, defineField, defineArrayMember } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton — there should only be one document of this type
  // __experimental_actions removed: not a valid Sanity v3 property
  groups: [
    { name: "homepage", title: "Homepage" },
    { name: "contact", title: "Contact & Social" },
  ],
  fields: [
    // ─── Homepage ─────────────────────────────────────────
    defineField({
      name: "heroSlides",
      title: "Hero Slider",
      type: "array",
      group: "homepage",
      description: "4–6 hero slides. Each slide links to an experience type or tour.",
      of: [
        defineArrayMember({
          type: "object",
          name: "heroSlide",
          title: "Slide",
          fields: [
            defineField({
              name: "image",
              title: "Background Image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
              validation: (R) => R.required(),
            }),
            defineField({ name: "experienceType", title: "Experience Type Label", type: "string", description: "e.g. SCENIC ESCAPES" }),
            defineField({ name: "headline", title: "Headline", type: "string", validation: (R) => R.required() }),
            defineField({ name: "subheadline", title: "Sub-Headline", type: "string" }),
            defineField({ name: "ctaLabel", title: "CTA Button Label", type: "string", initialValue: "Explore Tours" }),
            defineField({ name: "ctaLink", title: "CTA Link", type: "string", description: "Relative URL, e.g. /experiences/scenic-escapes" }),
          ],
          preview: {
            select: { headline: "headline", media: "image" },
            prepare: ({ headline, media }: any) => ({
              title: headline ?? "Unnamed Slide",
              media,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "featuredTours",
      title: "Featured Tours (Homepage)",
      type: "array",
      group: "homepage",
      description: "Up to 8 tours shown in the Featured Tours section.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tour" }] })],
    }),
    defineField({
      name: "announcementBanner",
      title: "Announcement Banner",
      type: "object",
      group: "homepage",
      fields: [
        defineField({ name: "active", title: "Show Banner?", type: "boolean", initialValue: false }),
        defineField({ name: "text", title: "Banner Text", type: "string" }),
        defineField({ name: "link", title: "Link URL", type: "string" }),
      ],
    }),

    // ─── Contact & Social ─────────────────────────────────
    defineField({ name: "contactPhone", title: "Phone Number", type: "string", group: "contact" }),
    defineField({ name: "contactEmail", title: "Email", type: "string", group: "contact" }),
    defineField({ name: "officeAddress", title: "Office Address", type: "text", group: "contact", rows: 3 }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
        defineField({ name: "whatsapp", title: "WhatsApp Number", type: "string", description: "Include country code, e.g. +919876543210" }),
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
