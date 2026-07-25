import type { CollectionConfig } from "payload";
import { authenticated } from "../../access";

/** Reports, attestations, runbooks. Every download is written to the AuditLog. */
export const PortalDocuments: CollectionConfig = {
  slug: "portal-documents",
  labels: { singular: "Document", plural: "Documents" },
  admin: {
    useAsTitle: "title",
    group: "Portal",
    defaultColumns: ["title", "type", "version", "organisation"],
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "organisation", type: "relationship", relationTo: "organisations", required: true, index: true },
    { name: "engagement", type: "relationship", relationTo: "engagements", index: true },
    { name: "title", type: "text", required: true },
    {
      name: "type",
      type: "select",
      defaultValue: "report",
      options: [
        { label: "Report", value: "report" },
        { label: "Attestation", value: "attestation" },
        { label: "Runbook", value: "runbook" },
      ],
    },
    { name: "version", type: "text", defaultValue: "1.0" },
    { name: "file", type: "upload", relationTo: "media" },
  ],
};
