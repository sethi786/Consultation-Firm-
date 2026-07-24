/**
 * Canonical site configuration. `SITE_URL` should be set to the production
 * origin via NEXT_PUBLIC_SITE_URL; it falls back to a placeholder for local dev.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://northport.security";

export const SITE_NAME = "Northport Security";

export const SITE_DESCRIPTION =
  "Evidence-led security consulting and managed detection for 200–5,000-seat organisations. We map your controls to NIST CSF, ISO 27001, and CIS, then close the gaps.";

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
