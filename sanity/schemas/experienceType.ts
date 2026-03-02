import { defineType, defineField, defineArrayMember } from "sanity";

export const experienceTypeSchema = defineType({
  name: "experienceType",
  title: "Experience Type",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info" },
    { name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "number",
      title: "Display Number",
      type: "number",
      group: "basic",
      description: "01–09. Controls the display order on the homepage grid.",
      validation: (R) => R.required().min(1).max(9),
    }),
    defineField({
      name: "title",
      title: "Experience Type Name",
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
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "basic",
      description: "Short evocative tagline shown under the title.",
      validation: (R) => R.max(100),
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
      name: "description",
      title: "Description",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "subCategories",
      title: "Sub-Categories",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Sub-Category Name", type: "string", validation: (R) => R.required() }),
            defineField({ name: "description", title: "Description", type: "string" }),
          ],
          preview: {
            select: { title: "title" },
          },
        }),
      ],
    }),
    defineField({
      name: "featuredTours",
      title: "Featured Tours",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tour" }] })],
      description: "Up to 6 featured tours for this experience type.",
    }),
    defineField({
      name: "brochureFile",
      title: "Brochure PDF",
      type: "file",
      group: "content",
      options: { accept: ".pdf" },
    }),
    // SEO
    defineField({ name: "seoTitle", title: "SEO Title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", group: "seo", rows: 2 }),
  ],

  preview: {
    select: { title: "title", number: "number", media: "heroImage" },
    prepare: ({ title, number, media }: any) => ({
      title: `${String(number).padStart(2, "0")}. ${title}`,
      media,
    }),
  },
});
