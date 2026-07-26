import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getPayload, type Payload } from "payload";
import config from "@payload-config";
import type { PortalContext } from "./context";
import {
  listFindings,
  getFinding,
  addFindingComment,
  requestRemediation,
  listDocuments,
  recordDocumentDownload,
} from "./data";

/**
 * Row-level tenancy — the requirement that matters (CLAUDE.md §7).
 *
 * Two organisations, each with its own finding and document. We assert that a
 * caller scoped to org A can never read, mutate, or download org B's rows
 * through the data-access layer, even when handed B's ids directly.
 */

let payload: Payload;
let orgAId: number;
let orgBId: number;
let findingAId: number;
let findingBId: number;
let docBId: number;

const suffix = `${Date.now()}`;

function ctxFor(orgId: number, orgName: string): PortalContext {
  return { userId: 1, email: "tester@example.com", orgId, orgName, role: "owner" };
}

beforeAll(async () => {
  payload = await getPayload({ config });

  const orgA = await payload.create({
    collection: "organisations",
    data: { name: "Tenancy Org A", slug: `tenancy-a-${suffix}` },
    overrideAccess: true,
  });
  const orgB = await payload.create({
    collection: "organisations",
    data: { name: "Tenancy Org B", slug: `tenancy-b-${suffix}` },
    overrideAccess: true,
  });
  orgAId = orgA.id;
  orgBId = orgB.id;

  const fA = await payload.create({
    collection: "findings",
    data: { organisation: orgAId, ref: `TA-${suffix}`, title: "Org A finding", severity: "high", status: "open" },
    overrideAccess: true,
  });
  const fB = await payload.create({
    collection: "findings",
    data: { organisation: orgBId, ref: `TB-${suffix}`, title: "Org B finding", severity: "high", status: "open" },
    overrideAccess: true,
  });
  findingAId = fA.id;
  findingBId = fB.id;

  const dB = await payload.create({
    collection: "portal-documents",
    data: { organisation: orgBId, title: "Org B report", type: "report", version: "1.0" },
    overrideAccess: true,
  });
  docBId = dB.id;
});

afterAll(async () => {
  // Best-effort cleanup of the ephemeral rows.
  const del = (collection: "findings" | "portal-documents" | "organisations" | "audit-log", id: number) =>
    payload.delete({ collection, id, overrideAccess: true }).catch(() => {});
  await del("findings", findingAId);
  await del("findings", findingBId);
  await del("portal-documents", docBId);
  await del("organisations", orgAId);
  await del("organisations", orgBId);
});

describe("row-level tenancy", () => {
  it("lists only the caller's org findings", async () => {
    const rows = await listFindings(ctxFor(orgAId, "A"));
    const refs = rows.map((r) => r.id);
    expect(refs).toContain(findingAId);
    expect(refs).not.toContain(findingBId);
  });

  it("returns the caller's own finding by id", async () => {
    const f = await getFinding(ctxFor(orgAId, "A"), findingAId);
    expect(f?.id).toBe(findingAId);
  });

  it("returns null for a cross-tenant finding id", async () => {
    const f = await getFinding(ctxFor(orgAId, "A"), findingBId);
    expect(f).toBeNull();
  });

  it("refuses to comment on a cross-tenant finding", async () => {
    await expect(addFindingComment(ctxFor(orgAId, "A"), findingBId, "leak")).rejects.toThrow();
  });

  it("refuses to remediate a cross-tenant finding", async () => {
    await expect(requestRemediation(ctxFor(orgAId, "A"), findingBId)).rejects.toThrow();
    // And org B's finding is untouched.
    const fB = await payload.findByID({ collection: "findings", id: findingBId, overrideAccess: true });
    expect(fB.status).toBe("open");
  });

  it("lists only the caller's org documents", async () => {
    const docs = await listDocuments(ctxFor(orgBId, "B"));
    expect(docs.map((d) => d.id)).toContain(docBId);
    const docsA = await listDocuments(ctxFor(orgAId, "A"));
    expect(docsA.map((d) => d.id)).not.toContain(docBId);
  });

  it("refuses to download a cross-tenant document and writes no audit entry", async () => {
    const before = await payload.count({
      collection: "audit-log",
      where: { organisation: { equals: orgAId } },
      overrideAccess: true,
    });
    const doc = await recordDocumentDownload(ctxFor(orgAId, "A"), docBId);
    expect(doc).toBeNull();
    const after = await payload.count({
      collection: "audit-log",
      where: { organisation: { equals: orgAId } },
      overrideAccess: true,
    });
    expect(after.totalDocs).toBe(before.totalDocs);
  });
});
