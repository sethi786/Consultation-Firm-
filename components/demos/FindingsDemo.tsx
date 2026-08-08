"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * A live preview of the client portal's findings register, running on safe demo
 * data. Filter by severity, click a finding to see its detail and the framework
 * control it maps to — the same shape clients work in after an engagement.
 */

type Severity = "Critical" | "High" | "Medium" | "Low";
type Status = "Open" | "In progress" | "Remediated";

interface Finding {
  id: string;
  title: string;
  severity: Severity;
  asset: string;
  status: Status;
  control: string;
  detail: string;
}

const SEV_CHIP: Record<Severity, string> = {
  Critical: "bg-[var(--color-sev-crit-tint)] text-[var(--color-sev-crit)]",
  High: "bg-[var(--color-sev-high-tint)] text-[var(--color-sev-high)]",
  Medium: "bg-[var(--color-sev-med-tint)] text-[var(--color-sev-med)]",
  Low: "bg-[var(--color-sev-low-tint)] text-[var(--color-sev-low)]",
};

const SEV_BAR: Record<Severity, string> = {
  Critical: "bg-[var(--color-sev-crit)]",
  High: "bg-[var(--color-sev-high)]",
  Medium: "bg-[var(--color-sev-med)]",
  Low: "bg-[var(--color-sev-low)]",
};

const STATUS_CHIP: Record<Status, string> = {
  Open: "text-sev-crit",
  "In progress": "text-sev-high",
  Remediated: "text-status-remediated",
};

const FINDINGS: Finding[] = [
  { id: "NPT-014", title: "Standing Global Administrator accounts in Entra ID", severity: "Critical", asset: "Entra ID tenant", status: "Open", control: "ISO 27001 A.8.2", detail: "Four accounts hold permanent Global Administrator. Move to eligible-only assignments via PIM with approval and time-bound activation." },
  { id: "NPT-021", title: "Storage account exposed to public networks", severity: "Critical", asset: "sa-prod-eastus", status: "In progress", control: "CIS v8 3.3", detail: "Blob container allows anonymous read. Disable public network access and require private endpoints; rotate any keys that may have leaked." },
  { id: "NPT-032", title: "No 24/7 alerting on identity sign-in risk", severity: "High", asset: "Microsoft Sentinel", status: "Open", control: "NIST CSF DE.CM-01", detail: "High-risk sign-ins are logged but not triaged out of hours. Wire risk detections to an on-call rota with defined SLAs." },
  { id: "NPT-040", title: "Legacy TLS 1.0/1.1 accepted at the edge", severity: "Medium", asset: "app-gateway-01", status: "Open", control: "ISO 27001 A.8.24", detail: "The application gateway still negotiates TLS 1.0/1.1. Enforce TLS 1.2+ and modern cipher suites." },
  { id: "NPT-047", title: "Copilot plugin over-permissioned to SharePoint", severity: "High", asset: "M365 Copilot", status: "In progress", control: "NIST CSF PR.PS-06", detail: "An AI plugin can read every SharePoint site. Scope it to the sites the use case needs and monitor its outputs for data leakage." },
  { id: "NPT-052", title: "EDR missing on 6% of servers", severity: "Medium", asset: "Server fleet", status: "Remediated", control: "CIS v8 10.1", detail: "Coverage gaps closed via policy-enforced onboarding; verified by a retest showing 100% agent health." },
  { id: "NPT-058", title: "Secrets found in a build pipeline variable", severity: "High", asset: "CI/CD (Actions)", status: "Open", control: "ISO 27001 A.8.24", detail: "A database credential is stored as a plain pipeline variable. Move to a vault and rotate the exposed secret." },
  { id: "NPT-061", title: "No conditional access for unmanaged devices", severity: "Low", asset: "Entra ID tenant", status: "Open", control: "NIST CSF PR.AA-05", detail: "Unmanaged devices can reach corporate apps. Add a conditional-access policy requiring compliant or hybrid-joined devices." },
];

const SEV_ORDER: Severity[] = ["Critical", "High", "Medium", "Low"];

export function FindingsDemo() {
  const [filter, setFilter] = useState<Severity | "All">("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<Severity, number> = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    for (const f of FINDINGS) c[f.severity]++;
    return c;
  }, []);

  const rows = useMemo(
    () => (filter === "All" ? FINDINGS : FINDINGS.filter((f) => f.severity === filter)),
    [filter],
  );

  return (
    <div className="rounded-3xl bg-surface p-5 shadow-pop-sm md:p-8">
      {/* Severity distribution */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SEV_ORDER.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(filter === s ? "All" : s)}
            className={cn(
              "rounded-2xl border p-4 text-left transition-colors",
              filter === s ? "border-ink" : "border-rule hover:border-slate",
            )}
          >
            <span className="font-display text-h2 text-ink">{counts[s]}</span>
            <span className={cn("mt-1 block h-1.5 w-full rounded-full", SEV_BAR[s])} />
            <span className="mt-2 block font-mono text-mono-xs uppercase text-slate">{s}</span>
          </button>
        ))}
      </div>

      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-mono-xs uppercase text-slate">
          {filter === "All" ? "All findings" : `${filter} findings`} · {rows.length}
        </p>
        {filter !== "All" && (
          <button
            type="button"
            onClick={() => setFilter("All")}
            className="font-mono text-mono-xs uppercase text-slate underline underline-offset-2 hover:text-ink"
          >
            Clear filter ✕
          </button>
        )}
      </div>

      {/* Register */}
      <div className="overflow-hidden rounded-2xl border border-rule">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-rule bg-paper">
              <th scope="col" className="px-4 py-2.5 font-mono text-mono-xs uppercase text-slate">ID</th>
              <th scope="col" className="px-4 py-2.5 font-mono text-mono-xs uppercase text-slate">Finding</th>
              <th scope="col" className="hidden px-4 py-2.5 font-mono text-mono-xs uppercase text-slate sm:table-cell">Severity</th>
              <th scope="col" className="hidden px-4 py-2.5 font-mono text-mono-xs uppercase text-slate md:table-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => {
              const open = openId === f.id;
              return (
                <Fragment key={f.id}>
                  <tr
                    onClick={() => setOpenId(open ? null : f.id)}
                    className="cursor-pointer border-b border-rule/70 transition-colors hover:bg-paper"
                  >
                    <td className="whitespace-nowrap px-4 py-3 align-top font-mono text-caption text-ink">{f.id}</td>
                    <td className="px-4 py-3 align-top">
                      <span className="text-small text-ink">{f.title}</span>
                      <span className="mt-1 flex flex-wrap items-center gap-2 sm:hidden">
                        <span className={cn("rounded-full px-2 py-0.5 font-mono text-mono-xs uppercase", SEV_CHIP[f.severity])}>{f.severity}</span>
                        <span className={cn("font-mono text-mono-xs uppercase", STATUS_CHIP[f.status])}>{f.status}</span>
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 align-top sm:table-cell">
                      <span className={cn("rounded-full px-2.5 py-0.5 font-mono text-mono-xs uppercase", SEV_CHIP[f.severity])}>{f.severity}</span>
                    </td>
                    <td className="hidden px-4 py-3 align-top md:table-cell">
                      <span className={cn("font-mono text-mono-xs uppercase", STATUS_CHIP[f.status])}>{f.status}</span>
                    </td>
                  </tr>
                  {open && (
                    <tr className="border-b border-rule/70 bg-paper">
                      <td colSpan={4} className="px-4 py-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                          <p className="text-small text-ink md:col-span-8">{f.detail}</p>
                          <div className="md:col-span-4">
                            <p className="font-mono text-mono-xs uppercase text-slate">Affected asset</p>
                            <p className="mb-2 text-small text-ink">{f.asset}</p>
                            <p className="font-mono text-mono-xs uppercase text-slate">Maps to</p>
                            <p className="font-mono text-caption text-ink">{f.control}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          href="/contact"
          className="rounded bg-pine px-6 py-3 font-body text-small font-medium text-white transition-colors hover:bg-pine-lift"
        >
          Get your own register →
        </Link>
        <span className="font-mono text-mono-xs uppercase text-slate">Demo data · click a row to expand</span>
      </div>
    </div>
  );
}
