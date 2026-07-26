import { z } from "zod";
import { CONTACT_SERVICE_VALUES } from "./contact-schema";

export const MEETING_DURATIONS = ["30", "45", "60"] as const;

/**
 * Public "book a meeting" schema. Validated on the server regardless of the UI.
 * `preferredSlot` must be a future ISO timestamp; notes are optional.
 */
export const meetingSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid work email.").max(200),
  company: z.string().trim().min(2, "Enter your organisation.").max(160),
  service: z.enum(CONTACT_SERVICE_VALUES, { message: "Choose what it's about." }),
  preferredSlot: z
    .string()
    .datetime({ message: "Pick a time slot." })
    .refine((s) => new Date(s).getTime() > Date.now(), { message: "Choose a slot in the future." }),
  durationMins: z.enum(MEETING_DURATIONS).default("30"),
  notes: z.string().trim().max(2000, "That note is too long.").optional().or(z.literal("")),
});

export type MeetingInput = z.infer<typeof meetingSchema>;
