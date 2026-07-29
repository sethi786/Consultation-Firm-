import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { ContactCTA } from "@/components/marketing/ContactCTA";

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

const WATCH = [
  "Identity & sign-in risk (Entra ID)",
  "Endpoints & servers (EDR)",
  "Cloud workloads (Azure & AWS)",
  "Email & collaboration (M365)",
  "Network & edge",
  "SaaS & AI application activity",
];

const INCLUDED = [
  "24/7/365 monitoring & triage",
  "Analytic-rule tuning & detection engineering",
  "Threat hunting on your estate",
  "Incident response with defined runbooks",
  "Monthly reporting & posture reviews",
  "A named lead, not a ticket queue",
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

      {/* The operate loop */}
      <Container as="section" className="py-12 md:py-28">
        <Eyebrow index={1}>How it runs</Eyebrow>
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

      {/* What we watch + what's included */}
      <section className="border-t border-rule bg-paper-sunk/40">
        <Container className="py-12 md:py-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow index={2}>What we watch</Eyebrow>
              <h2 className="mt-2 mb-6 text-h2 text-ink">Coverage across your estate</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {WATCH.map((w) => (
                  <li key={w} className="flex items-baseline gap-2 rounded-2xl border border-rule bg-surface px-4 py-3 text-small text-ink">
                    <span aria-hidden="true" className="text-pine">◆</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow index={3}>What&apos;s included</Eyebrow>
              <h2 className="mt-2 mb-6 text-h2 text-ink">Every engagement</h2>
              <ul className="flex flex-col gap-2">
                {INCLUDED.map((it) => (
                  <li key={it} className="flex items-baseline gap-3 border-b border-rule py-3 text-body text-ink">
                    <span aria-hidden="true" className="font-mono text-mono-xs text-pine">▪</span>
                    {it}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-small text-slate">
                Response-time SLAs are set per severity in your service agreement,
                not promised as a headline. We&apos;ll show you the numbers we hold
                other clients to during scoping.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ContactCTA prompt="Hand us the 2am pager. Book an assessment." service="managed-soc" />
    </>
  );
}
