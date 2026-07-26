import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

/**
 * Middleware does two jobs:
 *  1. Gate the /portal route group — unauthenticated requests are redirected to
 *     sign-in (CLAUDE.md §7). Uses the edge-safe Auth.js config (no DB).
 *  2. Set a per-request nonce CSP (CLAUDE.md §8).
 */
const { auth } = NextAuth(authConfig);

function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function withCsp(req: Request): NextResponse {
  const nonce = generateNonce();
  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob:`,
    `font-src 'self'`,
    `connect-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `manifest-src 'self'`,
    `upgrade-insecure-requests`,
  ].join("; ");

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("content-security-policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("content-security-policy", csp);
  return response;
}

export default auth((req) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;
  const isPortal = path === "/portal" || path.startsWith("/portal/");
  const isSignIn = path === "/portal/sign-in";
  const loggedIn = Boolean(req.auth?.user?.orgId);

  if (isPortal && !isSignIn && !loggedIn) {
    const url = new URL("/portal/sign-in", nextUrl);
    url.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(url);
  }
  if (isSignIn && loggedIn) {
    return NextResponse.redirect(new URL("/portal", nextUrl));
  }

  return withCsp(req);
});

export const config = {
  matcher: [
    {
      source:
        "/((?!admin|api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff2?)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
