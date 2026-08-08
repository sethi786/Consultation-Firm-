import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sample findings report — Waypoint",
  description:
    "An illustrative sample of the findings report and control register a client receives after a Waypoint assessment. Sample data only.",
  robots: { index: false },
  alternates: { canonical: "/sample-report" },
};

const SEV: Record<string, string> = {
  Critical: "bg-sev-crit-tint text-sev-crit ring-sev-crit/25",
  High: "bg-sev-high-tint text-sev-high ring-sev-high/25",
  Medium: "bg-sev-med-tint text-sev-med ring-sev-med/25",
  Low: "bg-sev-low-tint text-sev-low ring-sev-low/25",
};

const FINDINGS = [
  { id: "WP-001", title: "Standing global administrator accounts without PIM", sev: "Critical", asset: "Entra ID tenant", ref: "NIST PR.AA-05", status: "Open" },
  { id: "WP-002", title: "Storage account exposed to public network", sev: "Critical", asset: "Azure — prod subscription", ref: "CIS 3.3", status: "In progress" },
  { id: "WP-004", title: "Legacy authentication not blocked", sev: "High", asset: "Entra ID Conditional Access", ref: "ISO A.8.5", status: "Open" },
  { id: "WP-007", title: "No 24/7 alerting on identity sign-in risk", sev: "High", asset: "Microsoft Sentinel", ref: "NIST DE.CM-01", status: "Open" },
  { id: "WP-011", title: "Backups not tested for restore in 12 months", sev: "Medium", asset: "Backup platform", ref: "CIS 11.5", status: "Open" },
  { id: "WP-015", title: "Secrets committed to source control history", sev: "Medium", asset: "Repository — internal", ref: "ISO A.8.24", status: "Remediated" },
];

const MATURITY = [
  { dim: "Identity & access", current: 2, target: 4 },
  { dim: "Cloud posture", current: 2, target: 4 },
  { dim: "Detection & response", current: 1, target: 4 },
  { dim: "Data & AI", current: 2, target: 3 },
  { dim: "Governance & compliance", current: 3, target: 4 },
  { dim: "Resilience & recovery", current: 2, target: 4 },
];

const ROADMAP = [
  { phase: "0–30 days", items: ["Enrol all admins in PIM; enforce phishing-resistant MFA", "Close public exposure on the storage account", "Block legacy authentication (report-only → enforce)"] },
  { phase: "30–90 days", items: ["Stand up 24/7 sign-in risk alerting and triage", "Run a restore test and document recovery time", "Rotate and vault the exposed secrets; add pre-commit scanning"] },
  { phase: "90+ days", items: ["Move to continuous posture management with SLAs", "Quarterly access reviews and tabletop exercises", "Re-test and close findings only on evidence"] },
];

function Bar({ current, target }: { current: number; target: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${current} of ${target}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-2 w-4 rounded-sm ${n <= current ? "bg-pine" : n <= target ? "bg-brass/40" : "bg-rule"}`}
        />
      ))}
    </span>
  );
}

export default function SampleReportPage() {
  return (
    <div data-theme="light" className="min-h-dvh bg-paper text-ink">
      {/* Screen-only toolbar */}
      <div className="no-print sticky top-0 z-10 border-b border-rule bg-paper">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
          <Link href="/" className="font-mono text-mono-xs uppercase text-slate hover:text-ink">← Waypoint</Link>
          <a
            href="/waypoint-sample-findings-report.pdf"
            className="rounded bg-pine px-4 py-2 font-body text-small font-medium text-white transition-colors hover:bg-pine-lift"
          >
            Download PDF
          </a>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* Cover */}
        <p className="inline-flex items-center gap-2 rounded-full bg-brass/15 px-3 py-1 font-mono text-mono-xs uppercase text-brass-lift ring-1 ring-brass/30">
          Sample · illustrative data only
        </p>
        <h1 className="mt-6 font-display text-[2.5rem] leading-tight text-ink">Security assessment — findings report</h1>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-rule py-5 font-mono text-mono-xs uppercase text-slate sm:grid-cols-4">
          <div><dt className="text-slate/60">Client</dt><dd className="mt-1 text-ink">Mid-market SaaS (illustrative)</dd></div>
          <div><dt className="text-slate/60">Prepared by</dt><dd className="mt-1 text-ink">Waypoint</dd></div>
          <div><dt className="text-slate/60">Engagement</dt><dd className="mt-1 text-ink">Assessment</dd></div>
          <div><dt className="text-slate/60">Frameworks</dt><dd className="mt-1 text-ink">NIST CSF · ISO 27001 · CIS</dd></div>
        </dl>

        {/* Executive summary */}
        <section className="mt-10">
          <h2 className="font-mono text-mono-xs uppercase text-slate">§ 01 — Executive summary</h2>
          <p className="mt-3 text-body text-slate">
            This assessment reviewed identity, cloud, detection, data, and resilience
            against NIST CSF 2.0, ISO/IEC 27001:2022 and CIS Controls v8. Overall
            maturity is <strong className="text-ink">developing</strong>: governance is
            reasonable, but standing privileged access, an exposed storage account, and
            the absence of out-of-hours detection concentrate the real risk. The
            findings below are prioritised by exploitability, with a 90-day roadmap.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[["Critical", "2"], ["High", "5"], ["Medium", "8"], ["Low", "4"]].map(([label, n]) => (
              <div key={label} className="rounded-xl border border-rule bg-surface p-4">
                <div className="font-display text-h2 text-ink">{n}</div>
                <div className={`mt-1 inline-flex rounded-full px-2 py-0.5 font-mono text-mono-xs uppercase ring-1 ring-inset ${SEV[label]}`}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Maturity snapshot */}
        <section className="mt-10">
          <h2 className="font-mono text-mono-xs uppercase text-slate">§ 02 — Maturity snapshot</h2>
          <table className="mt-3 w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-rule font-mono text-mono-xs uppercase text-slate">
                <th className="py-2">Dimension</th>
                <th className="py-2">Current → target</th>
              </tr>
            </thead>
            <tbody>
              {MATURITY.map((m) => (
                <tr key={m.dim} className="border-b border-rule/70">
                  <td className="py-3 text-small text-ink">{m.dim}</td>
                  <td className="py-3"><Bar current={m.current} target={m.target} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Findings register */}
        <section className="mt-10">
          <h2 className="font-mono text-mono-xs uppercase text-slate">§ 03 — Findings register (extract)</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-rule font-mono text-mono-xs uppercase text-slate">
                  <th className="py-2 pr-3">ID</th>
                  <th className="py-2 pr-3">Finding</th>
                  <th className="py-2 pr-3">Severity</th>
                  <th className="py-2 pr-3">Control</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {FINDINGS.map((f) => (
                  <tr key={f.id} className="border-b border-rule/70 align-top">
                    <td className="py-3 pr-3 font-mono text-mono-xs text-slate">{f.id}</td>
                    <td className="py-3 pr-3 text-small text-ink">{f.title}<span className="block font-mono text-mono-xs uppercase text-slate">{f.asset}</span></td>
                    <td className="py-3 pr-3"><span className={`inline-flex rounded-full px-2 py-0.5 font-mono text-mono-xs uppercase ring-1 ring-inset ${SEV[f.sev]}`}>{f.sev}</span></td>
                    <td className="py-3 pr-3 font-mono text-mono-xs text-slate">{f.ref}</td>
                    <td className="py-3 font-mono text-mono-xs uppercase text-slate">{f.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-mono-xs uppercase text-slate/60">Extract of 19 findings · full register delivered with evidence attachments</p>
        </section>

        {/* Roadmap */}
        <section className="mt-10">
          <h2 className="font-mono text-mono-xs uppercase text-slate">§ 04 — Remediation roadmap</h2>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ROADMAP.map((r) => (
              <div key={r.phase} className="rounded-xl border border-rule bg-surface p-5">
                <p className="font-mono text-mono-xs uppercase text-brass-lift">{r.phase}</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {r.items.map((it) => (
                    <li key={it} className="flex items-baseline gap-2 text-small text-slate">
                      <span aria-hidden="true" className="text-pine">—</span>{it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-12 border-t border-rule pt-6 font-mono text-mono-xs uppercase text-slate/60">
          Illustrative sample. Data is fictional and does not represent a real client.
          A real engagement delivers the full register, evidence, and a re-test that
          closes findings only when the fix holds. © {new Date().getFullYear()} Waypoint.
        </footer>

        <div className="no-print mt-10">
          <Link href="/contact" className="rounded bg-pine px-6 py-3 font-body text-small font-medium text-white transition-colors hover:bg-pine-lift">
            Get this for your environment — book an assessment
          </Link>
        </div>
      </article>
    </div>
  );
}
