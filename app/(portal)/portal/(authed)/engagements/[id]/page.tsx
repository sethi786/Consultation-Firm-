import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/cn";
import { requirePortalContext } from "@/lib/portal/session";
import { getEngagement } from "@/lib/portal/data";
import { PortalPanel, StatusChip } from "@/components/portal/ui";

const CANONICAL_PHASES = ["Scope", "Assess", "Report", "Remediate", "Verify"];

export default async function EngagementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const ctx = await requirePortalContext();
  const { id } = await params;
  const engagement = await getEngagement(ctx, id);
  if (!engagement) notFound();

  // Fall back to the canonical five phases if none are recorded yet.
  const phases =
    engagement.phases && engagement.phases.length > 0
      ? engagement.phases
      : CANONICAL_PHASES.map((name) => ({ name, status: "upcoming" as const, date: undefined }));

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <Link href="/portal/engagements" className="font-mono text-mono-xs uppercase text-portal-ink-2 hover:text-portal-ink">
          ← Timeline
        </Link>
        <div className="mt-3 flex items-center gap-3">
          <h1 className="text-h2 text-portal-ink">{engagement.name}</h1>
          <StatusChip status={engagement.status ?? "active"} />
        </div>
        <p className="mt-1 font-mono text-mono-xs uppercase text-portal-ink-2">
          {engagement.service ?? "—"}
        </p>
      </div>

      <ol className="flex flex-col">
        {phases.map((p, i) => {
          const done = p.status === "done";
          const active = p.status === "in_progress";
          return (
            <li key={i} className="flex gap-4">
              {/* Rail */}
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "mt-1 h-3 w-3 shrink-0 rounded-full border",
                    done
                      ? "border-status-remediated bg-status-remediated"
                      : active
                        ? "border-portal-brass bg-portal-brass"
                        : "border-portal-line bg-transparent",
                  )}
                />
                {i < phases.length - 1 && <span className="w-px flex-1 bg-portal-line" />}
              </div>
              <PortalPanel className="mb-3 flex-1 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-body text-portal-ink">{p.name}</p>
                  <span className="font-mono text-mono-xs uppercase text-portal-ink-2">
                    {(p.status ?? "upcoming").replace(/_/g, " ")}
                  </span>
                </div>
                {p.date && (
                  <p className="mt-1 font-mono text-mono-xs uppercase text-portal-ink-2">
                    {new Date(p.date).toLocaleDateString("en-CA")}
                  </p>
                )}
              </PortalPanel>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
