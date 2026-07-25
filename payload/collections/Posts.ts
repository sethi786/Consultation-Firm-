import type { CollectionConfig } from "payload";
import { publishedOrAuthenticated, authenticated } from "../access";
import { slugField, seoField } from "../fields/slug";

/** Insights / research articles (/insights). */
export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "_status"],
    group: "Content",
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: { autosave: false, schedulePublish: true },
    maxPerDoc: 20,
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      admin: { description: "One or two sentences for the index and social preview." },
    },
    { name: "kicker", type: "text", admin: { description: "Short topic label, e.g. Identity." } },
    { name: "author", type: "relationship", relationTo: "authors" },
    { name: "coverImage", type: "upload", relationTo: "media" },
    {
      name: "publishedAt",
      type: "date",
      admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } },
    },
    { name: "content", type: "richText" },
    seoField,
  ],
};
