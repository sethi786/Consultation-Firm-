/**
 * The authenticated portal caller. Derived from the Auth.js session (lib/auth)
 * and passed to every data-access function. Tenancy is bound to `orgId` here so
 * no query can reach another organisation's rows (CLAUDE.md §7).
 */
export type PortalRole = "owner" | "admin" | "member" | "viewer";

export interface PortalContext {
  userId: number;
  email: string;
  orgId: number;
  orgName: string;
  role: PortalRole;
}

/** Roles allowed to manage members and view the audit log. */
export function canManageOrg(role: PortalRole): boolean {
  return role === "owner" || role === "admin";
}

/** Viewers are read-only; everyone else can comment / request remediation. */
export function canWrite(role: PortalRole): boolean {
  return role !== "viewer";
}
