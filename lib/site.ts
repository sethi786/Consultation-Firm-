/**
 * Canonical site configuration. `SITE_URL` should be set to the production
 * origin via NEXT_PUBLIC_SITE_URL; it falls back to a placeholder for local dev.
 *
 * The value is normalised defensively: an empty, whitespace, protocol-less, or
 * otherwise invalid env value must never crash the build (it feeds
 * `metadataBase: new URL(SITE_URL)`, which throws on an invalid URL).
 */
const FALLBACK_URL = "https://northport.security";

function normalizeSiteUrl(raw: string | undefined): string {
  const trimmed = (raw ?? "").trim().replace(/\/+$/, "");
  if (!trimmed) return FALLBACK_URL;

  // Already a valid absolute URL?
  try {
    const u = new URL(trimmed);
    if (u.protocol === "http:" || u.protocol === "https:") {
      return u.origin + (u.pathname === "/" ? "" : u.pathname.replace(/\/+$/, ""));
    }
  } catch {
    // fall through to protocol-prefixing attempt
  }

  // Missing protocol (e.g. "my-app.vercel.app")? Try prefixing https://.
  try {
    const u = new URL(`https://${trimmed}`);
    return u.origin;
  } catch {
    return FALLBACK_URL;
  }
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const SITE_NAME = "Northport Security";

export const SITE_DESCRIPTION =
  "Evidence-led security consulting and managed detection for 200–5,000-seat organisations. We map your controls to NIST CSF, ISO 27001, and CIS, then close the gaps.";

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
