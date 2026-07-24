import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Client portal",
  description: "Sign in to the Northport Security client portal.",
  robots: { index: false, follow: false },
};

/**
 * Portal placeholder. The real authenticated portal — dark surface, Entra ID SSO,
 * row-level tenancy — is built in Phases 5–6 under the (portal) route group.
 */
export default function PortalPlaceholder() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-portal-bg px-6 text-portal-ink">
      <div className="w-full max-w-sm">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-h3 text-portal-ink">Northport</span>
          <span className="font-mono text-mono-xs uppercase text-portal-ink-2">Security</span>
        </div>
        <p className="mt-8 font-mono text-mono-xs uppercase text-portal-brass">Client portal</p>
        <h1 className="mt-3 text-h2 text-portal-ink">Sign in</h1>
        <p className="mt-3 text-small text-portal-ink-2">
          The client portal — Entra ID single sign-on, findings register, document
          vault — is in build (Phases 5–6). Access is issued per engagement.
        </p>
        <div className="mt-8 rounded-lg border border-portal-line bg-portal-panel p-5">
          <p className="font-mono text-mono-xs uppercase text-portal-ink-2">
            {"{{TODO: Entra ID sign-in + email/password fallback (Phase 5)}}"}
          </p>
        </div>
        <Link
          href="/"
          className="mt-8 inline-block font-mono text-mono-xs uppercase text-portal-ink-2 hover:text-portal-ink"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
