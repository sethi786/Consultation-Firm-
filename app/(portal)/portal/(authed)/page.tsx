import Link from "next/link";
import { requirePortalContext } from "@/lib/portal/session";
import { getDashboard } from "@/lib/portal/data";
import { PortalPanel, PortalEyebrow, SeverityChip, StatusChip } from "@/components/portal/ui";

const SEV_ORDER = ["critical", "high", "medium", "low", "info"];

export default async function DashboardPage() {
  const ctx = await requirePortalContext();
  const data = await getDashboard(ctx);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <PortalEyebrow>Dashboard</PortalEyebrow>
          <h1 className="mt-1 text-h2 text-portal-ink">Welcome back.</h1>
        </div>
        <Link
          href="/portal/schedule"
          className="rounded bg-portal-brass px-4 py-2 font-body text-small font-medium text-portal-bg transition-opacity hover:opacity-90"
        >
          Book a call →
        </Link>
      </div>

      {/* Open findings by severity */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-mono text-mono-xs uppercase text-portal-ink-2">
            Open findings — {data.openFindings}
          </h2>
          <Link href="/portal/findings" className="font-mono text-mono-xs uppercase text-portal-brass">
            View register →
          </Link>
        </div>
        {data.openFindings === 0 ? (
          <PortalPanel className="p-6">
            <p className="text-body text-portal-ink">No open findings.</p>
            <p className="mt-1 text-small text-portal-ink-2">
              New findings appear here as your assessment progresses.
            </p>
          </PortalPanel>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {SEV_ORDER.map((sev) => (
              <PortalPanel key={sev} className="p-4">
                <p className="font-mono text-3xl tabular-nums text-portal-ink">
                  {data.bySeverity[sev] ?? 0}
                </p>
                <div className="mt-2">
                  <SeverityChip severity={sev} />
                </div>
              </PortalPanel>
            ))}
          </div>
        )}
      </section>

      {/* Engagements */}
      <section>
        <h2 className="mb-3 font-mono text-mono-xs uppercase text-portal-ink-2">Engagements</h2>
        {data.engagements.length === 0 ? (
          <PortalPanel className="p-6">
            <p className="text-body text-portal-ink">No active engagements.</p>
            <p className="mt-1 text-small text-portal-ink-2">
              Your engagement timeline will appear here once work is scoped.
            </p>
          </PortalPanel>
        ) : (
          <div className="flex flex-col gap-3">
            {data.engagements.map((e) => (
              <Link key={e.id} href={`/portal/engagements/${e.id}`}>
                <PortalPanel className="flex items-center justify-between p-4 transition-colors hover:border-portal-brass/50">
                  <div>
                    <p className="text-body text-portal-ink">{e.name}</p>
                    <p className="mt-0.5 font-mono text-mono-xs uppercase text-portal-ink-2">
                      {e.service ?? "—"}
                    </p>
                  </div>
                  <StatusChip status={e.status ?? "active"} />
                </PortalPanel>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Recent documents */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-mono text-mono-xs uppercase text-portal-ink-2">Recent documents</h2>
          <Link href="/portal/documents" className="font-mono text-mono-xs uppercase text-portal-brass">
            All documents →
          </Link>
        </div>
        {data.recentDocuments.length === 0 ? (
          <PortalPanel className="p-6">
            <p className="text-body text-portal-ink">No documents yet.</p>
            <p className="mt-1 text-small text-portal-ink-2">
              Reports, attestations, and runbooks will be published here.
            </p>
          </PortalPanel>
        ) : (
          <PortalPanel>
            <ul className="divide-y divide-portal-line">
              {data.recentDocuments.map((d) => (
                <li key={d.id} className="flex items-center justify-between px-4 py-3">
                  <span className="text-small text-portal-ink">{d.title}</span>
                  <span className="font-mono text-mono-xs uppercase text-portal-ink-2">
                    {d.type} · v{d.version}
                  </span>
                </li>
              ))}
            </ul>
          </PortalPanel>
        )}
      </section>
    </div>
  );
}
