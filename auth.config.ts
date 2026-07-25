import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js base config (no DB / bcrypt imports here, so it can run in
 * middleware). Providers with server-only `authorize` live in `auth.ts`.
 *
 * The token carries the portal tenancy claims (orgId, role) set at sign-in, so
 * middleware and server components can read them without a DB round-trip.
 */
export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/portal/sign-in",
  },
  session: {
    strategy: "jwt",
    // Short sessions with refresh (CLAUDE.md §7).
    maxAge: 60 * 60, // 1 hour
    updateAge: 15 * 60, // refresh every 15 min of activity
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      // On sign-in, copy the tenancy claims from the authorized user.
      if (user) {
        const u = user as {
          id?: string;
          portalUserId?: number;
          orgId?: number;
          orgName?: string;
          role?: string;
        };
        token.portalUserId = u.portalUserId;
        token.orgId = u.orgId;
        token.orgName = u.orgName;
        token.role = u.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.portalUserId = token.portalUserId as number | undefined;
        session.user.orgId = token.orgId as number | undefined;
        session.user.orgName = token.orgName as string | undefined;
        session.user.role = token.role as string | undefined;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
