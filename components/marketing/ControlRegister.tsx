"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { CONTROLS, type Control } from "@/content/controls";
import { SERVICE_LIST, type ServiceSlug } from "@/content/services";
import { MaturityMeter } from "./MaturityMeter";

/**
 * The Control Register (CLAUDE.md §3.4) — the signature element.
 *
 * A live, semantic <table> mapping the six services to real framework controls,
 * each with a current→target maturity. On first paint the rows populate in a
 * short cascade (approved motion #1). Hovering/focusing a service in the rail
 * highlights its rows and dims the rest; clicking pins the filter, Escape clears.
 * Below md it reflows to an accessible card stack — never a squashed table.
 *
 * All motion is gated behind `prefers-reduced-motion` (via globals.css).
 */

const FRAMEWORK_ABBR: Record<Control["framework"], string> = {
  "NIST CSF 2.0": "NIST CSF",
  "ISO/IEC 27001:2022": "ISO 27001",
  "CIS Controls v8": "CIS v8",
};

// Cascade timing: 40ms stagger, but scaled down so the whole populate finishes
// under 900ms no matter how many rows (§3.4). Row animation itself is ~420ms.
function cascadeStep(rowCount: number): number {
  if (rowCount <= 1) return 0;
  return Math.min(40, Math.floor(460 / (rowCount - 1)));
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function ControlRegister({
  className,
  scrollable = false,
}: {
  className?: string;
  /** Cap the register height with an internal scroll — used on the homepage,
   *  where the full register is long. All rows stay filterable and keyboard-reachable. */
  scrollable?: boolean;
}) {
  const rows = CONTROLS;
  const step = useMemo(() => cascadeStep(rows.length), [rows.length]);
  const reducedMotion = usePrefersReducedMotion();

  // Play the entrance cascade exactly once, then drop the animation classes so
  // the row-opacity dimming (filtering) isn't overridden by the animation's
  // `fill-mode: both` final value. Under reduced motion, skip straight to done.
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (reducedMotion) {
      setEntered(true);
      return;
    }
    const total = (rows.length - 1) * step + 420 + 120;
    const t = window.setTimeout(() => setEntered(true), total);
    return () => window.clearTimeout(t);
  }, [reducedMotion, rows.length, step]);
  const animating = !entered && !reducedMotion;

  // Highlight state: `hovered`/`focused` is transient; `pinned` persists on click.
  const [hovered, setHovered] = useState<ServiceSlug | null>(null);
  const [pinned, setPinned] = useState<ServiceSlug | null>(null);
  const active = pinned ?? hovered;

  const railRef = useRef<HTMLDivElement>(null);

  const clearPin = useCallback(() => setPinned(null), []);

  // Escape unpins from anywhere within the component.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && pinned) {
        setPinned(null);
      }
    },
    [pinned],
  );

  const activeCount = active
    ? rows.filter((r) => r.service === active).length
    : rows.length;
  const activeName = active
    ? SERVICE_LIST.find((s) => s.slug === active)?.name
    : null;

  const isDimmed = (service: ServiceSlug) => active !== null && service !== active;

  return (
    <section
      aria-labelledby="register-heading"
      className={cn("w-full", className)}
      onKeyDown={onKeyDown}
    >
      {/* Running head */}
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2
          id="register-heading"
          className="font-mono text-mono-xs uppercase text-slate"
        >
          <span className="text-brass-lift">§ 00</span>
          <span className="text-rule">{"  —  "}</span>
          Control register
        </h2>
        <p className="font-mono text-mono-xs uppercase text-slate/80">
          NIST CSF 2.0 · ISO 27001:2022 · CIS v8
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-[10rem_1fr]">
        {/* Service rail */}
        <div
          ref={railRef}
          role="group"
          aria-label="Filter the register by service"
          className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-1"
        >
          <button
            type="button"
            onClick={clearPin}
            onMouseEnter={() => setHovered(null)}
            className={cn(
              "hidden text-left font-mono text-mono-xs uppercase transition-colors md:block",
              active === null ? "text-ink" : "text-slate hover:text-ink",
            )}
          >
            All controls
          </button>
          {SERVICE_LIST.map((s) => {
            const isActive = active === s.slug;
            const isPinned = pinned === s.slug;
            return (
              <button
                key={s.slug}
                type="button"
                aria-pressed={isPinned}
                onMouseEnter={() => setHovered(s.slug)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(s.slug)}
                onBlur={() => setHovered(null)}
                onClick={() => setPinned((p) => (p === s.slug ? null : s.slug))}
                className={cn(
                  "group flex items-center gap-2 rounded px-2 py-1 text-left font-mono text-mono-xs uppercase transition-colors md:-mx-2",
                  isActive
                    ? "text-ink"
                    : "text-slate hover:text-ink",
                  isPinned && "bg-paper-sunk",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-3 w-[3px] rounded-full transition-colors",
                    isActive ? "bg-brass" : "bg-rule group-hover:bg-slate",
                  )}
                />
                {s.short}
              </button>
            );
          })}
          {pinned && (
            <button
              type="button"
              onClick={clearPin}
              className="mt-1 text-left font-mono text-mono-xs uppercase text-brass-lift underline decoration-brass/40 underline-offset-2 hover:decoration-brass"
            >
              Clear ✕
            </button>
          )}
        </div>

        {/* The register */}
        <div className="min-w-0">
          {/* Desktop: semantic table */}
          <div
            className={cn(
              "hidden overflow-x-auto md:block",
              scrollable && "max-h-[34rem] overflow-y-auto rounded border border-rule",
            )}
          >
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Control register: mapping of Waypoint Security services to NIST CSF
                2.0, ISO/IEC 27001:2022, and CIS Controls v8, with current and target
                maturity for each.
              </caption>
              <thead className={cn(scrollable && "sticky top-0 z-10 bg-paper")}>
                <tr className="border-y border-rule">
                  <th scope="col" className="whitespace-nowrap py-2 pr-3 font-mono text-mono-xs font-medium uppercase text-slate">
                    Framework
                  </th>
                  <th scope="col" className="whitespace-nowrap py-2 pr-3 font-mono text-mono-xs font-medium uppercase text-slate">
                    Ref
                  </th>
                  <th scope="col" className="py-2 pr-3 font-mono text-mono-xs font-medium uppercase text-slate">
                    Control
                  </th>
                  <th scope="col" className="whitespace-nowrap py-2 pr-3 font-mono text-mono-xs font-medium uppercase text-slate">
                    Service
                  </th>
                  <th scope="col" className="whitespace-nowrap py-2 font-mono text-mono-xs font-medium uppercase text-slate">
                    Maturity
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c, i) => (
                  <tr
                    key={`${c.reference}-${c.service}`}
                    className={cn(
                      "border-b border-rule/60 align-top transition-opacity duration-200",
                      animating && "animate-[register-row-in_420ms_var(--ease-doc)_both]",
                      isDimmed(c.service) ? "opacity-25" : "opacity-100",
                    )}
                    style={animating ? { animationDelay: `${i * step}ms` } : undefined}
                  >
                    <td className="whitespace-nowrap py-2.5 pr-3">
                      <span className="font-mono text-mono-xs uppercase text-slate">
                        {FRAMEWORK_ABBR[c.framework]}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-2.5 pr-3">
                      <span className="font-mono text-caption text-ink">{c.reference}</span>
                    </td>
                    <td className="py-2.5 pr-3">
                      <span className="text-small text-ink">{c.name}</span>
                    </td>
                    <td className="whitespace-nowrap py-2.5 pr-3">
                      <span className="font-mono text-mono-xs uppercase text-slate">
                        {SERVICE_LIST.find((s) => s.slug === c.service)?.short}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-2.5">
                      <MaturityMeter
                        current={c.current}
                        target={c.target}
                        animate={animating}
                        delayMs={i * step + 200}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: card stack (never a squashed table) */}
          <ul
            className={cn(
              "flex flex-col gap-3 md:hidden",
              scrollable && "max-h-[30rem] overflow-y-auto rounded border border-rule p-2",
            )}
          >
            {rows.map((c, i) => (
              <li
                key={`m-${c.reference}-${c.service}`}
                className={cn(
                  "rounded border border-rule bg-paper px-4 py-3 transition-opacity duration-200",
                  animating && "animate-[register-row-in_420ms_var(--ease-doc)_both]",
                  isDimmed(c.service) ? "opacity-25" : "opacity-100",
                )}
                style={animating ? { animationDelay: `${i * step}ms` } : undefined}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-caption text-ink">{c.reference}</span>
                  <span className="font-mono text-mono-xs uppercase text-slate">
                    {FRAMEWORK_ABBR[c.framework]}
                  </span>
                </div>
                <p className="mt-1.5 text-small text-ink">{c.name}</p>
                <div className="mt-2.5 flex items-center justify-between gap-3">
                  <span className="font-mono text-mono-xs uppercase text-slate">
                    {SERVICE_LIST.find((s) => s.slug === c.service)?.short}
                  </span>
                  <MaturityMeter current={c.current} target={c.target} />
                </div>
              </li>
            ))}
          </ul>

          {/* Filter status for assistive tech */}
          <p className="sr-only" aria-live="polite">
            {activeName
              ? `Filtered to ${activeName}: ${activeCount} controls.`
              : `Showing all ${activeCount} controls.`}
          </p>
        </div>
      </div>
    </section>
  );
}
