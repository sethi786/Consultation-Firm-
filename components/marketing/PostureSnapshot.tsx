"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Security Posture Snapshot — a self-scoring wizard. Eight questions, one per
 * dimension; each answer carries a 0–4 maturity score. On completion it computes
 * an overall band, shows a per-dimension read, surfaces the three weakest areas
 * as priorities, and recommends the service that addresses each — then invites a
 * booking. Everything runs in the browser; no answers are sent anywhere, which
 * is itself the point for a security buyer.
 */

interface Option {
  label: string;
  score: 0 | 1 | 2 | 3 | 4;
}
interface Question {
  id: string;
  dimension: string;
  prompt: string;
  options: Option[];
  /** Service recommended when this dimension scores low. */
  serviceSlug: string;
  serviceName: string;
}

const QUESTIONS: Question[] = [
  {
    id: "identity",
    dimension: "Identity & access",
    prompt: "How is privileged (admin) access handled?",
    serviceSlug: "identity",
    serviceName: "Identity & Access Management",
    options: [
      { label: "Standing admin for several people; MFA is inconsistent", score: 0 },
      { label: "MFA is on, but admin rights are permanent", score: 2 },
      { label: "Just-in-time elevation (PIM), MFA everywhere, reviewed regularly", score: 4 },
    ],
  },
  {
    id: "cloud",
    dimension: "Cloud posture",
    prompt: "How do you know your cloud (Azure / AWS) is configured securely?",
    serviceSlug: "cloud-security",
    serviceName: "Cloud Security",
    options: [
      { label: "We don't really have visibility into it", score: 0 },
      { label: "We see a native posture score but don't act on it systematically", score: 2 },
      { label: "Posture management with prioritised remediation and SLAs", score: 4 },
    ],
  },
  {
    id: "detection",
    dimension: "Detection & response",
    prompt: "If an attacker got in at 2am, what would happen?",
    serviceSlug: "managed-soc",
    serviceName: "Managed SOC / MDR",
    options: [
      { label: "Honestly, no one is watching out of hours", score: 0 },
      { label: "Alerts fire, but they're triaged in business hours", score: 2 },
      { label: "24/7 monitoring with a team that contains and responds", score: 4 },
    ],
  },
  {
    id: "data-ai",
    dimension: "Data & AI",
    prompt: "Do you know where sensitive data lives — and what AI tools can reach it?",
    serviceSlug: "ai-assessment",
    serviceName: "AI Readiness & Risk Assessment",
    options: [
      { label: "No clear inventory of sensitive data or AI usage", score: 0 },
      { label: "Some classification, but AI adoption is outrunning governance", score: 2 },
      { label: "Data classified, DLP in place, AI use inventoried and governed", score: 4 },
    ],
  },
  {
    id: "vulnerability",
    dimension: "Vulnerabilities & endpoints",
    prompt: "How do you handle vulnerabilities and the devices that touch your data?",
    serviceSlug: "vulnerability-management",
    serviceName: "Vulnerability Management",
    options: [
      { label: "Patching is ad hoc; unmanaged devices exist", score: 0 },
      { label: "We scan, but remediation is slow and unprioritised", score: 2 },
      { label: "Risk-based remediation with SLAs; all devices managed", score: 4 },
    ],
  },
  {
    id: "compliance",
    dimension: "Governance & compliance",
    prompt: "Could you pass a SOC 2 or ISO 27001 audit if it started tomorrow?",
    serviceSlug: "compliance",
    serviceName: "Compliance & Audit",
    options: [
      { label: "We're not mapped to a framework yet", score: 0 },
      { label: "We're working toward it but the evidence is patchy", score: 2 },
      { label: "Mapped, evidenced, and kept current", score: 4 },
    ],
  },
  {
    id: "resilience",
    dimension: "Resilience & recovery",
    prompt: "If ransomware hit tonight, could you recover — and how fast?",
    serviceSlug: "incident-response",
    serviceName: "Incident Response & Ransomware Readiness",
    options: [
      { label: "Backups are untested and there's no incident plan", score: 0 },
      { label: "We have backups, but no tested recovery or IR plan", score: 2 },
      { label: "Tested IR plan and immutable, proven backups", score: 4 },
    ],
  },
  {
    id: "awareness",
    dimension: "People & awareness",
    prompt: "How do your people handle phishing and social engineering?",
    serviceSlug: "security-awareness",
    serviceName: "Security Awareness & Phishing Simulation",
    options: [
      { label: "No real training programme", score: 0 },
      { label: "An annual training module — a checkbox", score: 2 },
      { label: "Continuous training with realistic phishing simulations", score: 4 },
    ],
  },
];

const MAX = QUESTIONS.length * 4;

function band(pct: number): { label: string; note: string; tone: string } {
  if (pct < 30)
    return { label: "Initial", note: "Significant exposure — the basics need attention first.", tone: "text-sev-crit" };
  if (pct < 50)
    return { label: "Developing", note: "Foundations are forming, but gaps an attacker would use remain.", tone: "text-sev-high" };
  if (pct < 70)
    return { label: "Defined", note: "Solid in places; the weak dimensions are where risk concentrates.", tone: "text-sev-med" };
  if (pct < 85)
    return { label: "Managed", note: "A mature posture — the work now is closing the last gaps and proving it.", tone: "text-status-remediated" };
  return { label: "Optimised", note: "Strong across the board. Validation and continuous assurance are the next frontier.", tone: "text-status-remediated" };
}

function barTone(score: number): string {
  if (score <= 1) return "bg-sev-crit";
  if (score <= 2) return "bg-sev-high";
  if (score <= 3) return "bg-sev-med";
  return "bg-status-remediated";
}

export function PostureSnapshot() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  function choose(id: string, score: number) {
    const next = { ...answers, [id]: score };
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  if (done) {
    const total = QUESTIONS.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    const pct = Math.round((total / MAX) * 100);
    const b = band(pct);
    const priorities = [...QUESTIONS]
      .map((q) => ({ q, score: answers[q.id] ?? 0 }))
      .sort((a, z) => a.score - z.score)
      .slice(0, 3);

    return (
      <div className="rounded-3xl border border-rule bg-surface p-6 shadow-pop-sm md:p-10">
        <p className="font-mono text-mono-xs uppercase text-slate">Your snapshot</p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className={cn("font-display text-display leading-none", b.tone)}>{pct}<span className="text-h2 text-slate">/100</span></span>
          <span className="font-display text-h2 text-ink">{b.label}</span>
        </div>
        <p className="mt-3 max-w-measure text-body text-slate">{b.note}</p>

        {/* Per-dimension read */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {QUESTIONS.map((q) => {
            const s = answers[q.id] ?? 0;
            return (
              <div key={q.id} className="flex items-center gap-3">
                <span className="w-40 shrink-0 truncate font-mono text-mono-xs uppercase text-slate">{q.dimension}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-rule">
                  <span className={cn("block h-full rounded-full", barTone(s))} style={{ width: `${(s / 4) * 100}%` }} />
                </span>
              </div>
            );
          })}
        </div>

        {/* Priorities */}
        <div className="mt-10 border-t border-rule pt-8">
          <h3 className="font-display text-h3 text-ink">Your three priorities</h3>
          <p className="mt-1 text-small text-slate">Where risk concentrates today — and the engagement that addresses each.</p>
          <ol className="mt-5 flex flex-col gap-3">
            {priorities.map(({ q }, i) => (
              <li key={q.id}>
                <Link
                  href={`/services/${q.serviceSlug}`}
                  className="group flex items-baseline justify-between gap-4 rounded-2xl border border-rule bg-paper px-5 py-4 transition-colors hover:border-pine"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-mono-xs text-brass-lift">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block text-body text-ink">{q.dimension}</span>
                      <span className="block text-small text-slate">{q.serviceName}</span>
                    </span>
                  </span>
                  <span aria-hidden="true" className="font-mono text-mono-xs uppercase text-pine transition-transform group-hover:translate-x-1">
                    View →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-rule pt-8">
          <Link
            href="/contact"
            className="rounded-full bg-pine px-6 py-3 font-body text-small font-medium text-white transition-colors hover:bg-pine-lift"
          >
            Turn this into a real assessment
          </Link>
          <button
            type="button"
            onClick={reset}
            className="font-body text-small text-slate underline decoration-slate/30 underline-offset-4 hover:text-ink"
          >
            Start over
          </button>
        </div>
        <p className="mt-5 font-mono text-mono-xs uppercase text-slate/60">
          Indicative only · nothing you entered left your browser
        </p>
      </div>
    );
  }

  const q = QUESTIONS[step]!;
  return (
    <div className="rounded-3xl border border-rule bg-surface p-6 shadow-pop-sm md:p-10">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-mono-xs uppercase text-slate">
          {q.dimension} · {step + 1} / {QUESTIONS.length}
        </p>
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-rule">
          <div
            className="h-full rounded-full bg-pine motion-safe:transition-[width] motion-safe:duration-500 motion-safe:ease-doc"
            style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>
      <h2 className="mt-5 font-display text-h2 text-ink">{q.prompt}</h2>
      <div className="mt-6 flex flex-col gap-3">
        {q.options.map((o) => (
          <button
            key={o.label}
            type="button"
            onClick={() => choose(q.id, o.score)}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-rule bg-paper px-5 py-4 text-left transition-colors hover:border-pine"
          >
            <span className="text-body text-ink">{o.label}</span>
            <span aria-hidden="true" className="font-mono text-mono-xs text-slate transition-transform group-hover:translate-x-1 group-hover:text-pine">
              →
            </span>
          </button>
        ))}
      </div>
      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="mt-6 font-mono text-mono-xs uppercase text-slate hover:text-ink"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
