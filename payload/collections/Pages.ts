import type { CollectionConfig } from "payload";
import { publishedOrAuthenticated, authenticated } from "../access";
import { slugField, seoField } from "../fields/slug";

/** Editable pages — legal (privacy, terms, dpa, security) and similar. */
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: { useAsTitle: "title", group: "Content" },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: { drafts: { autosave: false, schedulePublish: true }, maxPerDoc: 20 },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    { name: "lede", type: "textarea" },
    { name: "content", type: "richText" },
    seoField,
  ],
};
