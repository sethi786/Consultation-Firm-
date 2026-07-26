import "server-only";
import type { ContactInput } from "./contact-schema";
import { SERVICE_LIST } from "@/content/services";

const FROM_DEFAULT = "Northport Security <no-reply@northport.security>";
const TO_DEFAULT = "assessments@northport.security";

/** Human-readable service name for emails; slugs are never shown to a buyer. */
function serviceLabel(value: string): string {
  if (value === "not-sure") return "Not sure yet";
  return SERVICE_LIST.find((s) => s.slug === value)?.name ?? value;
}

/** Strip CR/LF from anything interpolated into a header (subject) — NPT-W05. */
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

async function send(opts: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}): Promise<void> {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const { error } = await resend.emails.send(opts);
  if (error) {
    throw new Error(`Resend delivery failed: ${error.message}`);
  }
}

/**
 * Notify the firm of a new assessment request (§2, §8). The API key is
 * server-only and never shipped to the client. If it isn't configured (local
 * dev, previews), we log and succeed rather than throwing — the form still
 * works and the lead is still persisted; nothing is leaked.
 */
export async function deliverContact(
  input: ContactInput,
  meta: { ip: string; receivedAt: string },
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? TO_DEFAULT;
  const from = process.env.CONTACT_FROM ?? FROM_DEFAULT;
  const service = serviceLabel(input.service);

  const subject = `Assessment request — ${oneLine(input.company)} (${oneLine(service)})`;
  const text = [
    `Name:     ${input.name}`,
    `Email:    ${input.email}`,
    `Company:  ${input.company}`,
    `Service:  ${service}`,
    `Seats:    ${input.seats || "—"}`,
    "",
    input.message,
    "",
    `— received ${meta.receivedAt} from ${meta.ip}`,
  ].join("\n");

  if (!apiKey) {
    console.info("[contact] RESEND_API_KEY not set — logging instead of sending.", {
      to,
      subject,
    });
    return;
  }

  await send({ from, to, replyTo: input.email, subject, text });
}

/**
 * Confirmation (autoresponder) to the person who submitted. Keeps the form's
 * promise from §5: the request produces a message saying "Assessment
 * requested." No-op when Resend isn't configured — the on-screen confirmation
 * still shows, we simply don't email until a key is set.
 */
export async function sendAssessmentConfirmation(input: ContactInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const from = process.env.CONTACT_FROM ?? FROM_DEFAULT;
  const replyTo = process.env.CONTACT_TO ?? TO_DEFAULT;
  const service = serviceLabel(input.service);

  const text = [
    `Hi ${input.name.split(" ")[0] || input.name},`,
    "",
    `Thanks — your assessment request for ${service} is in. A consultant will`,
    "reply within one business day to scope timing and access. If it's urgent,",
    `just reply to this email and it reaches the team directly.`,
    "",
    "What happens next:",
    "  1. We confirm scope and the systems in play.",
    "  2. You get a fixed-fee proposal — no open-ended retainers to book an assessment.",
    "  3. We schedule and run it, and hand you a findings register with evidence.",
    "",
    "— Northport Security",
  ].join("\n");

  await send({
    from,
    to: input.email,
    replyTo,
    subject: "Assessment requested — we'll be in touch",
    text,
  });
}
