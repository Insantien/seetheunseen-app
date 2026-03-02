import { defineType, defineField } from "sanity";

export const addOnServiceSchema = defineType({
  name: "addOnService",
  title: "Add-On Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title", maxLength: 80 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Lucide icon name, e.g. 'plane', 'shield-check', 'camera'",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      description: "Shown on tour cards and add-on selectors.",
      validation: (R) => R.required().max(150),
    }),
    defineField({
      name: "details",
      title: "Full Details",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 99,
    }),
  ],

  preview: {
    select: { title: "title", icon: "icon" },
    prepare: ({ title, icon }: any) => ({
      title,
      subtitle: icon,
    }),
  },
});
