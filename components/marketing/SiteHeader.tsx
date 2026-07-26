"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui";
import { ThemeToggle } from "./ThemeToggle";
import { ServicesMegaMenu } from "./ServicesMegaMenu";
import { SERVICES_BY_DOMAIN } from "@/content/services";
import { domainAccent } from "@/lib/accent";

// "Services" is rendered by the mega-menu; the rest are plain links.
const NAV = [
  { href: "/solutions", label: "Solutions" },
  { href: "/explore", label: "Explore", accent: true },
  { href: "/approach", label: "Approach" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

function Wordmark() {
  return (
    <Link href="/" className="group inline-flex items-baseline gap-2" aria-label="Cairn Security — home">
      <span className="font-display text-h3 leading-none text-ink">Cairn</span>
      <span className="font-mono text-mono-xs uppercase text-slate group-hover:text-brass-lift">
        Security
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-6 md:px-8">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          <ServicesMegaMenu />
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
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-pine" />
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
          {/* Client portal is built but hidden from public nav until the first
              client is onboarded — the code and routes remain at /portal. */}
          <ThemeToggle />
          <Button href="/contact" size="sm">
            Book an assessment
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center p-2"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="font-mono text-mono-xs uppercase text-ink">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-rule bg-paper px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col divide-y divide-rule">
            {/* Services — expandable categories */}
            <li>
              <button
                type="button"
                aria-expanded={mobileServices}
                onClick={() => setMobileServices((o) => !o)}
                className="flex w-full items-center justify-between py-3 font-body text-body text-ink"
              >
                Services
                <span aria-hidden="true" className="font-mono text-mono-xs text-slate">
                  {mobileServices ? "–" : "+"}
                </span>
              </button>
              {mobileServices && (
                <div className="pb-3">
                  {SERVICES_BY_DOMAIN.map((group) => {
                    const a = domainAccent(group.domain);
                    return (
                      <div key={group.domain} className="mb-3">
                        <p className={cn("mb-1 inline-flex items-center gap-2 font-mono text-mono-xs uppercase", a.text)}>
                          <span className={cn("h-1.5 w-1.5 rounded-full", a.dot)} />
                          {group.domain}
                        </p>
                        <ul className="flex flex-col">
                          {group.services.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${s.slug}`}
                                className="block py-1.5 text-small text-slate"
                                onClick={() => setOpen(false)}
                              >
                                {s.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                  <Link
                    href="/book"
                    onClick={() => setOpen(false)}
                    className="mt-1 inline-block font-mono text-mono-xs uppercase text-pine"
                  >
                    Book a meeting →
                  </Link>
                </div>
              )}
            </li>
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
            {/* Client portal hidden from public nav until first client onboarded. */}
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
