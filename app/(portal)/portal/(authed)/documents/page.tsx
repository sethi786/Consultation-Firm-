import { requirePortalContext } from "@/lib/portal/session";
import { listDocuments } from "@/lib/portal/data";
import { PortalEyebrow, PortalPanel } from "@/components/portal/ui";

export default async function DocumentsPage() {
  const ctx = await requirePortalContext();
  const docs = await listDocuments(ctx);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <PortalEyebrow>Documents</PortalEyebrow>
        <h1 className="mt-1 text-h2 text-portal-ink">Report vault</h1>
        <p className="mt-1 text-small text-portal-ink-2">
          Every download is written to your organisation&apos;s audit log.
        </p>
      </div>

      {docs.length === 0 ? (
        <PortalPanel className="p-6">
          <p className="text-body text-portal-ink">No documents yet.</p>
          <p className="mt-1 text-small text-portal-ink-2">
            Reports, attestations, and runbooks will be published here as your
            engagement produces them.
          </p>
        </PortalPanel>
      ) : (
        <PortalPanel className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-portal-line">
                {["Title", "Type", "Version", ""].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-mono text-mono-xs font-medium uppercase text-portal-ink-2">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => {
                const hasFile = typeof d.file === "object" && d.file;
                return (
                  <tr key={d.id} className="border-b border-portal-line/60">
                    <td className="px-4 py-3 text-small text-portal-ink">{d.title}</td>
                    <td className="px-4 py-3 font-mono text-mono-xs uppercase text-portal-ink-2">{d.type}</td>
                    <td className="px-4 py-3 font-mono text-mono-xs uppercase text-portal-ink-2">v{d.version}</td>
                    <td className="px-4 py-3 text-right">
                      {hasFile ? (
                        <a
                          href={`/portal/documents/${d.id}/download`}
                          className="font-mono text-mono-xs uppercase text-portal-brass hover:underline"
                        >
                          Download →
                        </a>
                      ) : (
                        <span className="font-mono text-mono-xs uppercase text-portal-ink-2">Pending</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </PortalPanel>
      )}
    </div>
  );
}
