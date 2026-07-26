import { z } from "zod";

export const BOOKING_PURPOSES = ["kickoff", "review", "incident", "general"] as const;
export const BOOKING_DURATIONS = ["30", "45", "60"] as const;

export const PURPOSE_LABEL: Record<(typeof BOOKING_PURPOSES)[number], string> = {
  kickoff: "Kick-off / scoping",
  review: "Findings review",
  incident: "Incident / urgent",
  general: "General discussion",
};

/**
 * Client-side and server-side booking validation. `preferredSlot` must be a
 * valid ISO timestamp in the future — checked on the server regardless of the UI.
 */
export const bookingSchema = z.object({
  purpose: z.enum(BOOKING_PURPOSES, { message: "Choose what the call is about." }),
  preferredSlot: z
    .string()
    .datetime({ message: "Pick a time slot." })
    .refine((s) => new Date(s).getTime() > Date.now(), {
      message: "Choose a slot in the future.",
    }),
  durationMins: z.enum(BOOKING_DURATIONS).default("30"),
  notes: z.string().trim().max(2000, "That note is too long.").optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;
