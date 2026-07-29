/**
 * Canonical site configuration. `SITE_URL` should be set to the production
 * origin via NEXT_PUBLIC_SITE_URL; it falls back to a placeholder for local dev.
 *
 * The value is normalised defensively: an empty, whitespace, protocol-less, or
 * otherwise invalid env value must never crash the build (it feeds
 * `metadataBase: new URL(SITE_URL)`, which throws on an invalid URL).
 */
const FALLBACK_URL = "https://waypointsec.com";

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
 * Firm details. Fill these with the real, confirmed values and they appear
 * automatically on the contact page, in the footer, and on the About page.
 * Left blank they simply don't render — we never show a placeholder or a
 * non-working address to a buyer (CLAUDE.md §5). `responseTime` is a safe
 * honest default. Nothing here is ever invented: a blank field is honest; a
 * fabricated one is a credibility and legal problem.
 */
export const CONTACT: {
  email: string;
  phone: string;
  location: string;
  /** Full postal address, one line, e.g. "100 King St W, Toronto, ON M5X 1A9". */
  address: string;
  /** Registered legal entity name, e.g. "Waypoint Security Inc." */
  legalEntity: string;
  /** Company / incorporation number. */
  registrationNo: string;
  /** Jurisdiction of incorporation, e.g. "Ontario, Canada". */
  jurisdiction: string;
  /** The year the firm/practice began operating (real — even if recent). */
  foundingYear: string;
  responseTime: string;
} = {
  /** e.g. "hello@waypointsec.com" — set once the domain is live. */
  email: "",
  /** e.g. "+1 (416) 555-0100". */
  phone: "",
  /** e.g. "Toronto, Canada" (short form for the footer). */
  location: "",
  /** e.g. "100 King St W, Suite 500, Toronto, ON M5X 1A9". */
  address: "",
  /** e.g. "Waypoint Security Inc." */
  legalEntity: "",
  /** e.g. "BC1234567". */
  registrationNo: "",
  /** e.g. "British Columbia, Canada". */
  jurisdiction: "",
  /** e.g. "2019". Drives the honest "Established {year}" / tenure lines. */
  foundingYear: "",
  responseTime: "One business day, from a consultant",
};

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
