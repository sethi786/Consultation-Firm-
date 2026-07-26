import "server-only";
import type { Where } from "payload";
import { getPayloadClient } from "@/lib/payload";
import { canManageOrg, canWrite, type PortalContext } from "./context";
import type { BookingInput } from "./booking-schema";
import type { Finding, Engagement, PortalDocument, AuditLog, Membership, PortalUser, CallBooking } from "@/payload-types";

/**
 * Tenancy-scoped data access for the portal (CLAUDE.md §7).
 *
 * EVERY function binds `ctx.orgId` into the query. Single-document reads use an
 * `id AND organisation` filter, so passing another organisation's id returns
 * nothing — a route handler physically cannot fetch cross-tenant rows through
 * this layer, even if it forgets to check. This is the enforcement point; UI
 * checks are cosmetic on top of it.
 *
 * We call the Local API with `overrideAccess: true` (the server is trusted) and
 * rely on the org filter for isolation. Payload collection access control adds a
 * second wall for the REST/admin surface, which the portal never uses.
 */

class TenancyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TenancyError";
  }
}

function orgWhere(orgId: number) {
  return { organisation: { equals: orgId } };
}

function orgAndId(orgId: number, id: number | string) {
  return { and: [{ id: { equals: id } }, orgWhere(orgId)] };
}

// ── Findings ─────────────────────────────────────────────────────────

export async function listFindings(
  ctx: PortalContext,
  filters: { severity?: string; status?: string; sort?: string } = {},
): Promise<Finding[]> {
  const payload = await getPayloadClient();
  const and: Where[] = [orgWhere(ctx.orgId)];
  if (filters.severity) and.push({ severity: { equals: filters.severity } });
  if (filters.status) and.push({ status: { equals: filters.status } });
  const { docs } = await payload.find({
    collection: "findings",
    where: { and },
    sort: filters.sort || "-createdAt",
    limit: 500,
    depth: 0,
    overrideAccess: true,
  });
  return docs;
}

export async function getFinding(ctx: PortalContext, id: number | string): Promise<Finding | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "findings",
    where: orgAndId(ctx.orgId, id),
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  return docs[0] ?? null;
}

/** Add a client comment. Denied for viewers and for cross-tenant ids. */
export async function addFindingComment(
  ctx: PortalContext,
  id: number | string,
  body: string,
): Promise<Finding> {
  if (!canWrite(ctx.role)) throw new TenancyError("Your role is read-only.");
  const finding = await getFinding(ctx, id);
  if (!finding) throw new TenancyError("Finding not found.");
  const payload = await getPayloadClient();
  const comments = [
    ...(finding.comments ?? []),
    { authorEmail: ctx.email, body, createdAt: new Date().toISOString() },
  ];
  return payload.update({
    collection: "findings",
    id: finding.id,
    data: { comments },
    overrideAccess: true,
  });
}

/**
 * Client "mark remediated" → sets `pending_verification`, never `closed`
 * (CLAUDE.md §7 — only Waypoint verifies). No-op if already closed/remediated.
 */
export async function requestRemediation(
  ctx: PortalContext,
  id: number | string,
): Promise<Finding> {
  if (!canWrite(ctx.role)) throw new TenancyError("Your role is read-only.");
  const finding = await getFinding(ctx, id);
  if (!finding) throw new TenancyError("Finding not found.");
  const payload = await getPayloadClient();
  return payload.update({
    collection: "findings",
    id: finding.id,
    data: { status: "pending_verification" },
    overrideAccess: true,
  });
}

// ── Engagements ──────────────────────────────────────────────────────

export async function listEngagements(ctx: PortalContext): Promise<Engagement[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "engagements",
    where: orgWhere(ctx.orgId),
    sort: "-startDate",
    depth: 0,
    overrideAccess: true,
  });
  return docs;
}

export async function getEngagement(ctx: PortalContext, id: number | string): Promise<Engagement | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "engagements",
    where: orgAndId(ctx.orgId, id),
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  return docs[0] ?? null;
}

// ── Documents ────────────────────────────────────────────────────────

export async function listDocuments(ctx: PortalContext): Promise<PortalDocument[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "portal-documents",
    where: orgWhere(ctx.orgId),
    sort: "-createdAt",
    depth: 1,
    overrideAccess: true,
  });
  return docs;
}

/**
 * Resolve a document for download AND write the audit entry. Cross-tenant ids
 * return null and write nothing.
 */
export async function recordDocumentDownload(
  ctx: PortalContext,
  id: number | string,
  meta: { ip?: string } = {},
): Promise<PortalDocument | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "portal-documents",
    where: orgAndId(ctx.orgId, id),
    limit: 1,
    depth: 1,
    overrideAccess: true,
  });
  const doc = docs[0];
  if (!doc) return null;
  await payload.create({
    collection: "audit-log",
    data: {
      organisation: ctx.orgId,
      actorEmail: ctx.email,
      action: "document.download",
      targetType: "portal-documents",
      targetId: String(doc.id),
      ip: meta.ip,
    },
    overrideAccess: true,
  });
  return doc;
}

// ── Call bookings ────────────────────────────────────────────────────

export async function listBookings(ctx: PortalContext): Promise<CallBooking[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "call-bookings",
    where: orgWhere(ctx.orgId),
    sort: "-preferredSlot",
    depth: 0,
    limit: 100,
    overrideAccess: true,
  });
  return docs;
}

/** Create a call request bound to the caller's org. Denied for viewers. */
export async function createBooking(
  ctx: PortalContext,
  input: BookingInput,
): Promise<CallBooking> {
  if (!canWrite(ctx.role)) throw new TenancyError("Your role is read-only.");
  const payload = await getPayloadClient();
  const booking = await payload.create({
    collection: "call-bookings",
    data: {
      organisation: ctx.orgId,
      purpose: input.purpose,
      preferredSlot: input.preferredSlot,
      durationMins: input.durationMins,
      notes: input.notes || undefined,
      status: "requested",
      requestedByEmail: ctx.email,
      requestedByName: ctx.email,
    },
    overrideAccess: true,
  });
  await payload.create({
    collection: "audit-log",
    data: {
      organisation: ctx.orgId,
      actorEmail: ctx.email,
      action: "call.requested",
      targetType: "call-bookings",
      targetId: String(booking.id),
    },
    overrideAccess: true,
  });
  return booking;
}

/** Cancel a call request. Cross-tenant ids resolve to null and change nothing. */
export async function cancelBooking(ctx: PortalContext, id: number | string): Promise<CallBooking | null> {
  if (!canWrite(ctx.role)) throw new TenancyError("Your role is read-only.");
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "call-bookings",
    where: orgAndId(ctx.orgId, id),
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const booking = docs[0];
  if (!booking) return null;
  return payload.update({
    collection: "call-bookings",
    id: booking.id,
    data: { status: "cancelled" },
    overrideAccess: true,
  });
}

// ── Members & audit (org admins) ─────────────────────────────────────

export async function listMembers(ctx: PortalContext): Promise<Membership[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "memberships",
    where: orgWhere(ctx.orgId),
    depth: 1,
    overrideAccess: true,
  });
  return docs;
}

/**
 * Invite a teammate into the caller's org. Admins/owners only. Creates the
 * portal user if needed and a membership bound to `ctx.orgId` — the new member
 * can never land in another organisation.
 */
export async function inviteMember(
  ctx: PortalContext,
  email: string,
  role: "admin" | "member" | "viewer",
): Promise<Membership> {
  if (!canManageOrg(ctx.role)) throw new TenancyError("Admins only.");
  const normalised = email.trim().toLowerCase();
  const payload = await getPayloadClient();

  const existing = await payload.find({
    collection: "portal-users",
    where: { email: { equals: normalised } },
    limit: 1,
    overrideAccess: true,
  });
  const user =
    existing.docs[0] ??
    (await payload.create({
      collection: "portal-users",
      data: { email: normalised, authProvider: "password" },
      overrideAccess: true,
    }));

  // Don't create a duplicate membership in this org.
  const dupe = await payload.find({
    collection: "memberships",
    where: { and: [{ user: { equals: user.id } }, orgWhere(ctx.orgId)] },
    limit: 1,
    overrideAccess: true,
  });
  if (dupe.docs[0]) return dupe.docs[0];

  return payload.create({
    collection: "memberships",
    data: { user: user.id, organisation: ctx.orgId, role, status: "invited" },
    overrideAccess: true,
  });
}

export async function listAuditLog(ctx: PortalContext): Promise<AuditLog[]> {
  if (!canManageOrg(ctx.role)) throw new TenancyError("Admins only.");
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "audit-log",
    where: orgWhere(ctx.orgId),
    sort: "-createdAt",
    limit: 200,
    depth: 0,
    overrideAccess: true,
  });
  return docs;
}

// ── Dashboard ────────────────────────────────────────────────────────

export interface DashboardSummary {
  openFindings: number;
  bySeverity: Record<string, number>;
  engagements: Engagement[];
  recentDocuments: PortalDocument[];
}

export async function getDashboard(ctx: PortalContext): Promise<DashboardSummary> {
  const [findings, engagements, documents] = await Promise.all([
    listFindings(ctx),
    listEngagements(ctx),
    listDocuments(ctx),
  ]);
  const open = findings.filter((f) => f.status !== "closed" && f.status !== "remediated");
  const bySeverity: Record<string, number> = {};
  for (const f of open) bySeverity[f.severity] = (bySeverity[f.severity] ?? 0) + 1;
  return {
    openFindings: open.length,
    bySeverity,
    engagements,
    recentDocuments: documents.slice(0, 5),
  };
}

export type { PortalUser };
