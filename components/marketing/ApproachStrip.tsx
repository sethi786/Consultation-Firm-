"use client";

import { useEffect, useRef, useState } from "react";
import { Container, Eyebrow } from "@/components/ui";

/**
 * The engagement process (§3.5): the one place numbered markers are used because
 * order genuinely matters. Scope → Assess → Report → Remediate → Verify.
 *
 * When the section scrolls into view a connector line draws left→right and the
 * numbered nodes pop in sequence — a purposeful "here's the path" motion, fully
 * stilled under prefers-reduced-motion (CSS handles the killswitch).
 */
export const ENGAGEMENT_STEPS = [
  {
    name: "Scope",
    detail:
      "We agree what's in scope, what success looks like, and the rules of engagement — in writing, before anyone touches a system.",
  },
  {
    name: "Assess",
    detail:
      "We test against the frameworks and your architecture, by hand where it matters, and record every finding with evidence.",
  },
  {
    name: "Report",
    detail:
      "You get a findings register and a board-ready report — severities, business impact, and a remediation plan with owners.",
  },
  {
    name: "Remediate",
    detail:
      "We fix alongside your team or hand a plan your engineers can execute. Either way the plan is specific, not aspirational.",
  },
  {
    name: "Verify",
    detail:
      "We retest what was fixed and mark it closed only when the evidence holds. Findings don't self-certify.",
  },
];

export function ApproachStrip({ index = 3 }: { index?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) {
      setShown(true);
      return;
    }
    // Safety net: never leave the timeline invisible if the observer doesn't fire.
    const safety = window.setTimeout(() => setShown(true), 700);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            window.clearTimeout(safety);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <section className="border-y border-rule bg-paper-sunk/30">
      <Container className="py-12 md:py-28">
        <Eyebrow index={index} className="mb-12">
          How an engagement runs
        </Eyebrow>

        <div ref={ref} data-shown={shown} className="relative">
          {/* Connector line behind the number row (desktop). */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-5 hidden h-px bg-rule lg:block"
          >
            <div className="draw-line h-full w-full bg-pine/50" />
          </div>

          <ol className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {ENGAGEMENT_STEPS.map((step, i) => (
              <li
                key={step.name}
                className="node-pop relative flex flex-col gap-3"
                style={{ transitionDelay: shown ? `${i * 130}ms` : "0ms" }}
              >
                <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-surface font-mono text-mono-xs text-brass-lift shadow-pop-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-h3 text-ink">{step.name}</h3>
                <p className="text-small text-slate">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
