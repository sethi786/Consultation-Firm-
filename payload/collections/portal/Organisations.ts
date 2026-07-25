import type { CollectionConfig } from "payload";
import { authenticated } from "../../access";

/**
 * A client tenant. Every portal-owned row references an organisation; the
 * data-access layer (lib/portal/data.ts) scopes every query to the caller's org.
 * Access here is admin-only so the public REST API never exposes tenant data —
 * the portal reads through the Local API, not these endpoints.
 */
export const Organisations: CollectionConfig = {
  slug: "organisations",
  admin: { useAsTitle: "name", group: "Portal" },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
  ],
};
