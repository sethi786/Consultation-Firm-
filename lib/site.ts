/**
 * Canonical site configuration. `SITE_URL` should be set to the production
 * origin via NEXT_PUBLIC_SITE_URL; it falls back to a placeholder for local dev.
 *
 * The value is normalised defensively: an empty, whitespace, protocol-less, or
 * otherwise invalid env value must never crash the build (it feeds
 * `metadataBase: new URL(SITE_URL)`, which throws on an invalid URL).
 */
const FALLBACK_URL = "https://waypointsecurity.com";

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

export const SITE_NAME = "Waypoint";

export const SITE_DESCRIPTION =
  "Evidence-led security consulting and managed detection for 200–5,000-seat organisations. We map your controls to NIST CSF, ISO 27001, and CIS, then close the gaps.";

/**
 * Firm contact details. Fill these with the real, confirmed values and they
 * appear automatically on the contact page and in the footer. Left blank they
 * simply don't render — we never show a placeholder or a non-working address to
 * a buyer (CLAUDE.md §5). `responseTime` is a safe honest default.
 */
export const CONTACT: {
  email: string;
  phone: string;
  location: string;
  registration: string;
  responseTime: string;
} = {
  /** e.g. "hello@waypointsecurity.com" — set once the domain is live. */
  email: "",
  /** e.g. "+1 (416) 555-0100". */
  phone: "",
  /** e.g. "Toronto, Canada". */
  location: "",
  /** Registered company name / number, if you want it shown. */
  registration: "",
  responseTime: "One business day, from a consultant",
};

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
