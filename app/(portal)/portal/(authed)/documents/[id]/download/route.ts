import { NextResponse, type NextRequest } from "next/server";
import { requirePortalContext } from "@/lib/portal/session";
import { recordDocumentDownload } from "@/lib/portal/data";

/**
 * Audited download. Resolves the document within the caller's org (cross-tenant
 * ids return null), writes the AuditLog entry, then redirects to the file.
 *
 * In production the media URL should be a short-lived signed URL from the
 * storage adapter rather than a public path; the audit + tenancy check here are
 * the access-control gate. {{TODO: signed URLs when a storage adapter is wired}}
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const ctx = await requirePortalContext();
  const { id } = await params;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  const doc = await recordDocumentDownload(ctx, id, { ip });
  if (!doc) {
    return new NextResponse("Not found", { status: 404 });
  }
  const file = typeof doc.file === "object" && doc.file ? doc.file : null;
  if (!file?.url) {
    return new NextResponse("File not available", { status: 404 });
  }
  return NextResponse.redirect(new URL(file.url, req.nextUrl.origin));
}
