import { defineType, defineField, defineArrayMember } from "sanity";

const portableTextOf = [
  defineArrayMember({ type: "block" }),
  defineArrayMember({
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({ name: "alt", type: "string", title: "Alt text" }),
      defineField({ name: "caption", type: "string", title: "Caption" }),
    ],
  }),
];

export const tourSchema = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info" },
    { name: "media", title: "Media" },
    { name: "details", title: "Tour Details" },
    { name: "itinerary", title: "Itinerary" },
    { name: "accommodation", title: "Accommodation" },
    { name: "logistics", title: "Inclusions & Add-ons" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ─── Basic Info ───────────────────────────────────────
    defineField({
      name: "title",
      title: "Tour Title",
      type: "string",
      group: "basic",
      validation: (R) => R.required().min(5).max(120),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "basic",
      options: { source: "title", maxLength: 100 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "basic",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Featured", value: "featured" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      group: "basic",
      rows: 3,
      description: "Shown on tour cards. Max 200 characters.",
      validation: (R) => R.required().max(200),
    }),
    defineField({
      name: "experienceTypes",
      title: "Experience Types",
      type: "array",
      group: "basic",
      of: [defineArrayMember({ type: "reference", to: [{ type: "experienceType" }] })],
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: "destinations",
      title: "Destinations",
      type: "array",
      group: "basic",
      of: [defineArrayMember({ type: "reference", to: [{ type: "destination" }] })],
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: "subCategory",
      title: "Sub-Category",
      type: "string",
      group: "basic",
      placeholder: "e.g. Ocean Cruise, River Cruise, Safari",
    }),
    defineField({
      name: "isDomestic",
      title: "Domestic Tour?",
      type: "boolean",
      group: "basic",
      initialValue: false,
    }),
    defineField({
      name: "duration",
      title: "Duration (Days)",
      type: "number",
      group: "basic",
      validation: (R) => R.required().min(1).max(365),
    }),
    defineField({
      name: "pricePerAdult",
      title: "Price Per Adult (₹ INR)",
      type: "number",
      group: "basic",
      validation: (R) => R.required().min(0),
    }),
    defineField({
      name: "groupTypes",
      title: "Suitable For",
      type: "array",
      group: "basic",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Solo", value: "solo" },
          { title: "Couple", value: "couple" },
          { title: "Family", value: "family" },
          { title: "Group", value: "group" },
        ],
        layout: "grid",
      },
    }),
    defineField({
      name: "bestMonths",
      title: "Best Travel Months",
      type: "array",
      group: "basic",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "January", value: "jan" }, { title: "February", value: "feb" },
          { title: "March", value: "mar" }, { title: "April", value: "apr" },
          { title: "May", value: "may" }, { title: "June", value: "jun" },
          { title: "July", value: "jul" }, { title: "August", value: "aug" },
          { title: "September", value: "sep" }, { title: "October", value: "oct" },
          { title: "November", value: "nov" }, { title: "December", value: "dec" },
        ],
        layout: "grid",
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "basic",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          "bucket-list", "honeymoon", "adventure", "family", "wellness",
          "cultural", "wildlife", "photography", "luxury", "offbeat",
        ].map((t) => ({ title: t, value: t })),
        layout: "grid",
      },
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      group: "basic",
      description: "Lower numbers appear first. Leave blank for default order.",
    }),

    // ─── Media ────────────────────────────────────────────
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text", validation: (R) => R.required() }),
      ],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
        }),
      ],
      description: "Add up to 20 photos. First image will also appear as a preview.",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      group: "media",
      description: "YouTube or Vimeo URL for the tour video.",
    }),

    // ─── Details ──────────────────────────────────────────
    defineField({
      name: "overview",
      title: "Tour Overview",
      type: "array",
      of: portableTextOf,
      group: "details",
    }),

    // ─── Itinerary ────────────────────────────────────────
    defineField({
      name: "itinerary",
      title: "Day-by-Day Itinerary",
      type: "array",
      group: "itinerary",
      of: [
        defineArrayMember({
          type: "object",
          name: "itineraryDay",
          title: "Day",
          fields: [
            defineField({ name: "day", title: "Day Number", type: "number", validation: (R) => R.required() }),
            defineField({ name: "title", title: "Day Title", type: "string", validation: (R) => R.required() }),
            defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
            defineField({
              name: "accommodation",
              title: "Accommodation",
              type: "object",
              fields: [
                defineField({ name: "city", title: "City / Location", type: "string" }),
                defineField({ name: "category", title: "Category", type: "string", placeholder: "e.g. Heritage Property, 5-Star Resort" }),
                defineField({
                  name: "representativeHotels",
                  title: "Representative Hotels",
                  type: "array",
                  of: [{ type: "string" }],
                }),
              ],
            }),
          ],
          preview: {
            select: { day: "day", title: "title" },
            prepare: ({ day, title }: any) => ({
              title: `Day ${day}: ${title}`,
            }),
          },
        }),
      ],
    }),

    // ─── Accommodation Options ────────────────────────────
    defineField({
      name: "accommodationOptions",
      title: "Accommodation Tiers",
      type: "array",
      group: "accommodation",
      description: "Define A, B, C tier options with pricing.",
      of: [
        defineArrayMember({
          type: "object",
          name: "accommodationTier",
          title: "Tier",
          fields: [
            defineField({ name: "tierName", title: "Tier Name", type: "string", placeholder: "Standard / Deluxe / Ultra-Luxury" }),
            defineField({ name: "starRating", title: "Star Rating", type: "number", validation: (R) => R.min(1).max(7) }),
            defineField({ name: "roomType", title: "Room Type", type: "string" }),
            defineField({ name: "priceSupplement", title: "Price Supplement (₹ per person)", type: "number" }),
            defineField({
              name: "locations",
              title: "Hotels by Location",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "city", title: "City", type: "string" }),
                    defineField({ name: "hotelName", title: "Hotel Name", type: "string" }),
                    defineField({ name: "nights", title: "Nights", type: "number" }),
                  ],
                  preview: {
                    select: { city: "city", hotel: "hotelName", nights: "nights" },
                    prepare: ({ city, hotel, nights }: any) => ({
                      title: `${city}: ${hotel} (${nights}N)`,
                    }),
                  },
                }),
              ],
            }),
            defineField({ name: "notes", title: "Notes", type: "text", rows: 2 }),
          ],
          preview: {
            select: { name: "tierName", stars: "starRating" },
            prepare: ({ name, stars }: any) => ({
              title: `${name} (${stars}★)`,
            }),
          },
        }),
      ],
    }),

    // ─── Inclusions & Add-ons ─────────────────────────────
    defineField({
      name: "inclusions",
      title: "What's Included",
      type: "array",
      group: "logistics",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "exclusions",
      title: "What's Not Included",
      type: "array",
      group: "logistics",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "addOns",
      title: "Optional Add-ons",
      type: "array",
      group: "logistics",
      of: [defineArrayMember({ type: "reference", to: [{ type: "addOnService" }] })],
    }),
    defineField({
      name: "importantNotes",
      title: "Important Notes",
      type: "array",
      of: portableTextOf,
      group: "logistics",
    }),
    defineField({
      name: "brochureFile",
      title: "Brochure PDF",
      type: "file",
      group: "logistics",
      options: { accept: ".pdf" },
    }),

    // ─── SEO ──────────────────────────────────────────────
    defineField({ name: "seoTitle", title: "SEO Title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", group: "seo", rows: 2 }),
  ],

  preview: {
    select: { title: "title", status: "status", media: "heroImage" },
    prepare: ({ title, status, media }: any) => ({
      title,
      subtitle: status?.toUpperCase(),
      media,
    }),
  },
});
