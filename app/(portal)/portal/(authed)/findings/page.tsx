import Link from "next/link";
import { requirePortalContext } from "@/lib/portal/session";
import { listFindings } from "@/lib/portal/data";
import { PortalEyebrow, PortalPanel, SeverityChip, StatusChip } from "@/components/portal/ui";
import { FindingsFilter } from "@/components/portal/FindingsFilter";

export default async function FindingsPage({
  searchParams,
}: {
  searchParams: Promise<{ severity?: string; status?: string; sort?: string }>;
}) {
  const ctx = await requirePortalContext();
  const { severity, status, sort } = await searchParams;
  const findings = await listFindings(ctx, { severity, status, sort });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <PortalEyebrow>Findings register</PortalEyebrow>
        <h1 className="mt-1 text-h2 text-portal-ink">
          {findings.length} finding{findings.length === 1 ? "" : "s"}
        </h1>
      </div>

      <FindingsFilter />

      {findings.length === 0 ? (
        <PortalPanel className="p-6">
          <p className="text-body text-portal-ink">No findings match this filter.</p>
          <p className="mt-1 text-small text-portal-ink-2">
            Clear the filters, or check back after your next assessment.
          </p>
        </PortalPanel>
      ) : (
        <PortalPanel className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Findings register</caption>
            <thead>
              <tr className="border-b border-portal-line">
                {["Ref", "Finding", "Severity", "Status", "Owner", "Due"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-4 py-3 font-mono text-mono-xs font-medium uppercase text-portal-ink-2"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {findings.map((f) => (
                <tr key={f.id} className="border-b border-portal-line/60 hover:bg-portal-bg/40">
                  <td className="px-4 py-3">
                    <Link
                      href={`/portal/findings/${f.id}`}
                      className="font-mono text-caption text-portal-brass hover:underline"
                    >
                      {f.ref}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/portal/findings/${f.id}`} className="text-small text-portal-ink hover:underline">
                      {f.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3"><SeverityChip severity={f.severity} /></td>
                  <td className="px-4 py-3"><StatusChip status={f.status} /></td>
                  <td className="px-4 py-3 font-mono text-mono-xs uppercase text-portal-ink-2">
                    {f.owner ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-mono-xs uppercase text-portal-ink-2">
                    {f.dueDate ? new Date(f.dueDate).toLocaleDateString("en-CA") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PortalPanel>
      )}
    </div>
  );
}
