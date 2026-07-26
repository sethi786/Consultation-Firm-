"use server";

import { revalidatePath } from "next/cache";
import { requirePortalContext } from "@/lib/portal/session";
import { createBooking, cancelBooking } from "@/lib/portal/data";
import { bookingSchema, PURPOSE_LABEL } from "@/lib/portal/booking-schema";
import { notifyCallBooking } from "@/lib/mailer";

export type BookingState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; message: string };

export async function bookCallAction(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const ctx = await requirePortalContext();

  const parsed = bookingSchema.safeParse({
    purpose: formData.get("purpose"),
    preferredSlot: formData.get("preferredSlot"),
    durationMins: formData.get("durationMins") ?? "30",
    notes: formData.get("notes") ?? "",
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  try {
    await createBooking(ctx, parsed.data);
  } catch (e) {
    return { status: "error", message: e instanceof Error ? e.message : "Could not request the call." };
  }

  // Email is best-effort — the booking is already stored and shown regardless.
  try {
    await notifyCallBooking({
      orgName: ctx.orgName,
      requestedByEmail: ctx.email,
      purposeLabel: PURPOSE_LABEL[parsed.data.purpose],
      whenISO: parsed.data.preferredSlot,
      durationMins: parsed.data.durationMins,
      notes: parsed.data.notes || undefined,
    });
  } catch (e) {
    console.error("[booking] notify failed:", e);
  }

  revalidatePath("/portal/schedule");
  revalidatePath("/portal");
  return { status: "success", message: "Call requested. We'll confirm the time and send a link." };
}

export type CancelState = { error?: string; ok?: boolean };

export async function cancelBookingAction(
  _prev: CancelState,
  formData: FormData,
): Promise<CancelState> {
  const ctx = await requirePortalContext();
  const id = String(formData.get("bookingId") ?? "");
  try {
    await cancelBooking(ctx, id);
    revalidatePath("/portal/schedule");
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not cancel." };
  }
}
