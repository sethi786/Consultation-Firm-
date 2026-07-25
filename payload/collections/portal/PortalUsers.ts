import type { CollectionConfig } from "payload";
import { authenticated } from "../../access";

/**
 * Client portal users. Authentication is handled by Auth.js (Entra ID SSO or
 * email/password), NOT Payload — so this stores the credential material and
 * profile only. `passwordHash` is a bcrypt hash, never exposed via API.
 */
export const PortalUsers: CollectionConfig = {
  slug: "portal-users",
  labels: { singular: "Portal User", plural: "Portal Users" },
  admin: { useAsTitle: "email", group: "Portal" },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "email", type: "email", required: true, unique: true, index: true },
    { name: "name", type: "text" },
    {
      name: "passwordHash",
      type: "text",
      required: false,
      access: {
        // Never read the hash back out through any API.
        read: () => false,
      },
      admin: { hidden: true },
    },
    {
      name: "authProvider",
      type: "select",
      defaultValue: "password",
      options: [
        { label: "Email / password", value: "password" },
        { label: "Microsoft Entra ID", value: "entra-id" },
      ],
    },
  ],
};
