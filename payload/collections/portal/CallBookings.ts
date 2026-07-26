import type { CollectionConfig } from "payload";
import { authenticated } from "../../access";

/**
 * Client-requested calls. A portal user proposes a slot and purpose; the request
 * lands here (status "requested"). Waypoint confirms and adds the meeting link.
 * Tenancy is enforced in lib/portal/data.ts — every query binds the caller's org.
 */
export const CallBookings: CollectionConfig = {
  slug: "call-bookings",
  labels: { singular: "Call booking", plural: "Call bookings" },
  admin: {
    useAsTitle: "purpose",
    group: "Portal",
    defaultColumns: ["purpose", "organisation", "preferredSlot", "status"],
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
    {
      name: "purpose",
      type: "select",
      required: true,
      options: [
        { label: "Kick-off / scoping", value: "kickoff" },
        { label: "Findings review", value: "review" },
        { label: "Incident / urgent", value: "incident" },
        { label: "General discussion", value: "general" },
      ],
    },
    { name: "preferredSlot", type: "date", required: true, admin: { date: { pickerAppearance: "dayAndTime" } } },
    {
      name: "durationMins",
      type: "select",
      defaultValue: "30",
      options: [
        { label: "30 minutes", value: "30" },
        { label: "45 minutes", value: "45" },
        { label: "60 minutes", value: "60" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "requested",
      options: [
        { label: "Requested", value: "requested" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Completed", value: "completed" },
      ],
    },
    { name: "requestedByEmail", type: "email", admin: { readOnly: true } },
    { name: "requestedByName", type: "text", admin: { readOnly: true } },
    { name: "notes", type: "textarea" },
    { name: "meetingLink", type: "text", admin: { description: "Added by Waypoint on confirmation." } },
  ],
  timestamps: true,
};
