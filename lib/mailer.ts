import "server-only";
import type { ContactInput } from "./contact-schema";
import type { MeetingInput } from "./meeting-schema";
import { SERVICE_LIST } from "@/content/services";

const FROM_DEFAULT = "Waypoint <no-reply@waypointsec.com>";
const TO_DEFAULT = "assessments@waypointsec.com";

/** Human-readable service name for emails; slugs are never shown to a buyer. */
function serviceLabel(value: string): string {
  if (value === "not-sure") return "Not sure yet";
  return SERVICE_LIST.find((s) => s.slug === value)?.name ?? value;
}

/** Strip CR/LF from anything interpolated into a header (subject) — NPT-W05. */
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

// ── Attachments (calendar invites) ───────────────────────────────────────
interface Attachment {
  filename: string;
  content: string; // base64
  contentType?: string;
}

async function send(opts: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: Attachment[];
}): Promise<void> {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const { error } = await resend.emails.send(opts);
  if (error) {
    throw new Error(`Resend delivery failed: ${error.message}`);
  }
}

// ── Branded HTML shell (email-client-safe: inline styles, table layout) ───
const C = { ink: "#12181a", pine: "#1b3a31", slate: "#5a6b66", rule: "#dde0da", paper: "#f4f5f2" };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** A clean definition table for lead/booking details. */
function detailTable(rows: [string, string][]): string {
  const trs = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;font-family:monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:${C.slate};vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td><td style="padding:6px 0;font-size:15px;color:${C.ink};">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid ${C.rule};border-bottom:1px solid ${C.rule};margin:8px 0 4px;">${trs}</table>`;
}

function emailShell(opts: {
  heading: string;
  body: string; // pre-rendered inner HTML
  cta?: { label: string; href: string };
}): string {
  const { heading, body, cta } = opts;
  const ctaHtml = cta
    ? `<div style="margin-top:24px;"><a href="${cta.href}" style="display:inline-block;background:${C.pine};color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:15px;">${escapeHtml(cta.label)}</a></div>`
    : "";
  return `<!doctype html><html><body style="margin:0;background:${C.paper};padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${C.ink};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid ${C.rule};border-radius:16px;overflow:hidden;">
<tr><td style="padding:22px 32px;border-bottom:1px solid ${C.rule};">
<span style="font-family:Georgia,'Times New Roman',serif;font-size:20px;color:${C.ink};">Waypoint</span>
<span style="font-family:monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${C.slate};margin-left:8px;">Security consulting</span>
</td></tr>
<tr><td style="padding:32px;">
<h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:23px;font-weight:500;line-height:1.25;color:${C.ink};">${escapeHtml(heading)}</h1>
${body}
${ctaHtml}
</td></tr>
<tr><td style="padding:18px 32px;border-top:1px solid ${C.rule};font-family:monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:${C.slate};">
Waypoint · Evidence-led security · waypointsec.com
</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function p(text: string): string {
  return `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${C.slate};">${text}</p>`;
}

// ── Calendar invite (.ics) ────────────────────────────────────────────────
function icsEscape(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}
function toIcsUtc(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}
function buildMeetingIcs(opts: {
  start: Date;
  durationMins: number;
  summary: string;
  description: string;
  organizerEmail: string;
  attendeeEmail: string;
}): string {
  const end = new Date(opts.start.getTime() + opts.durationMins * 60000);
  const uid = `${opts.start.getTime()}-${opts.attendeeEmail}@waypointsec.com`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Waypoint//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(opts.start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:${icsEscape(opts.summary)}`,
    `DESCRIPTION:${icsEscape(opts.description)}`,
    `ORGANIZER;CN=Waypoint:mailto:${opts.organizerEmail}`,
    `ATTENDEE;CN=${icsEscape(opts.attendeeEmail)};RSVP=TRUE:mailto:${opts.attendeeEmail}`,
    "STATUS:TENTATIVE",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
function icsAttachment(ics: string): Attachment {
  return {
    filename: "waypoint-meeting.ics",
    content: Buffer.from(ics, "utf8").toString("base64"),
    contentType: "text/calendar",
  };
}

/** Readable UTC time for the email body (the .ics carries the exact instant). */
function prettyWhen(iso: string): string {
  const d = new Date(iso);
  return (
    d.toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short", timeZone: "UTC" }) + " (UTC)"
  );
}

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://waypointsec.com";

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
    `New assessment request.`,
    "",
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

  const html = emailShell({
    heading: "New assessment request",
    body:
      detailTable([
        ["Name", input.name],
        ["Email", input.email],
        ["Company", input.company],
        ["Service", service],
        ["Seats", input.seats || "—"],
      ]) +
      p(`<strong style="color:${C.ink};">Message</strong><br>${escapeHtml(input.message).replace(/\n/g, "<br>")}`) +
      p(`<span style="font-family:monospace;font-size:11px;text-transform:uppercase;color:${C.slate};">Received ${escapeHtml(meta.receivedAt)} · ${escapeHtml(meta.ip)}</span>`),
    cta: { label: "Reply to the requester", href: `mailto:${input.email}` },
  });

  if (!apiKey) {
    console.info("[contact] RESEND_API_KEY not set — logging instead of sending.", { to, subject });
    return false;
  }
  await send({ from, to, replyTo: input.email, subject, text, html });
  return true;
}

/**
 * Confirmation (autoresponder) to the person who submitted the assessment form.
 * No-op when Resend isn't configured.
 */
export async function sendAssessmentConfirmation(input: ContactInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const from = process.env.CONTACT_FROM ?? FROM_DEFAULT;
  const replyTo = process.env.CONTACT_TO ?? TO_DEFAULT;
  const service = serviceLabel(input.service);
  const first = input.name.split(" ")[0] || input.name;

  const text = [
    `Hi ${first},`,
    "",
    `Thanks — your assessment request for ${service} is in. A consultant will reply`,
    "within one business day to scope timing and access. If it's urgent, just reply",
    "to this email and it reaches the team directly.",
    "",
    "What happens next:",
    "  1. We confirm scope and the systems in play.",
    "  2. You get a fixed-fee proposal — no open-ended retainers.",
    "  3. We run it and hand you a findings register with evidence.",
    "",
    "— Waypoint",
  ].join("\n");

  const html = emailShell({
    heading: "Assessment requested — we'll be in touch",
    body:
      p(`Hi ${escapeHtml(first)},`) +
      p(`Thanks — your request for <strong style="color:${C.ink};">${escapeHtml(service)}</strong> is in. A consultant will reply within one business day to scope timing and access. If it's urgent, just reply to this email and it reaches the team directly.`) +
      p(`<strong style="color:${C.ink};">What happens next</strong>`) +
      `<ol style="margin:0 0 14px;padding-left:20px;font-size:15px;line-height:1.6;color:${C.slate};"><li>We confirm scope and the systems in play.</li><li>You get a fixed-fee proposal — no open-ended retainers.</li><li>We run it and hand you a findings register with evidence.</li></ol>`,
    cta: { label: "See a sample findings report", href: `${siteUrl()}/sample-report` },
  });

  await send({ from, to: input.email, replyTo, subject: "Assessment requested — we'll be in touch", text, html });
}

/**
 * Notify Waypoint of a client's portal call request and confirm to the client,
 * with a calendar invite for the requested slot. No-op until Resend is configured.
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
  const when = prettyWhen(booking.whenISO);
  const ics = buildMeetingIcs({
    start: new Date(booking.whenISO),
    durationMins: Number(booking.durationMins) || 30,
    summary: `Waypoint call — ${booking.purposeLabel}`,
    description: `Call with ${booking.orgName}. Purpose: ${booking.purposeLabel}. Requested via the client portal (pending confirmation).`,
    organizerEmail: firmTo,
    attendeeEmail: booking.requestedByEmail,
  });
  const attachments = [icsAttachment(ics)];

  await send({
    from,
    to: firmTo,
    replyTo: booking.requestedByEmail,
    subject: `Call request — ${oneLine(booking.orgName)} (${oneLine(booking.purposeLabel)})`,
    text: `New call request from ${booking.orgName}.\n\nPurpose:   ${booking.purposeLabel}\nRequested: ${when}\nDuration:  ${booking.durationMins} min\nContact:   ${booking.requestedByEmail}${booking.notes ? `\n\nNotes:\n${booking.notes}` : ""}\n\nConfirm it and add a meeting link in /admin → Call bookings.`,
    html: emailShell({
      heading: "New call request",
      body:
        detailTable([
          ["Organisation", booking.orgName],
          ["Purpose", booking.purposeLabel],
          ["Requested", when],
          ["Duration", `${booking.durationMins} min`],
          ["Contact", booking.requestedByEmail],
        ]) + (booking.notes ? p(`<strong style="color:${C.ink};">Notes</strong><br>${escapeHtml(booking.notes).replace(/\n/g, "<br>")}`) : ""),
    }),
    attachments,
  });

  await send({
    from,
    to: booking.requestedByEmail,
    replyTo: firmTo,
    subject: "Call requested — we'll confirm shortly",
    text: `Thanks — your call request is in.\n\nPurpose:   ${booking.purposeLabel}\nRequested: ${when}\nDuration:  ${booking.durationMins} min\n\nA consultant will confirm the time and send a meeting link shortly. The attached calendar file holds the slot.\n\n— Waypoint`,
    html: emailShell({
      heading: "Call requested — we'll confirm shortly",
      body:
        p("Thanks — your call request is in. A consultant will confirm the time and send a meeting link shortly. The attached calendar file holds the slot in the meantime.") +
        detailTable([
          ["Purpose", booking.purposeLabel],
          ["Requested", when],
          ["Duration", `${booking.durationMins} min`],
        ]),
    }),
    attachments,
  });
}

/**
 * Notify the firm of a public "book a meeting" request and confirm to the
 * prospect — both with a calendar invite (.ics) for the requested slot. Returns
 * `true` only when email was actually sent (mirrors deliverContact).
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
  const when = prettyWhen(input.preferredSlot);
  const first = input.name.split(" ")[0] || input.name;

  const ics = buildMeetingIcs({
    start: new Date(input.preferredSlot),
    durationMins: Number(input.durationMins) || 30,
    summary: `Waypoint meeting — ${service}`,
    description: `Meeting with ${input.name} (${input.company}) about ${service}. Requested via waypointsec.com (pending confirmation).`,
    organizerEmail: firmTo,
    attendeeEmail: input.email,
  });
  const attachments = [icsAttachment(ics)];

  // Notify the firm
  await send({
    from,
    to: firmTo,
    replyTo: input.email,
    subject: `Meeting request — ${oneLine(input.company)} (${oneLine(service)})`,
    text: `New meeting request from ${input.name} at ${input.company}.\n\nAbout:     ${service}\nRequested: ${when}\nDuration:  ${input.durationMins} min\nEmail:     ${input.email}${input.notes ? `\n\nNotes:\n${input.notes}` : ""}\n\nConfirm the time and send an invite from /admin → Assessment requests. A calendar file is attached.`,
    html: emailShell({
      heading: "New meeting request",
      body:
        detailTable([
          ["Name", input.name],
          ["Company", input.company],
          ["About", service],
          ["Requested", when],
          ["Duration", `${input.durationMins} min`],
          ["Email", input.email],
        ]) + (input.notes ? p(`<strong style="color:${C.ink};">Notes</strong><br>${escapeHtml(input.notes).replace(/\n/g, "<br>")}`) : ""),
      cta: { label: "Reply to the requester", href: `mailto:${input.email}` },
    }),
    attachments,
  });

  // Confirm to the prospect
  await send({
    from,
    to: input.email,
    replyTo: firmTo,
    subject: "Meeting requested — we'll confirm shortly",
    text: `Hi ${first},\n\nThanks — your meeting request about ${service} is in. A consultant will confirm the exact time and send a calendar invite within one business day.\n\nRequested: ${when} · ${input.durationMins} min\n\nThe attached calendar file holds the slot in the meantime.\n\n— Waypoint`,
    html: emailShell({
      heading: "Meeting requested — we'll confirm shortly",
      body:
        p(`Hi ${escapeHtml(first)},`) +
        p(`Thanks — your meeting request about <strong style="color:${C.ink};">${escapeHtml(service)}</strong> is in. A consultant will confirm the exact time and send a calendar invite within one business day. The attached calendar file holds the slot in the meantime.`) +
        detailTable([
          ["Requested", when],
          ["Duration", `${input.durationMins} min`],
        ]),
      cta: { label: "See a sample findings report", href: `${siteUrl()}/sample-report` },
    }),
    attachments,
  });

  return true;
}
