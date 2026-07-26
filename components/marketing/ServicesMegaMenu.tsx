"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { SERVICES_BY_DOMAIN } from "@/content/services";
import { domainAccent } from "@/lib/accent";

/**
 * The Services mega-menu (desktop). "Services" opens a full-width panel with the
 * seven categories as columns, each service linking to its page plus a per-service
 * "Book" action to /contact?service=<slug>. Opens on hover/focus/click; closes on
 * Escape, outside-click, route change, or selecting a link. Keyboard accessible.
 */
export function ServicesMegaMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname();
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on outside click + Escape.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = pathname === "/services" || pathname.startsWith("/services/");

  function openNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function closeSoon() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "relative flex items-center gap-1 py-1 font-body text-small transition-colors",
          active || open ? "text-ink" : "text-slate hover:text-ink",
        )}
      >
        Services
        <span
          aria-hidden="true"
          className={cn("mt-px text-mono-xs transition-transform duration-200", open && "rotate-180")}
        >
          ⌄
        </span>
        {active && (
          <span className="absolute -bottom-0.5 left-0 h-px w-full bg-brass" aria-hidden="true" />
        )}
      </button>

      {open && (
        <div
          id={panelId}
          role="region"
          aria-label="Services"
          onMouseEnter={openNow}
          onMouseLeave={closeSoon}
          className="fixed inset-x-0 top-16 z-40 border-b border-rule bg-paper/95 shadow-pop backdrop-blur-md motion-safe:animate-[rise-in_180ms_var(--ease-doc)_both]"
        >
          <div className="mx-auto max-w-page px-6 py-8 md:px-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-7 md:grid-cols-3 lg:grid-cols-4">
              {SERVICES_BY_DOMAIN.map((group) => {
                const a = domainAccent(group.domain);
                return (
                  <div key={group.domain}>
                    <p className={cn("mb-3 inline-flex items-center gap-2 font-mono text-mono-xs uppercase tracking-mono", a.text)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", a.dot)} />
                      {group.domain}
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {group.services.map((s) => (
                        <li key={s.slug} className="group/item flex items-center justify-between gap-2">
                          <Link
                            href={`/services/${s.slug}`}
                            onClick={() => setOpen(false)}
                            className="block flex-1 rounded py-1.5 text-small text-ink transition-colors hover:text-pine"
                          >
                            {s.name}
                          </Link>
                          <Link
                            href={`/contact?service=${s.slug}`}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "shrink-0 rounded px-2 py-1 font-mono text-mono-xs uppercase opacity-0 transition-opacity focus:opacity-100 group-hover/item:opacity-100",
                              a.text,
                            )}
                          >
                            Book →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-rule pt-5 font-mono text-mono-xs uppercase text-slate">
              <Link href="/services" onClick={() => setOpen(false)} className="hover:text-ink">
                All services →
              </Link>
              <Link href="/solutions" onClick={() => setOpen(false)} className="hover:text-ink">
                Solutions (advise · implement · operate)
              </Link>
              <Link href="/book" onClick={() => setOpen(false)} className="text-pine hover:text-pine-lift">
                Book a meeting →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
