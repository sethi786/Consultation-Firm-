import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Client portal", template: "%s — Northport portal" },
  description: "Northport Security client portal.",
  robots: { index: false, follow: false },
};

/**
 * Dark base surface for the portal (CLAUDE.md §7). The instrument, not the
 * document. `color-scheme: dark` so native form controls render dark too.
 */
export default function PortalBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-dvh bg-portal-bg text-portal-ink"
      style={{ colorScheme: "dark" }}
    >
      {children}
    </div>
  );
}
