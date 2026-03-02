import { defineType, defineField, defineArrayMember } from "sanity";

export const blogPostSchema = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info" },
    { name: "content", title: "Content" },
    { name: "relations", title: "Related Content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "basic",
      validation: (R) => R.required().max(120),
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
          { title: "Scheduled", value: "scheduled" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "basic",
    }),
    defineField({
      name: "scheduledAt",
      title: "Scheduled For (if scheduled)",
      type: "datetime",
      group: "basic",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "object",
      group: "basic",
      fields: [
        defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
        defineField({ name: "bio", title: "Bio", type: "text", rows: 2 }),
        defineField({
          name: "photo",
          title: "Photo",
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "basic",
      options: {
        list: [
          { title: "Destination", value: "destination" },
          { title: "Experience Type", value: "experience-type" },
          { title: "Travel Tips", value: "travel-tips" },
          { title: "Company News", value: "company-news" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "basic",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
      rows: 3,
      description: "Shown on blog listing cards. Max 200 characters.",
      validation: (R) => R.required().max(200),
    }),
    defineField({
      name: "body",
      title: "Post Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
            defineField({ name: "caption", type: "string", title: "Caption" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "relatedDestinations",
      title: "Related Destinations",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "destination" }] })],
    }),
    defineField({
      name: "relatedExperienceTypes",
      title: "Related Experience Types",
      type: "array",
      group: "relations",
      of: [defineArrayMember({ type: "reference", to: [{ type: "experienceType" }] })],
    }),
    // SEO
    defineField({ name: "seoTitle", title: "SEO Title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", group: "seo", rows: 2 }),
    defineField({
      name: "ogImage",
      title: "OG Image (Social Share)",
      type: "image",
      group: "seo",
      options: { hotspot: true },
    }),
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
