import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../access";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: { useAsTitle: "name", group: "Content" },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", admin: { description: "e.g. Principal Consultant" } },
    { name: "bio", type: "textarea" },
    { name: "avatar", type: "upload", relationTo: "media" },
  ],
};
