"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Interactive cloud & AI posture calculator. Flip the controls your estate has
 * in place and watch a weighted posture score move in real time, with the single
 * biggest exposure called out. Weights reflect how much each control actually
 * reduces breach likelihood — not a checkbox count. Runs entirely client-side.
 */

interface Control {
  id: string;
  label: string;
  pillar: string;
  weight: number;
  on: boolean;
}

const INITIAL: Control[] = [
  { id: "mfa", label: "MFA enforced for all admins & service accounts", pillar: "Identity", weight: 16, on: false },
  { id: "jit", label: "Just-in-time privileged access (no standing admin)", pillar: "Identity", weight: 12, on: false },
  { id: "public", label: "No public storage buckets or blobs", pillar: "Data", weight: 14, on: true },
  { id: "encrypt", label: "Encryption at rest and in transit", pillar: "Data", weight: 8, on: true },
  { id: "logs", label: "Centralised logging with 24/7 alerting", pillar: "Detection", weight: 14, on: false },
  { id: "segment", label: "Network segmentation between workloads", pillar: "Network", weight: 10, on: false },
  { id: "edr", label: "EDR on every endpoint & server", pillar: "Device", weight: 10, on: true },
  { id: "ai", label: "AI / LLM inputs & outputs monitored and guard-railed", pillar: "AI", weight: 8, on: false },
  { id: "secrets", label: "Secrets in a vault, never in code or config", pillar: "Application", weight: 8, on: false },
];

const TOTAL = INITIAL.reduce((a, c) => a + c.weight, 0);

function tone(score: number) {
  if (score < 40) return { label: "High exposure", bar: "bg-sev-crit", text: "text-sev-crit", chip: "bg-sev-crit-tint text-sev-crit" };
  if (score < 70) return { label: "Moderate exposure", bar: "bg-sev-high", text: "text-sev-high", chip: "bg-sev-high-tint text-sev-high" };
  if (score < 90) return { label: "Good posture", bar: "bg-sev-low", text: "text-sev-low", chip: "bg-sev-low-tint text-sev-low" };
  return { label: "Strong posture", bar: "bg-status-remediated", text: "text-status-remediated", chip: "bg-status-remediated-tint text-status-remediated" };
}

export function PostureCalculator() {
  const [controls, setControls] = useState<Control[]>(INITIAL);

  const score = useMemo(
    () => Math.round((controls.filter((c) => c.on).reduce((a, c) => a + c.weight, 0) / TOTAL) * 100),
    [controls],
  );
  const t = tone(score);

  const topExposure = useMemo(
    () => [...controls].filter((c) => !c.on).sort((a, b) => b.weight - a.weight)[0],
    [controls],
  );

  function toggle(id: string) {
    setControls((cs) => cs.map((c) => (c.id === id ? { ...c, on: !c.on } : c)));
  }

  return (
    <div className="grid grid-cols-1 gap-6 rounded-3xl bg-surface p-6 shadow-pop-sm md:grid-cols-5 md:p-10">
      {/* Controls */}
      <div className="md:col-span-3">
        <p className="font-mono text-mono-xs uppercase text-slate">Toggle what you have in place</p>
        <ul className="mt-4 flex flex-col gap-2">
          {controls.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                role="switch"
                aria-checked={c.on}
                onClick={() => toggle(c.id)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-lg border px-4 py-3 text-left transition-colors",
                  c.on ? "border-status-remediated bg-status-remediated-tint" : "border-rule bg-paper hover:border-slate",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative h-6 w-10 shrink-0 rounded-full transition-colors",
                    c.on ? "bg-status-remediated" : "bg-rule",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-surface shadow-sm transition-all",
                      c.on ? "left-[1.125rem]" : "left-0.5",
                    )}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-small text-ink">{c.label}</span>
                  <span className="font-mono text-mono-xs uppercase text-slate">{c.pillar}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Live score */}
      <div className="md:col-span-2">
        <div className="sticky top-24 rounded-2xl bg-paper p-6">
          <p className="font-mono text-mono-xs uppercase text-slate">Live posture score</p>
          <p className="mt-2 font-display text-h1 leading-none text-ink">
            {score}
            <span className="text-h3 text-slate">/100</span>
          </p>
          <span className={cn("mt-1 inline-block rounded-full px-3 py-1 font-mono text-mono-xs uppercase", t.chip)}>
            {t.label}
          </span>
          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-rule">
            <div
              className={cn("h-full rounded-full motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-doc", t.bar)}
              style={{ width: `${score}%` }}
            />
          </div>

          {topExposure && (
            <div className="mt-6 rounded-xl border border-rule bg-surface p-4">
              <p className="font-mono text-mono-xs uppercase text-slate">Biggest exposure</p>
              <p className="mt-1 text-small text-ink">{topExposure.label}</p>
            </div>
          )}

          <Link
            href="/contact?service=cloud-security"
            className="mt-6 block rounded bg-pine px-6 py-3 text-center font-body text-small font-medium text-white transition-colors hover:bg-pine-lift"
          >
            Book an assessment →
          </Link>
          <p className="mt-3 font-mono text-mono-xs uppercase text-slate/70">
            Indicative · client-side only
          </p>
        </div>
      </div>
    </div>
  );
}
