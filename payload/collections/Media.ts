import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: { group: "Content" },
  upload: {
    // Local disk in dev; swap to S3/Vercel Blob adapter for production.
    staticDir: "public/media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumb", width: 480 },
      { name: "card", width: 900 },
      { name: "og", width: 1200, height: 630 },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Describe the image for screen readers and SEO." },
    },
  ],
};
