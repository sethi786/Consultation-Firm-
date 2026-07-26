"use server";

import { headers } from "next/headers";
import { contactSchema, type ContactState } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";
import { deliverContact, sendAssessmentConfirmation } from "@/lib/mailer";
import { persistAssessmentRequest } from "@/lib/leads";

async function requestMeta(): Promise<{ ip: string; userAgent: string }> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  const ip = fwd ? fwd.split(",")[0]!.trim() : (h.get("x-real-ip") ?? "unknown");
  return { ip, userAgent: h.get("user-agent") ?? "unknown" };
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: a hidden field real users never fill. Bots do. Pretend success.
  if (((formData.get("website") as string) ?? "").length > 0) {
    return { status: "success", message: "Assessment requested." };
  }

  const { ip, userAgent } = await requestMeta();
  const limit = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return {
      status: "error",
      message: "Too many requests. Wait a minute and try again.",
    };
  }

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    service: formData.get("service"),
    seats: formData.get("seats"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    // Echo back only known string values so the user doesn't retype everything.
    const values: Record<string, string> = {};
    for (const [k, v] of Object.entries(raw)) {
      if (typeof v === "string") values[k] = v;
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  const receivedAt = new Date().toISOString();

  // Capture the lead durably and notify the firm. Both are best-effort and
  // independent: as long as one of them succeeds, the buyer's request is not
  // lost, so the form reports success. Only a total failure of both is an error.
  let persisted = false;
  let notified = false;

  try {
    await persistAssessmentRequest(parsed.data, { ip, userAgent, receivedAt });
    persisted = true;
  } catch (err) {
    console.error("[contact] persist failed:", err);
  }

  try {
    await deliverContact(parsed.data, { ip, receivedAt });
    notified = true;
  } catch (err) {
    console.error("[contact] notify failed:", err);
  }

  if (!persisted && !notified) {
    return {
      status: "error",
      message: "Something went wrong sending your request. Please email assessments@northport.security directly.",
    };
  }

  // Confirmation to the submitter — never blocks success if it fails.
  try {
    await sendAssessmentConfirmation(parsed.data);
  } catch (err) {
    console.error("[contact] confirmation failed:", err);
  }

  return { status: "success", message: "Assessment requested." };
}
