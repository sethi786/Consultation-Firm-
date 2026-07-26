import Link from "next/link";
import { SignInForm } from "@/components/portal/SignInForm";
import { PortalEyebrow } from "@/components/portal/ui";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const entraEnabled =
    !!process.env.AUTH_MICROSOFT_ENTRA_ID_ID && !!process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET;

  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-baseline gap-2">
          <span className="font-display text-h3 text-portal-ink">Northport</span>
          <span className="font-mono text-mono-xs uppercase text-portal-ink-2">Security</span>
        </div>

        <PortalEyebrow>Client portal</PortalEyebrow>
        <h1 className="mt-2 text-h2 text-portal-ink">Sign in</h1>
        <p className="mt-2 text-small text-portal-ink-2">
          Access is issued per engagement. Trouble signing in? Contact your Northport
          consultant.
        </p>

        <div className="mt-8">
          <SignInForm callbackUrl={callbackUrl ?? "/portal"} />
        </div>

        {entraEnabled ? (
          <p className="mt-6 text-center font-mono text-mono-xs uppercase text-portal-ink-2">
            Microsoft Entra ID SSO is enabled for your tenant.
          </p>
        ) : (
          <p className="mt-6 font-mono text-mono-xs uppercase text-portal-ink-2/70">
            {"{{TODO: enable Entra ID SSO by setting AUTH_MICROSOFT_ENTRA_ID_*}}"}
          </p>
        )}

        <Link
          href="/"
          className="mt-10 inline-block font-mono text-mono-xs uppercase text-portal-ink-2 hover:text-portal-ink"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
