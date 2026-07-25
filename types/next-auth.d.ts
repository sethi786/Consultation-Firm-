import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      portalUserId?: number;
      orgId?: number;
      orgName?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    portalUserId?: number;
    orgId?: number;
    orgName?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    portalUserId?: number;
    orgId?: number;
    orgName?: string;
    role?: string;
  }
}
