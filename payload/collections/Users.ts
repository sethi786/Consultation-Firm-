import type { CollectionConfig } from "payload";

/**
 * Internal staff who log into the Payload admin studio (/admin). This is the
 * firm's own team — distinct from portal client users (Phase 5), who authenticate
 * via Auth.js, not Payload.
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "System",
  },
  access: {
    // Only authenticated staff can read the admin user list.
    read: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text" },
    {
      name: "role",
      type: "select",
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};
