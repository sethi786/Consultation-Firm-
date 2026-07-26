/**
 * Seed a working client-portal demo account so you can sign in immediately.
 *
 * Run:  pnpm seed:portal
 * (which is: payload run ./scripts/seed-portal.ts)
 *
 * Creates — idempotently — one organisation, one portal user with a password,
 * an active membership, an engagement with phases, and a few findings. Safe to
 * re-run: it upserts by a stable key rather than duplicating.
 *
 * Demo credentials printed at the end. CHANGE THE PASSWORD before any real use,
 * and never run this against a production tenant you don't want demo data in.
 */
import { getPayload, type Where } from "payload";
import config from "@payload-config";

const DEMO = {
  orgName: "Meridian Health (demo)",
  orgSlug: "meridian-health-demo",
  userEmail: "demo@waypointsecurity.com",
  userName: "Dana Okafor",
  password: "Portal-Demo-2026",
};

async function upsert<T extends Record<string, unknown>>(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: Parameters<typeof payload.find>[0]["collection"],
  where: Where,
  data: T,
): Promise<{ id: number }> {
  const { docs } = await payload.find({ collection, where, limit: 1, overrideAccess: true });
  if (docs[0]) {
    const updated = await payload.update({ collection, id: docs[0].id, data, overrideAccess: true });
    return updated as { id: number };
  }
  const created = await payload.create({ collection, data, overrideAccess: true });
  return created as { id: number };
}

// Top-level await so `payload run` keeps the process alive until we're done
// (a fire-and-forget call would let the CLI exit before any writes land).
const payload = await getPayload({ config });
{

  const org = await upsert(
    payload,
    "organisations",
    { slug: { equals: DEMO.orgSlug } },
    { name: DEMO.orgName, slug: DEMO.orgSlug },
  );

  const user = await upsert(
    payload,
    "portal-users",
    { email: { equals: DEMO.userEmail } },
    { email: DEMO.userEmail, name: DEMO.userName, password: DEMO.password, authProvider: "password" },
  );

  await upsert(
    payload,
    "memberships",
    { and: [{ user: { equals: user.id } }, { organisation: { equals: org.id } }] },
    { user: user.id, organisation: org.id, role: "owner", status: "active" },
  );

  const engagement = await upsert(
    payload,
    "engagements",
    { and: [{ organisation: { equals: org.id } }, { name: { equals: "Cloud & identity assessment" } }] },
    {
      organisation: org.id,
      name: "Cloud & identity assessment",
      service: "cloud-security",
      status: "reporting",
      startDate: "2026-06-01T00:00:00.000Z",
      phases: [
        { name: "Scope", status: "done", date: "2026-06-02T00:00:00.000Z" },
        { name: "Assess", status: "done", date: "2026-06-16T00:00:00.000Z" },
        { name: "Report", status: "in_progress", date: "2026-07-01T00:00:00.000Z" },
        { name: "Remediate", status: "upcoming" },
        { name: "Verify", status: "upcoming" },
      ],
    },
  );

  const findings = [
    { ref: "NPT-014", title: "Standing Global Administrator accounts in Entra ID", severity: "critical", status: "open", affectedAsset: "Entra ID tenant", owner: "IT Security", description: "Four accounts hold permanent Global Administrator. Move to eligible-only via PIM." },
    { ref: "NPT-021", title: "Storage account exposed to public networks", severity: "critical", status: "remediated", affectedAsset: "sa-prod-eastus", owner: "Cloud team", description: "Public network access disabled; private endpoints enforced. Verified on retest." },
    { ref: "NPT-032", title: "No 24/7 alerting on identity sign-in risk", severity: "high", status: "open", affectedAsset: "Microsoft Sentinel", owner: "SecOps", description: "High-risk sign-ins logged but not triaged out of hours." },
    { ref: "NPT-040", title: "Legacy TLS 1.0/1.1 accepted at the edge", severity: "medium", status: "open", affectedAsset: "app-gateway-01", owner: "Platform", description: "Enforce TLS 1.2+ and modern cipher suites." },
  ];

  for (const f of findings) {
    await upsert(
      payload,
      "findings",
      { and: [{ organisation: { equals: org.id } }, { ref: { equals: f.ref } }] },
      { organisation: org.id, engagement: engagement.id, ...f },
    );
  }

  console.info(`
✅ Portal demo seeded.

   Sign in at:  /portal/sign-in
   Email:       ${DEMO.userEmail}
   Password:    ${DEMO.password}
   Org:         ${DEMO.orgName}  (role: owner)

   ⚠  Change this password before any real use.
`);

  process.exit(0);
}
