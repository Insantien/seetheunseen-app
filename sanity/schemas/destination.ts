import { defineType, defineField, defineArrayMember } from "sanity";

export const destinationSchema = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info" },
    { name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Destination Name",
      type: "string",
      group: "basic",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "basic",
      options: { source: "title", maxLength: 80 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      group: "basic",
      options: {
        list: [
          { title: "India", value: "india" },
          { title: "Asia", value: "asia" },
          { title: "Europe", value: "europe" },
          { title: "Middle East & Africa", value: "middle-east-africa" },
          { title: "Americas & Oceania", value: "americas-oceania" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "isDomestic",
      title: "Domestic Destination?",
      type: "boolean",
      group: "basic",
      initialValue: false,
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "basic",
      description: "Short evocative line shown on cards and hero.",
      validation: (R) => R.max(120),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "basic",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "highlights",
      title: "Top Highlights",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      description: "Bullet-point highlights shown on the destination page.",
    }),
    defineField({
      name: "bestTimeToVisit",
      title: "Best Time to Visit",
      type: "string",
      group: "content",
      description: "e.g. October to March",
    }),
    defineField({
      name: "guideFile",
      title: "Destination Guide PDF",
      type: "file",
      group: "content",
      options: { accept: ".pdf" },
    }),
    // SEO
    defineField({ name: "seoTitle", title: "SEO Title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", group: "seo", rows: 2 }),
  ],

  preview: {
    select: { title: "title", region: "region", media: "heroImage" },
    prepare: ({ title, region, media }: any) => ({
      title,
      subtitle: region?.toUpperCase(),
      media,
    }),
  },
});
