"use client";

import { useMemo, useState } from "react";
import { useActionState } from "react";
import { cn } from "@/lib/cn";
import { bookCallAction, type BookingState } from "@/app/(portal)/portal/(authed)/schedule/actions";
import {
  BOOKING_PURPOSES,
  BOOKING_DURATIONS,
  PURPOSE_LABEL,
} from "@/lib/portal/booking-schema";

/** Build selectable slots: next business days × a few times, in the viewer's TZ. */
function useSlots(): { dayLabel: string; slots: { iso: string; label: string }[] }[] {
  return useMemo(() => {
    const TIMES = [9, 11, 13, 15]; // local hours
    const days: { dayLabel: string; slots: { iso: string; label: string }[] }[] = [];
    const now = new Date();
    let cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let added = 0;
    while (added < 7) {
      cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000);
      const dow = cursor.getDay();
      if (dow === 0 || dow === 6) continue; // skip weekends
      const slots = TIMES.map((h) => {
        const d = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate(), h, 0, 0, 0);
        return {
          iso: d.toISOString(),
          label: d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
        };
      });
      days.push({
        dayLabel: cursor.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }),
        slots,
      });
      added++;
    }
    return days;
  }, []);
}

const initial: BookingState = { status: "idle" };

export function BookCallForm() {
  const days = useSlots();
  const [selected, setSelected] = useState<string | null>(null);
  const [purpose, setPurpose] = useState<(typeof BOOKING_PURPOSES)[number]>("kickoff");
  const [duration, setDuration] = useState<(typeof BOOKING_DURATIONS)[number]>("30");
  const [state, formAction, pending] = useActionState(bookCallAction, initial);

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-portal-line bg-portal-panel p-6">
        <p className="font-mono text-mono-xs uppercase text-portal-brass">Call requested</p>
        <p className="mt-2 text-body text-portal-ink">{state.message}</p>
        <p className="mt-1 text-small text-portal-ink-2">
          It now shows under “Your calls” with the status <em>requested</em>.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {/* Purpose */}
      <div>
        <label className="font-mono text-mono-xs uppercase text-portal-ink-2">What&apos;s it about?</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {BOOKING_PURPOSES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPurpose(p)}
              className={cn(
                "rounded-full border px-4 py-1.5 font-body text-small transition-colors",
                purpose === p
                  ? "border-portal-brass text-portal-ink"
                  : "border-portal-line text-portal-ink-2 hover:text-portal-ink",
              )}
            >
              {PURPOSE_LABEL[p]}
            </button>
          ))}
        </div>
        <input type="hidden" name="purpose" value={purpose} />
      </div>

      {/* Slot picker */}
      <div>
        <label className="font-mono text-mono-xs uppercase text-portal-ink-2">Pick a slot</label>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {days.map((day) => (
            <div key={day.dayLabel} className="rounded-lg border border-portal-line bg-portal-panel/60 p-3">
              <p className="mb-2 font-mono text-mono-xs uppercase text-portal-ink-2">{day.dayLabel}</p>
              <div className="flex flex-wrap gap-1.5">
                {day.slots.map((s) => (
                  <button
                    key={s.iso}
                    type="button"
                    onClick={() => setSelected(s.iso)}
                    aria-pressed={selected === s.iso}
                    className={cn(
                      "rounded border px-2.5 py-1 font-mono text-mono-xs transition-colors",
                      selected === s.iso
                        ? "border-portal-brass bg-portal-brass/10 text-portal-ink"
                        : "border-portal-line text-portal-ink-2 hover:text-portal-ink",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <input type="hidden" name="preferredSlot" value={selected ?? ""} />
        <p className="mt-2 font-mono text-mono-xs uppercase text-portal-ink-2/70">
          Times shown in your timezone · we confirm the exact time
        </p>
      </div>

      {/* Duration */}
      <div>
        <label className="font-mono text-mono-xs uppercase text-portal-ink-2">Duration</label>
        <div className="mt-2 flex gap-2">
          {BOOKING_DURATIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDuration(d)}
              className={cn(
                "rounded border px-3 py-1.5 font-mono text-mono-xs transition-colors",
                duration === d
                  ? "border-portal-brass text-portal-ink"
                  : "border-portal-line text-portal-ink-2 hover:text-portal-ink",
              )}
            >
              {d} min
            </button>
          ))}
        </div>
        <input type="hidden" name="durationMins" value={duration} />
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="font-mono text-mono-xs uppercase text-portal-ink-2">
          Anything we should prep? (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          maxLength={2000}
          className="mt-2 w-full rounded-lg border border-portal-line bg-portal-panel/60 px-3 py-2 text-body text-portal-ink placeholder:text-portal-ink-2/60 focus:border-portal-brass focus:outline-none"
          placeholder="e.g. We want to walk through the critical findings before the board meeting."
        />
      </div>

      {state.status === "error" && (
        <p className="text-small text-[var(--color-sev-high)]">{state.message}</p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={!selected || pending}
          className="rounded bg-portal-brass px-5 py-2.5 font-body text-small font-medium text-portal-bg transition-opacity disabled:opacity-40"
        >
          {pending ? "Requesting…" : "Request this call"}
        </button>
        {!selected && (
          <span className="font-mono text-mono-xs uppercase text-portal-ink-2/70">Pick a slot to continue</span>
        )}
      </div>
    </form>
  );
}
