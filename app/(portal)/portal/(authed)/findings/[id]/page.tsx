import Link from "next/link";
import { notFound } from "next/navigation";
import { requirePortalContext } from "@/lib/portal/session";
import { getFinding } from "@/lib/portal/data";
import { canWrite } from "@/lib/portal/context";
import { PortalEyebrow, PortalPanel, SeverityChip, StatusChip } from "@/components/portal/ui";
import { CommentForm, RemediateForm } from "@/components/portal/FindingActions";

export default async function FindingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const ctx = await requirePortalContext();
  const { id } = await params;
  const finding = await getFinding(ctx, id);
  if (!finding) notFound();

  const writable = canWrite(ctx.role);
  const comments = finding.comments ?? [];

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <Link href="/portal/findings" className="font-mono text-mono-xs uppercase text-portal-ink-2 hover:text-portal-ink">
          ← Findings
        </Link>
        <div className="mt-3 flex items-center gap-3">
          <span className="font-mono text-caption text-portal-ink-2">{finding.ref}</span>
          <SeverityChip severity={finding.severity} />
          <StatusChip status={finding.status} />
        </div>
        <h1 className="mt-2 text-h2 text-portal-ink">{finding.title}</h1>
      </div>

      <PortalPanel className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4">
        {[
          ["Affected asset", finding.affectedAsset ?? "—"],
          ["Owner", finding.owner ?? "—"],
          ["Due", finding.dueDate ? new Date(finding.dueDate).toLocaleDateString("en-CA") : "—"],
          ["Status", finding.status.replace(/_/g, " ")],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="font-mono text-mono-xs uppercase text-portal-ink-2">{k}</p>
            <p className="mt-1 text-small text-portal-ink">{v}</p>
          </div>
        ))}
      </PortalPanel>

      {finding.description && (
        <section>
          <PortalEyebrow>Detail</PortalEyebrow>
          <p className="mt-2 whitespace-pre-line text-body text-portal-ink">{finding.description}</p>
        </section>
      )}

      <section>
        <PortalEyebrow>Remediation</PortalEyebrow>
        <div className="mt-3">
          <RemediateForm findingId={finding.id} status={finding.status} canWrite={writable} />
        </div>
      </section>

      <section>
        <PortalEyebrow>Comments</PortalEyebrow>
        <div className="mt-3 flex flex-col gap-3">
          {comments.length === 0 ? (
            <p className="text-small text-portal-ink-2">No comments yet.</p>
          ) : (
            comments.map((c, i) => (
              <PortalPanel key={i} className="p-4">
                <p className="font-mono text-mono-xs uppercase text-portal-ink-2">
                  {c.authorEmail ?? "—"}
                  {c.createdAt ? ` · ${new Date(c.createdAt).toLocaleDateString("en-CA")}` : ""}
                </p>
                <p className="mt-1.5 whitespace-pre-line text-small text-portal-ink">{c.body}</p>
              </PortalPanel>
            ))
          )}
        </div>
        <div className="mt-4">
          <CommentForm findingId={finding.id} canWrite={writable} />
        </div>
      </section>
    </div>
  );
}
