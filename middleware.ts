import { NextResponse, type NextRequest } from "next/server";

/**
 * Per-request Content-Security-Policy with a nonce (CLAUDE.md §8).
 *
 * `script-src` is strict: 'self' + a per-request nonce + 'strict-dynamic', with
 * NO 'unsafe-inline'. Next.js reads the nonce from the request's CSP header and
 * stamps it onto its own bootstrap scripts, so hydration works without opening
 * the door to inline script injection.
 *
 * `style-src` keeps 'unsafe-inline': nonces don't cover inline *style attributes*
 * (e.g. the register's per-row animation-delay), and injected styles are far
 * lower risk than scripts. This is the one documented deviation from "no
 * unsafe-inline"; it does not affect the script CSP that scanners weigh.
 *
 * Using a nonce opts pages into dynamic rendering — an accepted trade for a
 * security firm whose own headers grade is a sales asset.
 */
function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

export function middleware(request: NextRequest) {
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

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  // Next reads the nonce from this request header to stamp its own scripts.
  requestHeaders.set("content-security-policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("content-security-policy", csp);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match everything except Next internals and static files that don't need a
     * CSP. Keeps the nonce off cached static assets.
     */
    {
      // Exclude Next internals, static files, and the Payload admin/API (which
      // needs its own looser policy to run).
      source:
        "/((?!admin|api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff2?)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
