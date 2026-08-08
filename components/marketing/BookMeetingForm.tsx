"use client";

import { useMemo, useState } from "react";
import { useActionState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { bookMeetingAction, type BookState } from "@/app/(marketing)/book/actions";
import { MEETING_DURATIONS } from "@/lib/meeting-schema";
import { SERVICES_BY_DOMAIN } from "@/content/services";

/** Business-day slots × a few times, in the viewer's timezone. */
function useSlots() {
  return useMemo(() => {
    const TIMES = [9, 11, 13, 15];
    const days: { dayLabel: string; slots: { iso: string; label: string }[] }[] = [];
    const now = new Date();
    let cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let added = 0;
    while (added < 6) {
      cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000);
      const dow = cursor.getDay();
      if (dow === 0 || dow === 6) continue;
      const slots = TIMES.map((h) => {
        const d = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate(), h, 0, 0, 0);
        return { iso: d.toISOString(), label: d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }) };
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

const initial: BookState = { status: "idle" };

const inputClass =
  "mt-1.5 w-full rounded-lg border border-rule bg-surface px-3 py-2 text-body text-ink placeholder:text-slate/60 focus:border-pine focus:outline-none";

export function BookMeetingForm({ initialService }: { initialService?: string }) {
  const days = useSlots();
  const [selected, setSelected] = useState<string | null>(null);
  const [duration, setDuration] = useState<(typeof MEETING_DURATIONS)[number]>("30");
  const [state, formAction, pending] = useActionState(bookMeetingAction, initial);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-rule bg-surface p-8">
        <p className="font-mono text-mono-xs uppercase text-pine">Meeting requested</p>
        <h2 className="mt-2 text-h2 text-ink">We&apos;ll be in touch to confirm.</h2>
        <p className="mt-3 max-w-measure text-body text-slate">{state.message}</p>
        <Link href="/" className="mt-6 inline-block text-small text-pine underline decoration-pine/40 underline-offset-4 hover:decoration-pine">
          Back to home →
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-7 rounded-3xl border border-rule bg-surface p-6 shadow-pop-sm md:p-8">
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {/* Details */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-small">
          <span className="font-mono text-mono-xs uppercase text-slate">Name</span>
          <input name="name" required autoComplete="name" className={inputClass} />
        </label>
        <label className="block text-small">
          <span className="font-mono text-mono-xs uppercase text-slate">Work email</span>
          <input name="email" type="email" required autoComplete="email" spellCheck={false} className={inputClass} />
        </label>
        <label className="block text-small">
          <span className="font-mono text-mono-xs uppercase text-slate">Organisation</span>
          <input name="company" required autoComplete="organization" className={inputClass} />
        </label>
        <label className="block text-small">
          <span className="font-mono text-mono-xs uppercase text-slate">What&apos;s it about?</span>
          <select name="service" defaultValue={initialService ?? "not-sure"} className={inputClass}>
            {SERVICES_BY_DOMAIN.map((group) => (
              <optgroup key={group.domain} label={group.domain}>
                {group.services.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
              </optgroup>
            ))}
            <option value="not-sure">Not sure yet</option>
          </select>
        </label>
      </div>

      {/* Slot picker */}
      <div>
        <span className="font-mono text-mono-xs uppercase text-slate">Pick a slot</span>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {days.map((day) => (
            <div key={day.dayLabel} className="rounded-lg border border-rule bg-paper-sunk/40 p-3">
              <p className="mb-2 font-mono text-mono-xs uppercase text-slate">{day.dayLabel}</p>
              <div className="flex flex-wrap gap-1.5">
                {day.slots.map((s) => (
                  <button
                    key={s.iso}
                    type="button"
                    aria-pressed={selected === s.iso}
                    onClick={() => setSelected(s.iso)}
                    className={cn(
                      "rounded border px-2.5 py-1 font-mono text-mono-xs transition-colors",
                      selected === s.iso ? "border-pine bg-pine/10 text-ink" : "border-rule text-slate hover:text-ink",
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
        <p className="mt-2 font-mono text-mono-xs uppercase text-slate">Times in your timezone · we confirm the exact time</p>
      </div>

      {/* Duration */}
      <div>
        <span className="font-mono text-mono-xs uppercase text-slate">Duration</span>
        <div className="mt-2 flex gap-2">
          {MEETING_DURATIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDuration(d)}
              className={cn(
                "rounded border px-3 py-1.5 font-mono text-mono-xs transition-colors",
                duration === d ? "border-pine text-ink" : "border-rule text-slate hover:text-ink",
              )}
            >
              {d} min
            </button>
          ))}
        </div>
        <input type="hidden" name="durationMins" value={duration} />
      </div>

      {/* Notes */}
      <label className="block">
        <span className="font-mono text-mono-xs uppercase text-slate">Anything we should prep? (optional)</span>
        <textarea name="notes" rows={3} maxLength={2000} className={inputClass} placeholder="e.g. We're planning a cloud migration and want to talk through security first." />
      </label>

      {state.status === "error" && <p className="text-small text-[var(--color-sev-high)]">{state.message}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={!selected || pending}
          className="rounded bg-pine px-6 py-3 font-body text-small font-medium text-white transition-colors enabled:hover:bg-pine-lift disabled:opacity-40"
        >
          {pending ? "Requesting…" : "Request this meeting"}
        </button>
        {!selected && <span className="font-mono text-mono-xs uppercase text-slate">Pick a slot to continue</span>}
      </div>
    </form>
  );
}
