import { requirePortalContext } from "@/lib/portal/session";
import { listMembers, listAuditLog } from "@/lib/portal/data";
import { canManageOrg } from "@/lib/portal/context";
import { PortalEyebrow, PortalPanel } from "@/components/portal/ui";
import { InviteForm } from "@/components/portal/InviteForm";

export default async function SettingsPage() {
  const ctx = await requirePortalContext();
  const members = await listMembers(ctx);
  const isAdmin = canManageOrg(ctx.role);
  const audit = isAdmin ? await listAuditLog(ctx) : [];

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div>
        <PortalEyebrow>Settings</PortalEyebrow>
        <h1 className="mt-1 text-h2 text-portal-ink">{ctx.orgName}</h1>
        <p className="mt-1 font-mono text-mono-xs uppercase text-portal-ink-2">
          You are signed in as {ctx.email} · {ctx.role}
        </p>
      </div>

      <section>
        <h2 className="mb-3 font-mono text-mono-xs uppercase text-portal-ink-2">Team</h2>
        <PortalPanel className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-portal-line">
                {["Email", "Role", "Status"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-mono text-mono-xs font-medium uppercase text-portal-ink-2">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m) => {
                const user = typeof m.user === "object" ? m.user : null;
                return (
                  <tr key={m.id} className="border-b border-portal-line/60">
                    <td className="px-4 py-3 text-small text-portal-ink">{user?.email ?? "—"}</td>
                    <td className="px-4 py-3 font-mono text-mono-xs uppercase text-portal-ink-2">{m.role}</td>
                    <td className="px-4 py-3 font-mono text-mono-xs uppercase text-portal-ink-2">{m.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </PortalPanel>

        {isAdmin && (
          <div className="mt-4">
            <p className="mb-2 font-mono text-mono-xs uppercase text-portal-ink-2">Invite a teammate</p>
            <InviteForm />
            <p className="mt-2 font-mono text-mono-xs uppercase text-portal-ink-2/70">
              {"{{TODO: send an invite email; for now the membership is created as “invited”.}}"}
            </p>
          </div>
        )}
      </section>

      {isAdmin && (
        <section>
          <h2 className="mb-3 font-mono text-mono-xs uppercase text-portal-ink-2">Audit log</h2>
          {audit.length === 0 ? (
            <PortalPanel className="p-6">
              <p className="text-small text-portal-ink-2">No audited events yet.</p>
            </PortalPanel>
          ) : (
            <PortalPanel className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-portal-line">
                    {["Action", "Actor", "Target", "When"].map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 font-mono text-mono-xs font-medium uppercase text-portal-ink-2">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {audit.map((a) => (
                    <tr key={a.id} className="border-b border-portal-line/60">
                      <td className="px-4 py-3 font-mono text-mono-xs uppercase text-portal-ink">{a.action}</td>
                      <td className="px-4 py-3 text-small text-portal-ink-2">{a.actorEmail}</td>
                      <td className="px-4 py-3 font-mono text-mono-xs uppercase text-portal-ink-2">
                        {a.targetType ? `${a.targetType}#${a.targetId}` : "—"}
                      </td>
                      <td className="px-4 py-3 font-mono text-mono-xs uppercase text-portal-ink-2">
                        {a.createdAt ? new Date(a.createdAt).toLocaleString("en-CA") : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </PortalPanel>
          )}
        </section>
      )}
    </div>
  );
}
