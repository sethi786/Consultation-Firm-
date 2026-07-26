import "server-only";
import type { ContactInput } from "./contact-schema";
import type { MeetingInput } from "./meeting-schema";
import { SERVICE_LIST } from "@/content/services";

const FROM_DEFAULT = "Cairn Security <no-reply@cairnsecurity.com>";
const TO_DEFAULT = "assessments@cairnsecurity.com";

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
 * server-only and never shipped to the client. Returns `true` only when an
 * email was actually sent; returns `false` when Resend isn't configured, so the
 * caller can tell a real notification apart from a silent no-op and never report
 * success for a lead that was neither stored nor sent.
 */
export async function deliverContact(
  input: ContactInput,
  meta: { ip: string; receivedAt: string },
): Promise<boolean> {
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
    return false;
  }

  await send({ from, to, replyTo: input.email, subject, text });
  return true;
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
    "— Cairn Security",
  ].join("\n");

  await send({
    from,
    to: input.email,
    replyTo,
    subject: "Assessment requested — we'll be in touch",
    text,
  });
}

/**
 * Notify Cairn of a client's call request and confirm to the client. Called
 * from the portal booking action. No-op until Resend is configured, so the
 * on-screen confirmation still works locally without a key.
 */
export async function notifyCallBooking(booking: {
  orgName: string;
  requestedByEmail: string;
  purposeLabel: string;
  whenISO: string;
  durationMins: string;
  notes?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("[booking] RESEND_API_KEY not set — logging instead of sending.", {
      org: booking.orgName,
      when: booking.whenISO,
    });
    return;
  }
  const from = process.env.CONTACT_FROM ?? FROM_DEFAULT;
  const firmTo = process.env.CONTACT_TO ?? TO_DEFAULT;
  const when = new Date(booking.whenISO).toUTCString();

  const firmText = [
    `New call request from ${booking.orgName}.`,
    "",
    `Purpose:   ${booking.purposeLabel}`,
    `Requested: ${when}`,
    `Duration:  ${booking.durationMins} minutes`,
    `Contact:   ${booking.requestedByEmail}`,
    booking.notes ? `\nNotes:\n${booking.notes}` : "",
    "",
    "Confirm it and add a meeting link in /admin → Call bookings.",
  ].join("\n");

  await send({
    from,
    to: firmTo,
    replyTo: booking.requestedByEmail,
    subject: `Call request — ${oneLine(booking.orgName)} (${oneLine(booking.purposeLabel)})`,
    text: firmText,
  });

  const clientText = [
    "Thanks — your call request is in.",
    "",
    `Purpose:   ${booking.purposeLabel}`,
    `Requested: ${when}`,
    `Duration:  ${booking.durationMins} minutes`,
    "",
    "A consultant will confirm the time and send a meeting link shortly. You can",
    "see the status any time in your portal under Calls.",
    "",
    "— Cairn Security",
  ].join("\n");

  await send({
    from,
    to: booking.requestedByEmail,
    replyTo: firmTo,
    subject: "Call requested — we'll confirm shortly",
    text: clientText,
  });
}

/**
 * Notify the firm of a public "book a meeting" request and confirm to the
 * prospect. Returns `true` only when email was actually sent (mirrors
 * deliverContact); `false` when Resend isn't configured, so the caller never
 * reports success for a lead that was neither stored nor sent.
 */
export async function notifyMeetingRequest(input: MeetingInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("[meeting] RESEND_API_KEY not set — logging instead of sending.", {
      company: input.company,
      when: input.preferredSlot,
    });
    return false;
  }
  const from = process.env.CONTACT_FROM ?? FROM_DEFAULT;
  const firmTo = process.env.CONTACT_TO ?? TO_DEFAULT;
  const service = serviceLabel(input.service);
  const when = new Date(input.preferredSlot).toUTCString();

  await send({
    from,
    to: firmTo,
    replyTo: input.email,
    subject: `Meeting request — ${oneLine(input.company)} (${oneLine(service)})`,
    text: [
      `New meeting request from ${input.name} at ${input.company}.`,
      "",
      `About:     ${service}`,
      `Requested: ${when}`,
      `Duration:  ${input.durationMins} minutes`,
      `Email:     ${input.email}`,
      input.notes ? `\nNotes:\n${input.notes}` : "",
      "",
      "Confirm the time and send an invite from /admin → Assessment requests.",
    ].join("\n"),
  });

  await send({
    from,
    to: input.email,
    replyTo: firmTo,
    subject: "Meeting requested — we'll confirm shortly",
    text: [
      `Hi ${input.name.split(" ")[0] || input.name},`,
      "",
      `Thanks — your meeting request about ${service} is in. A consultant will`,
      "confirm the exact time and send a calendar invite within one business day.",
      "",
      `Requested: ${when} · ${input.durationMins} minutes`,
      "",
      "— Cairn Security",
    ].join("\n"),
  });

  return true;
}
