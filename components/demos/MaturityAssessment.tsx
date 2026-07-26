"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Interactive security-maturity self-assessment. Six real questions across the
 * dimensions our engagements actually measure; each answer scores 0/2/4. The
 * result gives a band, a filling score ring, and the weakest dimensions — then
 * routes to booking. No data leaves the browser; it's a taste of the real thing.
 */

interface Question {
  id: string;
  dimension: string;
  prompt: string;
  options: { label: string; score: 0 | 2 | 4 }[];
}

const QUESTIONS: Question[] = [
  {
    id: "priv",
    dimension: "Privileged access",
    prompt: "How is admin / privileged access granted today?",
    options: [
      { label: "Standing admin accounts", score: 0 },
      { label: "Some just-in-time elevation", score: 2 },
      { label: "Just-in-time everywhere, with approval", score: 4 },
    ],
  },
  {
    id: "mfa",
    dimension: "Identity",
    prompt: "Multi-factor authentication is enforced for…",
    options: [
      { label: "Some users", score: 0 },
      { label: "Most users", score: 2 },
      { label: "Everyone, including admins & service accounts", score: 4 },
    ],
  },
  {
    id: "detect",
    dimension: "Detection",
    prompt: "Your security logs are…",
    options: [
      { label: "Not centralised", score: 0 },
      { label: "Centralised, but no 24/7 eyes", score: 2 },
      { label: "Centralised with 24/7 monitoring", score: 4 },
    ],
  },
  {
    id: "cloud",
    dimension: "Cloud posture",
    prompt: "Cloud misconfigurations are…",
    options: [
      { label: "Largely unknown", score: 0 },
      { label: "Scanned occasionally", score: 2 },
      { label: "Continuously scanned & remediated", score: 4 },
    ],
  },
  {
    id: "ir",
    dimension: "Incident readiness",
    prompt: "If you were breached tonight, you would…",
    options: [
      { label: "Improvise", score: 0 },
      { label: "Have a plan, but untested", score: 2 },
      { label: "Run a tested response runbook", score: 4 },
    ],
  },
  {
    id: "framework",
    dimension: "Governance",
    prompt: "Do you map controls to a framework (NIST / ISO / CIS)?",
    options: [
      { label: "No", score: 0 },
      { label: "Informally", score: 2 },
      { label: "Yes, and we track it", score: 4 },
    ],
  },
];

const MAX = QUESTIONS.length * 4;

type Band = { name: string; blurb: string; ring: string; chip: string };

function band(pct: number): Band {
  if (pct < 35)
    return {
      name: "Exposed",
      blurb: "There are gaps an attacker would find first. A focused assessment turns this into a prioritised plan fast.",
      ring: "text-rose",
      chip: "bg-rose-soft text-rose-ink",
    };
  if (pct < 65)
    return {
      name: "Developing",
      blurb: "Good instincts, uneven coverage. The value now is sequencing — fixing what actually reduces risk first.",
      ring: "text-amber",
      chip: "bg-amber-soft text-amber-ink",
    };
  if (pct < 88)
    return {
      name: "Managed",
      blurb: "A solid program. An assessment sharpens the edges and proves it with evidence you can show a board.",
      ring: "text-sky",
      chip: "bg-sky-soft text-sky-ink",
    };
  return {
    name: "Resilient",
    blurb: "Strong posture. We'd validate it under adversarial testing and help you keep the bar high as you scale.",
    ring: "text-mint",
    chip: "bg-mint-soft text-mint-ink",
  };
}

export function MaturityAssessment() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const total = useMemo(
    () => Object.values(answers).reduce((a, b) => a + b, 0),
    [answers],
  );
  const pct = Math.round((total / MAX) * 100);
  const b = band(pct);

  const weakest = useMemo(
    () =>
      QUESTIONS.filter((q) => (answers[q.id] ?? 0) <= 2)
        .map((q) => q.dimension)
        .slice(0, 3),
    [answers],
  );

  function choose(qId: string, score: number) {
    const next = { ...answers, [qId]: score };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else setDone(true);
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  if (done) {
    const dash = 2 * Math.PI * 52;
    return (
      <div className="rounded-3xl bg-white p-6 shadow-pop-sm md:p-10">
        <p className="font-mono text-mono-xs uppercase text-slate">Your maturity snapshot</p>
        <div className="mt-6 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="flex items-center gap-6">
            <svg viewBox="0 0 120 120" className="h-32 w-32 shrink-0 -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-rule)" strokeWidth="12" />
              <circle
                cx="60" cy="60" r="52" fill="none" strokeWidth="12" strokeLinecap="round"
                className={cn(b.ring, "motion-safe:transition-[stroke-dashoffset] motion-safe:duration-1000 motion-safe:ease-doc")}
                stroke="currentColor"
                strokeDasharray={dash}
                strokeDashoffset={dash * (1 - pct / 100)}
              />
            </svg>
            <div className="-rotate-0">
              <p className="font-display text-[3.5rem] leading-none text-ink">{pct}</p>
              <span className={cn("mt-2 inline-block rounded-full px-3 py-1 font-mono text-mono-xs uppercase", b.chip)}>
                {b.name}
              </span>
            </div>
          </div>
          <div>
            <p className="text-body text-ink">{b.blurb}</p>
            {weakest.length > 0 && (
              <div className="mt-4">
                <p className="font-mono text-mono-xs uppercase text-slate">Focus areas</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {weakest.map((w) => (
                    <li key={w} className="rounded-full border border-rule px-3 py-1 text-caption text-ink">
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-coral px-6 py-3 font-body text-small font-medium text-white shadow-pop-sm transition-transform hover:-translate-y-0.5"
          >
            Book an assessment →
          </Link>
          <button
            type="button"
            onClick={reset}
            className="font-body text-small text-slate underline decoration-rule underline-offset-4 hover:text-ink"
          >
            Retake
          </button>
        </div>
        <p className="mt-4 font-mono text-mono-xs uppercase text-slate/70">
          Indicative only · nothing leaves your browser
        </p>
      </div>
    );
  }

  const q = QUESTIONS[step]!;
  return (
    <div className="rounded-3xl bg-white p-6 shadow-pop-sm md:p-10">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-mono-xs uppercase text-slate">
          {q.dimension} · {step + 1} / {QUESTIONS.length}
        </p>
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-rule">
          <div
            className="h-full rounded-full bg-coral motion-safe:transition-[width] motion-safe:duration-500 motion-safe:ease-doc"
            style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>
      <h3 className="mt-5 text-h3 text-ink">{q.prompt}</h3>
      <div className="mt-6 flex flex-col gap-3">
        {q.options.map((o) => (
          <button
            key={o.label}
            type="button"
            onClick={() => choose(q.id, o.score)}
            className="group flex items-center justify-between rounded-2xl border border-rule bg-paper px-5 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-coral hover:shadow-pop-sm"
          >
            <span className="text-body text-ink">{o.label}</span>
            <span aria-hidden="true" className="font-mono text-mono-xs text-slate transition-transform group-hover:translate-x-1 group-hover:text-coral-ink">
              →
            </span>
          </button>
        ))}
      </div>
      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="mt-5 font-body text-small text-slate underline decoration-rule underline-offset-4 hover:text-ink"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
