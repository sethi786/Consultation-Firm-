import type { CollectionConfig } from "payload";
import { authenticated } from "../../access";

/** Links a portal user to an organisation with a role. */
export const Memberships: CollectionConfig = {
  slug: "memberships",
  admin: { useAsTitle: "id", group: "Portal", defaultColumns: ["user", "organisation", "role"] },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  indexes: [{ fields: ["user", "organisation"], unique: true }],
  fields: [
    { name: "user", type: "relationship", relationTo: "portal-users", required: true, index: true },
    { name: "organisation", type: "relationship", relationTo: "organisations", required: true, index: true },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "member",
      options: [
        { label: "Owner", value: "owner" },
        { label: "Admin", value: "admin" },
        { label: "Member", value: "member" },
        { label: "Viewer", value: "viewer" },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "active",
      options: [
        { label: "Invited", value: "invited" },
        { label: "Active", value: "active" },
        { label: "Suspended", value: "suspended" },
      ],
    },
  ],
};
