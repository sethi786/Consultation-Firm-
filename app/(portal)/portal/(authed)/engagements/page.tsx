import Link from "next/link";
import { requirePortalContext } from "@/lib/portal/session";
import { listEngagements } from "@/lib/portal/data";
import { PortalEyebrow, PortalPanel, StatusChip } from "@/components/portal/ui";

export default async function EngagementsPage() {
  const ctx = await requirePortalContext();
  const engagements = await listEngagements(ctx);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <PortalEyebrow>Engagements</PortalEyebrow>
        <h1 className="mt-1 text-h2 text-portal-ink">Timeline</h1>
      </div>

      {engagements.length === 0 ? (
        <PortalPanel className="p-6">
          <p className="text-body text-portal-ink">No engagements yet.</p>
          <p className="mt-1 text-small text-portal-ink-2">
            Scope → Assess → Report → Remediate → Verify. Your first engagement will
            appear here once it&apos;s scoped.
          </p>
        </PortalPanel>
      ) : (
        <div className="flex flex-col gap-3">
          {engagements.map((e) => (
            <Link key={e.id} href={`/portal/engagements/${e.id}`}>
              <PortalPanel className="flex items-center justify-between p-5 transition-colors hover:border-portal-brass/50">
                <div>
                  <p className="text-body text-portal-ink">{e.name}</p>
                  <p className="mt-0.5 font-mono text-mono-xs uppercase text-portal-ink-2">
                    {e.service ?? "—"}
                    {e.startDate ? ` · started ${new Date(e.startDate).toLocaleDateString("en-CA")}` : ""}
                  </p>
                </div>
                <StatusChip status={e.status ?? "active"} />
              </PortalPanel>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
