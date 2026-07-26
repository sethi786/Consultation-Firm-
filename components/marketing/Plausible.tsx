import Script from "next/script";
import { headers } from "next/headers";

/**
 * Plausible analytics — cookieless, no consent banner needed (CLAUDE.md §2, §8).
 * Renders only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set, so it's off by default.
 * The script carries the per-request CSP nonce; middleware allows plausible.io in
 * connect-src when the domain is configured.
 */
export async function Plausible() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js";
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <Script
      src={src}
      data-domain={domain}
      strategy="afterInteractive"
      nonce={nonce}
    />
  );
}
