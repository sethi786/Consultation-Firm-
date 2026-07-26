import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { PortalContext, PortalRole } from "./context";

/**
 * Resolve the authenticated portal context in a server component, or redirect to
 * sign-in. This is the single place page code obtains its tenancy scope; every
 * data-access call takes the returned context (lib/portal/data.ts).
 */
export async function requirePortalContext(): Promise<PortalContext> {
  const session = await auth();
  const u = session?.user;
  if (!u?.orgId || !u.portalUserId) {
    redirect("/portal/sign-in");
  }
  return {
    userId: u.portalUserId,
    email: u.email ?? "",
    orgId: u.orgId,
    orgName: u.orgName ?? "Your organisation",
    role: (u.role as PortalRole) ?? "viewer",
  };
}
