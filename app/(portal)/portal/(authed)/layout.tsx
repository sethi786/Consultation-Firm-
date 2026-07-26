import Link from "next/link";
import { requirePortalContext } from "@/lib/portal/session";
import { PortalNav } from "@/components/portal/PortalNav";
import { signOutAction } from "./signout-action";

export default async function AuthedPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await requirePortalContext();

  return (
    <div className="mx-auto flex min-h-dvh max-w-[1200px] flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="shrink-0 border-b border-portal-line px-5 py-5 md:w-56 md:border-b-0 md:border-r md:py-8">
        <Link href="/portal" className="flex items-baseline gap-2">
          <span className="font-display text-h3 text-portal-ink">Cairn</span>
          <span className="font-mono text-mono-xs uppercase text-portal-ink-2">Portal</span>
        </Link>

        <div className="mt-8 hidden md:block">
          <PortalNav />
        </div>
        <div className="mt-4 md:hidden">
          <PortalNav />
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-portal-line px-6 py-4">
          <div className="min-w-0">
            <p className="truncate font-mono text-mono-xs uppercase text-portal-ink-2">
              {ctx.orgName}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-mono-xs uppercase text-portal-ink-2 sm:inline">
              {ctx.email} · {ctx.role}
            </span>
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded border border-portal-line px-3 py-1.5 font-mono text-mono-xs uppercase text-portal-ink-2 hover:text-portal-ink"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
