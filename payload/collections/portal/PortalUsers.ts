import type { CollectionConfig } from "payload";
import bcrypt from "bcryptjs";
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
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // Staff can set/reset a client's password from /admin via the virtual
        // `password` field; it is hashed into passwordHash and never stored.
        if (data && typeof data.password === "string" && data.password.length > 0) {
          data.passwordHash = await bcrypt.hash(data.password, 10);
          delete data.password;
        }
        return data;
      },
    ],
  },
  fields: [
    { name: "email", type: "email", required: true, unique: true, index: true },
    { name: "name", type: "text" },
    {
      // Virtual: write-only. Setting it (re)sets the password; it is never stored
      // or read back.
      name: "password",
      type: "text",
      virtual: true,
      access: { read: () => false },
      admin: {
        description: "Set a temporary password for email/password sign-in. Leave blank to keep the current one.",
      },
    },
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
