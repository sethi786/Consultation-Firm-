import type { CollectionConfig } from "payload";
import { publishedOrAuthenticated, authenticated } from "../access";
import { slugField, seoField } from "../fields/slug";
import { SERVICE_SLUGS } from "../../content/services";

/**
 * Outcome-led case studies. Metrics are STRUCTURED (label / before / after /
 * timeframe), not a freeform body, so cards stay consistent and comparable
 * (BUILDPLAN Phase 4). No number ships without the client's written approval —
 * `clientApproved` gates publication in the editor's mind, not just the DB.
 */
export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  labels: { singular: "Case Study", plural: "Case Studies" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "clientDescriptor", "_status"],
    group: "Content",
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: { drafts: { autosave: false, schedulePublish: true }, maxPerDoc: 20 },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    {
      name: "clientDescriptor",
      type: "text",
      required: true,
      admin: { description: 'Anonymised is fine, e.g. "a 900-seat Ontario credit union".' },
    },
    {
      name: "service",
      type: "select",
      options: SERVICE_SLUGS.map((s) => ({ label: s, value: s })),
    },
    { name: "summary", type: "textarea", required: true },
    {
      name: "outcomes",
      type: "array",
      minRows: 1,
      maxRows: 4,
      admin: { description: "The numbers. Each needs written client approval." },
      fields: [
        { name: "metricLabel", type: "text", required: true },
        { name: "before", type: "text", required: true },
        { name: "after", type: "text", required: true },
        { name: "timeframe", type: "text", required: true },
      ],
    },
    { name: "content", type: "richText" },
    {
      name: "clientApproved",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "The client has approved every number in writing.",
      },
    },
    seoField,
  ],
};
