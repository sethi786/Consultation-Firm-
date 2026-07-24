import "server-only";
import type { ContactInput } from "./contact-schema";

/**
 * Contact delivery via Resend (§2, §8). The API key is server-only and never
 * shipped to the client. If it isn't configured (local dev, previews), we log
 * and succeed rather than throwing — the form still works, nothing is leaked.
 */
export async function deliverContact(
  input: ContactInput,
  meta: { ip: string; receivedAt: string },
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? "assessments@northport.security";
  const from = process.env.CONTACT_FROM ?? "Northport Security <no-reply@northport.security>";

  // Strip CR/LF from anything used in the subject line (NPT-W05).
  const safe = (v: string) => v.replace(/[\r\n]+/g, " ").trim();
  const subject = `Assessment request — ${safe(input.company)} (${safe(input.service)})`;
  const text = [
    `Name:     ${input.name}`,
    `Email:    ${input.email}`,
    `Company:  ${input.company}`,
    `Service:  ${input.service}`,
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

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject,
    text,
  });
  if (error) {
    throw new Error(`Resend delivery failed: ${error.message}`);
  }
}
