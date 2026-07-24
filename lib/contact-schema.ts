import { z } from "zod";
import { SERVICE_SLUGS } from "@/content/services";

/** Allowed values for the service dropdown: the six slugs plus "not sure". */
export const CONTACT_SERVICE_VALUES = [...SERVICE_SLUGS, "not-sure"] as const;

/**
 * Contact form schema (§8). Validated on the server regardless of client
 * validation. Kept deliberately tight — no reflected HTML, bounded lengths.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(120, "That name is too long."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid work email.")
    .max(200, "That email is too long."),
  company: z
    .string()
    .trim()
    .min(2, "Enter your organisation.")
    .max(160, "That organisation name is too long."),
  service: z.enum(CONTACT_SERVICE_VALUES, {
    message: "Choose a service.",
  }),
  seats: z
    .string()
    .trim()
    .max(20)
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a sentence or two about what prompted this.")
    .max(4000, "That message is too long — please trim it."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: ContactFieldErrors; values?: Record<string, string> }
  | { status: "success"; message: string };
