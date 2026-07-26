"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/portal", label: "Dashboard", exact: true },
  { href: "/portal/findings", label: "Findings" },
  { href: "/portal/documents", label: "Documents" },
  { href: "/portal/engagements", label: "Timeline" },
  { href: "/portal/settings", label: "Settings" },
];

export function PortalNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Portal" className="flex flex-col gap-1">
      {LINKS.map((l) => {
        const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "flex items-center gap-2 rounded px-3 py-2 font-mono text-mono-xs uppercase transition-colors",
              active
                ? "bg-portal-panel text-portal-ink"
                : "text-portal-ink-2 hover:bg-portal-panel/60 hover:text-portal-ink",
            )}
          >
            <span
              aria-hidden="true"
              className={cn("h-3 w-[3px] rounded-full", active ? "bg-portal-brass" : "bg-portal-line")}
            />
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
