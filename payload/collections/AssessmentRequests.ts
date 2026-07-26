import type { CollectionConfig } from "payload";
import { authenticated } from "../access";
import { SERVICE_LIST } from "../../content/services";

/**
 * Assessment requests — every submission of the "Book an assessment" form is
 * persisted here so a lead is never lost, even if email delivery is down or
 * Resend isn't configured. This is PII: only authenticated staff can read it,
 * and the public form writes via the Local API (overrideAccess), never through
 * the REST/GraphQL create endpoint.
 */

const SERVICE_OPTIONS = [
  ...SERVICE_LIST.map((s) => ({ label: s.name, value: s.slug })),
  { label: "Not sure yet", value: "not-sure" },
];

export const AssessmentRequests: CollectionConfig = {
  slug: "assessment-requests",
  labels: { singular: "Assessment request", plural: "Assessment requests" },
  admin: {
    useAsTitle: "company",
    defaultColumns: ["company", "name", "service", "status", "createdAt"],
    group: "Leads",
  },
  access: {
    // No public create: the form writes server-side with overrideAccess.
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "50%" } },
        { name: "email", type: "email", required: true, admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "company", type: "text", required: true, admin: { width: "50%" } },
        {
          name: "service",
          type: "select",
          required: true,
          options: SERVICE_OPTIONS,
          admin: { width: "50%" },
        },
      ],
    },
    { name: "seats", type: "text", label: "Approx. seats", admin: { width: "50%" } },
    { name: "message", type: "textarea", required: true },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Qualified", value: "qualified" },
        { label: "Won", value: "won" },
        { label: "Archived", value: "archived" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "meta",
      type: "group",
      admin: { position: "sidebar" },
      fields: [
        { name: "ip", type: "text", admin: { readOnly: true } },
        { name: "userAgent", type: "text", admin: { readOnly: true } },
        { name: "receivedAt", type: "date", admin: { readOnly: true } },
      ],
    },
  ],
  timestamps: true,
};
