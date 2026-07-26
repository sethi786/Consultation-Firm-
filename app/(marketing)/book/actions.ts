"use server";

import { headers } from "next/headers";
import { meetingSchema } from "@/lib/meeting-schema";
import { rateLimit } from "@/lib/rate-limit";
import { persistAssessmentRequest } from "@/lib/leads";
import { notifyMeetingRequest } from "@/lib/mailer";

export type BookState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; message: string };

async function requestMeta(): Promise<{ ip: string; userAgent: string }> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  const ip = fwd ? fwd.split(",")[0]!.trim() : (h.get("x-real-ip") ?? "unknown");
  return { ip, userAgent: h.get("user-agent") ?? "unknown" };
}

export async function bookMeetingAction(
  _prev: BookState,
  formData: FormData,
): Promise<BookState> {
  // Honeypot — a hidden field only bots fill. Pretend success.
  if (((formData.get("website") as string) ?? "").length > 0) {
    return { status: "success", message: "Meeting requested." };
  }

  const { ip, userAgent } = await requestMeta();
  const limit = rateLimit(`book:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return { status: "error", message: "Too many requests. Wait a minute and try again." };
  }

  const parsed = meetingSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    service: formData.get("service"),
    preferredSlot: formData.get("preferredSlot"),
    durationMins: formData.get("durationMins") ?? "30",
    notes: formData.get("notes") ?? "",
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  const receivedAt = new Date().toISOString();

  // Capture the lead durably; notify best-effort. Success if the lead is stored
  // or the email goes out — a down DB or unset key never loses a prospect.
  let persisted = false;
  let notified = false;
  try {
    await persistAssessmentRequest(
      { ...parsed.data, message: parsed.data.notes || "Meeting request (no notes)." },
      { ip, userAgent, receivedAt, source: "meeting-request", preferredSlot: parsed.data.preferredSlot, durationMins: parsed.data.durationMins },
    );
    persisted = true;
  } catch (err) {
    console.error("[meeting] persist failed:", err);
  }
  try {
    await notifyMeetingRequest(parsed.data);
    notified = true;
  } catch (err) {
    console.error("[meeting] notify failed:", err);
  }

  if (!persisted && !notified) {
    return {
      status: "error",
      message: "Something went wrong. Please email assessments@northport.security directly.",
    };
  }

  return { status: "success", message: "Meeting requested. We'll confirm the time and send an invite." };
}
