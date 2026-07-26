"use client";

import { useActionState } from "react";
import { cn } from "@/lib/cn";
import { cancelBookingAction, type CancelState } from "@/app/(portal)/portal/(authed)/schedule/actions";
import { PURPOSE_LABEL } from "@/lib/portal/booking-schema";

export interface BookingView {
  id: number;
  purpose: string;
  preferredSlot: string;
  durationMins: string;
  status: string;
  meetingLink?: string | null;
}

const STATUS_CLASS: Record<string, string> = {
  requested: "text-portal-brass",
  confirmed: "text-[var(--color-status-remediated)]",
  cancelled: "text-portal-ink-2",
  completed: "text-portal-ink-2",
};

function LocalTime({ iso }: { iso: string }) {
  const d = new Date(iso);
  return (
    <span>
      {d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
      {" · "}
      {d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
    </span>
  );
}

function CancelForm({ id }: { id: number }) {
  const [, action, pending] = useActionState<CancelState, FormData>(cancelBookingAction, {});
  return (
    <form action={action}>
      <input type="hidden" name="bookingId" value={id} />
      <button
        type="submit"
        disabled={pending}
        className="font-mono text-mono-xs uppercase text-portal-ink-2 underline decoration-portal-line underline-offset-2 hover:text-portal-ink disabled:opacity-50"
      >
        {pending ? "Cancelling…" : "Cancel"}
      </button>
    </form>
  );
}

export function BookingsList({ bookings }: { bookings: BookingView[] }) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-lg border border-portal-line bg-portal-panel p-6">
        <p className="text-body text-portal-ink">No calls booked yet.</p>
        <p className="mt-1 text-small text-portal-ink-2">Request one below and we&apos;ll confirm the time.</p>
      </div>
    );
  }
  return (
    <ul className="flex flex-col gap-2">
      {bookings.map((b) => {
        const cancellable = b.status === "requested" || b.status === "confirmed";
        return (
          <li
            key={b.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-portal-line bg-portal-panel px-4 py-3"
          >
            <div className="min-w-0">
              <p className="text-body text-portal-ink">
                {PURPOSE_LABEL[b.purpose as keyof typeof PURPOSE_LABEL] ?? b.purpose}
              </p>
              <p className="font-mono text-mono-xs uppercase text-portal-ink-2">
                <LocalTime iso={b.preferredSlot} /> · {b.durationMins} min
              </p>
            </div>
            <div className="flex items-center gap-4">
              {b.status === "confirmed" && b.meetingLink && (
                <a
                  href={b.meetingLink}
                  className="font-mono text-mono-xs uppercase text-portal-brass underline underline-offset-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  Join →
                </a>
              )}
              <span className={cn("font-mono text-mono-xs uppercase", STATUS_CLASS[b.status] ?? "text-portal-ink-2")}>
                {b.status}
              </span>
              {cancellable && <CancelForm id={b.id} />}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
