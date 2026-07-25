import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { authConfig } from "./auth.config";
import { getPayloadClient } from "@/lib/payload";
import type { PortalRole } from "@/lib/portal/context";

const credsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/**
 * Resolve a portal user's active organisation + role. Returns the first active
 * membership — org switching is a future addition.
 */
async function resolveMembership(portalUserId: number) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "memberships",
    where: {
      and: [
        { user: { equals: portalUserId } },
        { status: { equals: "active" } },
      ],
    },
    depth: 1,
    limit: 1,
    overrideAccess: true,
  });
  const m = docs[0];
  if (!m) return null;
  const org = typeof m.organisation === "object" ? m.organisation : null;
  if (!org) return null;
  return { orgId: org.id, orgName: org.name, role: m.role as PortalRole };
}

// Only wire the Entra ID provider when it's configured, so local dev works with
// email/password alone. Setting the AUTH_MICROSOFT_ENTRA_ID_* vars enables SSO.
const entraConfigured =
  !!process.env.AUTH_MICROSOFT_ENTRA_ID_ID &&
  !!process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Email and password",
      credentials: {
        email: { label: "Work email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        const parsed = credsSchema.safeParse(raw);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        const payload = await getPayloadClient();
        const { docs } = await payload.find({
          collection: "portal-users",
          where: { email: { equals: email.toLowerCase() } },
          limit: 1,
          overrideAccess: true,
          showHiddenFields: true,
        });
        const user = docs[0];
        if (!user?.passwordHash) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        const membership = await resolveMembership(user.id);
        if (!membership) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name ?? user.email,
          portalUserId: user.id,
          orgId: membership.orgId,
          orgName: membership.orgName,
          role: membership.role,
        };
      },
    }),
    ...(entraConfigured
      ? [
          MicrosoftEntraID({
            clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
            clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
            issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
          }),
        ]
      : []),
  ],
  callbacks: {
    ...authConfig.callbacks,
    /**
     * Entra ID sign-in maps to a portal user by email. We attach tenancy claims
     * on first sign-in via the jwt callback path below.
     */
    async signIn({ user, account }) {
      if (account?.provider === "microsoft-entra-id") {
        const email = user.email?.toLowerCase();
        if (!email) return false;
        const payload = await getPayloadClient();
        const { docs } = await payload.find({
          collection: "portal-users",
          where: { email: { equals: email } },
          limit: 1,
          overrideAccess: true,
        });
        const pu = docs[0];
        if (!pu) return false; // must be provisioned by an org admin first
        const membership = await resolveMembership(pu.id);
        if (!membership) return false;
        // Stash claims on the user object so the jwt callback picks them up.
        (user as Record<string, unknown>).portalUserId = pu.id;
        (user as Record<string, unknown>).orgId = membership.orgId;
        (user as Record<string, unknown>).orgName = membership.orgName;
        (user as Record<string, unknown>).role = membership.role;
      }
      return true;
    },
  },
});
