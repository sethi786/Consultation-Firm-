import type { CollectionConfig } from "payload";
import { authenticated } from "../../access";
import { SERVICE_SLUGS } from "../../../content/services";

export const Engagements: CollectionConfig = {
  slug: "engagements",
  admin: { useAsTitle: "name", group: "Portal", defaultColumns: ["name", "organisation", "status"] },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "organisation", type: "relationship", relationTo: "organisations", required: true, index: true },
    { name: "name", type: "text", required: true },
    {
      name: "service",
      type: "select",
      options: SERVICE_SLUGS.map((s) => ({ label: s, value: s })),
    },
    {
      name: "status",
      type: "select",
      defaultValue: "active",
      options: [
        { label: "Scoping", value: "scoping" },
        { label: "Active", value: "active" },
        { label: "Reporting", value: "reporting" },
        { label: "Closed", value: "closed" },
      ],
    },
    { name: "startDate", type: "date" },
    {
      name: "phases",
      type: "array",
      admin: { description: "Scope → Assess → Report → Remediate → Verify" },
      fields: [
        { name: "name", type: "text", required: true },
        {
          name: "status",
          type: "select",
          defaultValue: "upcoming",
          options: [
            { label: "Upcoming", value: "upcoming" },
            { label: "In progress", value: "in_progress" },
            { label: "Done", value: "done" },
          ],
        },
        { name: "date", type: "date" },
      ],
    },
  ],
};
