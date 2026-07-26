import type { CollectionConfig } from "payload";
import { authenticated } from "../../access";

/**
 * Assessment findings. Clients can comment and request remediation, but a
 * client-set "remediated" only moves status to `pending_verification` — Waypoint
 * verifies before `closed` (CLAUDE.md §7).
 */
export const Findings: CollectionConfig = {
  slug: "findings",
  admin: {
    useAsTitle: "title",
    group: "Portal",
    defaultColumns: ["ref", "title", "severity", "status", "organisation"],
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
    { name: "ref", type: "text", required: true, admin: { description: "e.g. NPT-014" } },
    { name: "title", type: "text", required: true },
    {
      name: "severity",
      type: "select",
      required: true,
      options: [
        { label: "Critical", value: "critical" },
        { label: "High", value: "high" },
        { label: "Medium", value: "medium" },
        { label: "Low", value: "low" },
        { label: "Info", value: "info" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "open",
      options: [
        { label: "Open", value: "open" },
        { label: "In progress", value: "in_progress" },
        { label: "Pending verification", value: "pending_verification" },
        { label: "Remediated", value: "remediated" },
        { label: "Closed", value: "closed" },
      ],
    },
    { name: "affectedAsset", type: "text" },
    { name: "owner", type: "text" },
    { name: "dueDate", type: "date" },
    { name: "description", type: "textarea" },
    {
      name: "comments",
      type: "array",
      fields: [
        { name: "authorEmail", type: "email" },
        { name: "body", type: "textarea", required: true },
        { name: "createdAt", type: "date" },
      ],
    },
  ],
};
