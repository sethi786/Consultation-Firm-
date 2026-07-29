"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Zero-Trust attack-path visualizer. An attacker starts on the internet and
 * advances stage by stage toward your data. Each control gate, when switched on,
 * stops lateral movement at that stage. Toggle the gates and watch where the
 * breach is contained — the core idea of zero trust made tangible.
 */

const STAGES = ["Internet", "Identity", "Endpoint", "Network", "Application", "Data"] as const;

interface Gate {
  id: string;
  label: string;
  on: boolean;
}

// Gate i sits between STAGES[i] and STAGES[i+1]; passing it moves the attacker on.
const INITIAL_GATES: Gate[] = [
  { id: "id", label: "MFA + just-in-time access", on: false },
  { id: "ep", label: "EDR on endpoints", on: false },
  { id: "net", label: "Network segmentation", on: false },
  { id: "app", label: "WAF + input validation", on: false },
  { id: "data", label: "Encryption + DLP", on: false },
];

export function AttackPathVisualizer() {
  const [gates, setGates] = useState<Gate[]>(INITIAL_GATES);

  // Furthest stage reached = index of the first ON gate (contained there); if no
  // gate is on, the attacker reaches Data (the last stage).
  const reachedIndex = useMemo(() => {
    const firstClosed = gates.findIndex((g) => g.on);
    return firstClosed === -1 ? STAGES.length - 1 : firstClosed;
  }, [gates]);

  const breached = reachedIndex === STAGES.length - 1;

  function toggle(id: string) {
    setGates((gs) => gs.map((g) => (g.id === id ? { ...g, on: !g.on } : g)));
  }

  return (
    <div className="rounded-3xl bg-surface p-6 shadow-pop-sm md:p-10">
      {/* Live verdict */}
      <div
        className={cn(
          "mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-4",
          breached ? "bg-sev-crit-tint" : "bg-status-remediated-tint",
        )}
      >
        <p className={cn("font-body text-body", breached ? "text-sev-crit" : "text-status-remediated")}>
          {breached ? (
            <>Attacker reaches <strong>your data</strong> — full breach.</>
          ) : (
            <>Contained at <strong>{STAGES[reachedIndex]}</strong>. Lateral movement stopped.</>
          )}
        </p>
        <span className={cn("font-mono text-mono-xs uppercase", breached ? "text-sev-crit" : "text-status-remediated")}>
          {gates.filter((g) => g.on).length} / {gates.length} gates closed
        </span>
      </div>

      {/* The path: horizontal on desktop, vertical on mobile */}
      <div className="flex flex-col gap-0 md:flex-row md:items-stretch">
        {STAGES.map((stage, i) => {
          const reached = i <= reachedIndex;
          const isTarget = i === STAGES.length - 1;
          const isContainment = !breached && i === reachedIndex;
          return (
            <div key={stage} className="flex flex-1 flex-col md:flex-row md:items-center">
              {/* Node */}
              <div
                className={cn(
                  "flex flex-col items-center justify-center rounded-2xl border-2 px-4 py-4 text-center transition-colors md:flex-1",
                  isContainment
                    ? "border-status-remediated bg-status-remediated-tint"
                    : reached
                      ? "border-sev-crit bg-sev-crit-tint"
                      : "border-rule bg-paper",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-mono-xs uppercase",
                    isContainment ? "text-status-remediated" : reached ? "text-sev-crit" : "text-slate",
                  )}
                >
                  {isTarget ? "◆ " : ""}{stage}
                </span>
                {reached && !isContainment && (
                  <span className="mt-1 font-mono text-mono-xs uppercase text-sev-crit">breached</span>
                )}
                {isContainment && (
                  <span className="mt-1 font-mono text-mono-xs uppercase text-status-remediated">held</span>
                )}
              </div>

              {/* Gate (between this node and the next) */}
              {i < gates.length && (
                <div className="flex shrink-0 flex-col items-center gap-1 py-2 md:w-40 md:py-0">
                  {/* connector */}
                  <div className="flex w-full items-center justify-center px-2">
                    <span
                      className={cn(
                        "h-8 w-1 rounded-full md:h-1 md:w-full",
                        i < reachedIndex ? "attack-flow" : "bg-rule",
                      )}
                      aria-hidden="true"
                    />
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={gates[i]!.on}
                    aria-label={`${gates[i]!.label} — ${gates[i]!.on ? "on" : "off"}`}
                    onClick={() => toggle(gates[i]!.id)}
                    className={cn(
                      "rounded border px-3 py-1.5 font-mono text-mono-xs uppercase transition-colors",
                      gates[i]!.on
                        ? "border-pine bg-pine text-white"
                        : "border-rule bg-paper text-slate hover:border-slate",
                    )}
                  >
                    {gates[i]!.on ? "ON · " : "OFF · "}{gates[i]!.label}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href="/contact?service=zero-trust"
          className="rounded bg-pine px-6 py-3 font-body text-small font-medium text-white transition-colors hover:bg-pine-lift"
        >
          Get a zero-trust roadmap →
        </Link>
        <button
          type="button"
          onClick={() => setGates(INITIAL_GATES)}
          className="font-body text-small text-slate underline decoration-rule underline-offset-4 hover:text-ink"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
