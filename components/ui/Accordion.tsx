"use client";

import { useState, useId } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  q: string;
  a: string;
}

/**
 * An accessible accordion (toggle bars). One panel open at a time by default;
 * pass `multiple` to allow several. Smooth height animation via the grid-rows
 * technique, gated behind reduced-motion by the global CSS.
 */
export function Accordion({
  items,
  multiple = false,
}: {
  items: AccordionItem[];
  multiple?: boolean;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <div className="border-t border-rule">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={i} className="border-b border-rule">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-h3 text-ink transition-colors group-hover:text-pine">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative mt-1 h-4 w-4 shrink-0 text-brass-lift transition-transform duration-300 ease-doc",
                    isOpen && "rotate-45",
                  )}
                >
                  <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-4 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-doc",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-measure pb-6 text-body text-slate">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
