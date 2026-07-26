/**
 * Credibility signals — the honest version of a big-firm "recognition" band.
 *
 * FRAMEWORKS and POSTURE are true for this site and safe to show publicly.
 * CERTIFICATIONS and RECOGNITION are intentionally EMPTY: the band renders an
 * honest "shared on request" line until you add real, verifiable entries here.
 * Never invent an analyst quote, a partner tier, or a certification — a fake
 * one is a credibility and legal problem, not a placeholder.
 */

export const FRAMEWORKS = [
  "NIST CSF 2.0",
  "ISO/IEC 27001:2022",
  "CIS Controls v8",
] as const;

/** True of this site itself — a live demonstration of the posture we sell. */
export const POSTURE = [
  { label: "Cookieless analytics", note: "no third-party tracking" },
  { label: "Strict CSP, nonce-based", note: "no inline scripts" },
  { label: "Evidence-based delivery", note: "every finding maps to a control" },
] as const;

/**
 * Add real certifications your team actually holds, e.g.:
 *   { label: "CISSP", note: "(ISC)²" }
 * Leave empty to show the honest fallback instead of inventing any.
 */
export const CERTIFICATIONS: { label: string; note?: string }[] = [];

/**
 * Add real analyst recognition or partner tiers, e.g.:
 *   { label: "Microsoft Solutions Partner", note: "Security" }
 * Leave empty rather than fabricate one.
 */
export const RECOGNITION: { label: string; note?: string }[] = [];
