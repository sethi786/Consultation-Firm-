import type { CollectionConfig } from "payload";
import { publishedOrAuthenticated, authenticated } from "../access";
import { slugField, seoField } from "../fields/slug";

export const Industries: CollectionConfig = {
  slug: "industries",
  admin: { useAsTitle: "name", group: "Content" },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: { drafts: { autosave: false }, maxPerDoc: 10 },
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    { name: "lede", type: "textarea", required: true },
    { name: "content", type: "richText" },
    seoField,
  ],
};
