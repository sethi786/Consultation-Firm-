"use server";

import { headers } from "next/headers";
import { contactSchema, type ContactState } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";
import { deliverContact } from "@/lib/mailer";

async function clientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: a hidden field real users never fill. Bots do. Pretend success.
  if (((formData.get("website") as string) ?? "").length > 0) {
    return { status: "success", message: "Assessment requested." };
  }

  const ip = await clientIp();
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

  try {
    await deliverContact(parsed.data, {
      ip,
      receivedAt: new Date().toISOString(),
    });
  } catch {
    // Don't leak internals; the error is logged server-side by the mailer.
    return {
      status: "error",
      message: "Something went wrong sending your request. Please email us directly.",
    };
  }

  return { status: "success", message: "Assessment requested." };
}
