import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Restrained line icons, one per service domain (the 12 categories in
 * content/services). Geometric, single-stroke, `currentColor` — documentary,
 * not decorative. Deliberately avoids the banned cyberpunk motifs (§3.1): no
 * hexagons, shields, padlocks, circuit boards, or glow. Used in the mega-menu,
 * footer service groups, the services index, and service-page headers.
 */

// Keyed by the exact DOMAINS strings in content/services/index.ts.
const PATHS: Record<string, ReactNode> = {
  "AI & Data": (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </>
  ),
  "AI Operations": (
    <>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M7.5 21h9" />
      <path d="M6.5 11.5 9 8.5l2 4 2-2.5 1.5 2.5H18" />
    </>
  ),
  "Cloud & Infrastructure": (
    <path d="M7 18h9a3.75 3.75 0 0 0 .5-7.47A5.5 5.5 0 0 0 6 9.5 3.75 3.75 0 0 0 7 18Z" />
  ),
  "Identity & Access": (
    <>
      <circle cx="8" cy="8" r="3.5" />
      <path d="M10.6 10.6 19 19" />
      <path d="M16 16l2 2M18.4 13.6l2 2" />
    </>
  ),
  "Endpoint & Application": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M6 6.5h.01M8.5 6.5h.01" />
    </>
  ),
  "Detection & Response": (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
  "Governance, Risk & Compliance": (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1" />
      <path d="M9 12.5l2 2 4-4" />
    </>
  ),
  "Advisory & Assurance": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  "Modern Workplace": (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </>
  ),
  "Data Center & Infrastructure": (
    <>
      <rect x="4" y="4" width="16" height="6" rx="1" />
      <rect x="4" y="14" width="16" height="6" rx="1" />
      <path d="M8 7h.01M8 17h.01" />
    </>
  ),
  Networking: (
    <>
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <path d="M8.2 10.9 15.8 7.1M8.2 13.1 15.8 16.9" />
    </>
  ),
  "IT Asset Management": (
    <>
      <path d="M12.6 3H20a1 1 0 0 1 1 1v7.4a1 1 0 0 1-.3.7l-8.3 8.3a1 1 0 0 1-1.4 0l-7.4-7.4a1 1 0 0 1 0-1.4l8.3-8.3a1 1 0 0 1 .7-.3Z" />
      <path d="M16.5 7.5h.01" />
    </>
  ),
};

const FALLBACK = <circle cx="12" cy="12" r="8" />;

export function DomainIcon({
  domain,
  className,
}: {
  domain: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {PATHS[domain] ?? FALLBACK}
    </svg>
  );
}
