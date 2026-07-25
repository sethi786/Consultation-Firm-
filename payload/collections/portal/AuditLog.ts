import type { CollectionConfig } from "payload";
import { authenticated } from "../../access";

/** Append-only audit trail. Document downloads and access events land here. */
export const AuditLog: CollectionConfig = {
  slug: "audit-log",
  labels: { singular: "Audit Entry", plural: "Audit Log" },
  admin: {
    useAsTitle: "action",
    group: "Portal",
    defaultColumns: ["action", "actorEmail", "targetType", "organisation", "createdAt"],
  },
  access: {
    read: authenticated,
    create: authenticated,
    // Audit entries are immutable.
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: "organisation", type: "relationship", relationTo: "organisations", required: true, index: true },
    { name: "actorEmail", type: "email", required: true },
    { name: "action", type: "text", required: true, admin: { description: "e.g. document.download" } },
    { name: "targetType", type: "text" },
    { name: "targetId", type: "text" },
    { name: "ip", type: "text" },
  ],
};
