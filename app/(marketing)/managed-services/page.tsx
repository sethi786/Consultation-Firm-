import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, WaypointMark, DomainIcon } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";

/** Layered tier icon — one/two/three stacked marks (the eSentire-Atlas move,
 *  drawn with our own mark). Purely decorative. */
function TierMark({ tiers }: { tiers: 1 | 2 | 3 }) {
  return (
    <span aria-hidden="true" className="relative inline-block h-10 w-10">
      {Array.from({ length: tiers }).map((_, i) => (
        <span
          key={i}
          className="absolute left-0"
          style={{ top: `${(tiers - 1 - i) * 6}px`, opacity: 0.35 + (0.65 * (i + 1)) / tiers }}
        >
          <WaypointMark className="h-7 w-7 text-pine" />
        </span>
      ))}
    </span>
  );
}

export const metadata: Metadata = {
  title: "Managed services — MDR / managed SOC",
  description:
    "Your security operations, run by us. 24/7 managed detection and response, continuous posture management and compliance — measured against agreed SLAs.",
  alternates: { canonical: "/managed-services" },
};

const LOOP = [
  { n: "01", title: "Detect", body: "Signals from identity, endpoint, cloud, email and network are correlated in your SIEM/XDR — tuned to cut noise, not just collect it." },
  { n: "02", title: "Triage", body: "Analysts validate every alert that matters and drop the ones that don't, so your team isn't paged at 2am for a false positive." },
  { n: "03", title: "Respond", body: "Contain, isolate and remediate to the actions agreed in your runbook — with your approval gates where you want them." },
  { n: "04", title: "Report", body: "Monthly reviews with the metrics that matter: dwell time, alert volume, what we tuned, and what changed in your posture." },
];

/** Named MDR packages — our own productization (eSentire-Atlas register).
 *  Composed from the real service catalogue; pricing stays in scoping (§5). */
const PACKAGES: {
  tiers: 1 | 2 | 3;
  name: string;
  line: string;
  includes: string[];
  not: string;
}[] = [
  {
    tiers: 1,
    name: "Waypoint MDR Core",
    line: "24/7 eyes on identity and endpoint — the two doors attackers actually use.",
    includes: [
      "24/7/365 monitoring & triage",
      "Identity & endpoint telemetry (Entra ID, EDR)",
      "Incident response runbooks",
      "Monthly reporting",
    ],
    not: "No cloud/SaaS telemetry; no threat hunting.",
  },
  {
    tiers: 2,
    name: "Waypoint MDR Advanced",
    line: "Full-estate coverage with detection engineering that cuts the noise.",
    includes: [
      "Everything in Core",
      "Cloud, email & network telemetry",
      "Analytic-rule tuning & detection engineering",
      "Quarterly threat hunting",
    ],
    not: "No AI-application telemetry; hunting quarterly, not continuous.",
  },
  {
    tiers: 3,
    name: "Waypoint MDR Complete",
    line: "The full loop — including the AI systems the rest of the market ignores.",
    includes: [
      "Everything in Advanced",
      "SaaS & AI application activity (copilots, agents)",
      "Continuous threat hunting",
      "Named lead + posture reviews with your board pack",
    ],
    not: "Compliance audits are a separate engagement.",
  },
];

/** 24/7 coverage signals with their practice-area icons. */
const COVERAGE: { label: string; domain: string; tone: string; iconTone: string }[] = [
  { label: "Identity", domain: "Identity & Access", tone: "bg-violet-soft", iconTone: "text-violet-ink" },
  { label: "Endpoint", domain: "Endpoint & Application", tone: "bg-mint-soft", iconTone: "text-mint-ink" },
  { label: "Cloud", domain: "Cloud & Infrastructure", tone: "bg-sky-soft", iconTone: "text-sky-ink" },
  { label: "Email & M365", domain: "Modern Workplace", tone: "bg-orange-soft", iconTone: "text-orange-ink" },
  { label: "Network", domain: "Networking", tone: "bg-fuchsia-soft", iconTone: "text-fuchsia-ink" },
  { label: "AI & SaaS", domain: "AI Operations", tone: "bg-indigo-soft", iconTone: "text-indigo-ink" },
];

export default function ManagedServicesPage() {
  return (
    <>
      {/* Flagship hero — dark, calm */}
      <section className="relative overflow-hidden bg-night">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(65% 80% at 15% 5%, rgba(79,157,130,0.22), transparent 65%)",
          }}
        />
        <Container className="relative py-12 md:py-28">
          <p className="font-mono text-mono-xs uppercase text-white/60">Managed services · Operate</p>
          <h1 className="mt-4 max-w-4xl font-display text-display text-white">
            Your security operations, run by us.
          </h1>
          <p className="mt-6 max-w-measure text-lede text-white/80">
            Managed detection and response, continuous posture management and
            compliance — 24/7, measured against the SLAs we agree, reported in
            language your board understands. You keep control; we keep watch.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact?service=managed-soc"
              className="rounded bg-pine px-6 py-3 font-body text-small font-medium text-white transition-colors hover:bg-pine-lift"
            >
              Book an assessment
            </Link>
            <Link
              href="/services/managed-soc"
              className="rounded border border-white/25 bg-surface/5 px-6 py-3 font-body text-small font-medium text-white transition-colors hover:border-white/60"
            >
              Managed SOC / MDR detail →
            </Link>
          </div>
        </Container>
      </section>

      {/* Named MDR packages */}
      <Container as="section" className="py-14 md:py-28">
        <Eyebrow index={1}>Packages</Eyebrow>
        <h2 className="mt-2 mb-3 text-h2 text-ink">Pick your coverage. Grow into the next.</h2>
        <p className="mb-10 max-w-measure text-body text-slate">
          Three ways to run detection and response with us. Pricing is fixed per
          package during scoping — we don&apos;t do surprise invoices.
        </p>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PACKAGES.map((p) => (
            <div
              key={p.name}
              className="card-lift flex flex-col rounded-2xl border border-rule bg-surface p-7"
            >
              <TierMark tiers={p.tiers} />
              <h3 className="mt-4 font-display text-h3 text-ink">{p.name}</h3>
              <p className="mt-2 text-small text-slate">{p.line}</p>
              <ul className="mt-5 flex flex-1 flex-col gap-2 border-t border-rule pt-5">
                {p.includes.map((it) => (
                  <li key={it} className="flex items-baseline gap-2 text-small text-ink">
                    <span aria-hidden="true" className="text-pine">—</span>
                    {it}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-mono-xs uppercase tracking-mono text-slate">
                Not included: {p.not}
              </p>
              <Link
                href="/contact?service=managed-soc"
                className="mt-6 rounded bg-pine px-5 py-2.5 text-center font-body text-small font-medium text-white transition-colors hover:bg-pine-lift"
              >
                Book an assessment
              </Link>
            </div>
          ))}
        </div>

        {/* 24/7 coverage row */}
        <div className="mt-12 rounded-2xl border border-rule bg-surface p-6 md:p-8">
          <p className="mb-5 font-mono text-mono-xs uppercase tracking-mono text-slate">
            24/7 coverage across
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
            {COVERAGE.map((c) => (
              <li key={c.label} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${c.tone}`}
                >
                  <DomainIcon domain={c.domain} className={`h-5 w-5 ${c.iconTone}`} />
                </span>
                <span className="text-small font-medium text-ink">{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* The operate loop */}
      <Container as="section" className="border-t border-rule py-12 md:py-28">
        <Eyebrow index={2}>How it runs</Eyebrow>
        <h2 className="mt-2 mb-8 text-h2 text-ink">A loop, not a ticket queue.</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LOOP.map((s) => (
            <div key={s.n} className="rounded-2xl border border-rule bg-surface p-6">
              <span className="font-mono text-mono-xs uppercase text-pine">{s.n}</span>
              <h3 className="mt-2 text-h3 text-ink">{s.title}</h3>
              <p className="mt-2 text-small text-slate">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <ContactCTA prompt="Hand us the 2am pager. Book an assessment." service="managed-soc" />
    </>
  );
}
