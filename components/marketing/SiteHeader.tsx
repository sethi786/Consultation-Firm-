"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/explore", label: "Explore", accent: true },
  { href: "/approach", label: "Approach" },
  { href: "/insights", label: "Insights" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/about", label: "About" },
];

function Wordmark() {
  return (
    <Link href="/" className="group inline-flex items-baseline gap-2" aria-label="Northport Security — home">
      <span className="font-display text-h3 leading-none text-ink">Northport</span>
      <span className="font-mono text-mono-xs uppercase text-slate group-hover:text-brass-lift">
        Security
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-6 md:px-8">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-1 font-body text-small transition-colors",
                  active ? "text-ink" : "text-slate hover:text-ink",
                )}
              >
                <span className="inline-flex items-center gap-1.5">
                  {item.accent && (
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral" />
                  )}
                  {item.label}
                </span>
                {active && (
                  <span className="absolute -bottom-0.5 left-0 h-px w-full bg-brass" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/portal" className="font-body text-small text-slate hover:text-ink">
            Client portal
          </Link>
          <Button href="/contact" size="sm">
            Book an assessment
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="font-mono text-mono-xs uppercase text-ink">{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-rule bg-paper px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col divide-y divide-rule">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 font-body text-body text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/portal"
                className="block py-3 font-body text-body text-slate"
                onClick={() => setOpen(false)}
              >
                Client portal
              </Link>
            </li>
          </ul>
          <div className="mt-4">
            <Button href="/contact" onClick={() => setOpen(false)}>
              Book an assessment
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
