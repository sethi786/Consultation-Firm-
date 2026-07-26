"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  label: string;
  meta?: string;
  panel: ReactNode;
}

/**
 * Accessible tabs with roving focus (arrow-key navigation). Used for engagement
 * tiers. The active tab carries the brass underline motif.
 */
export function Tabs({ items }: { items: TabItem[] }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Engagement tiers"
        className="flex flex-wrap gap-1 border-b border-rule"
      >
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative -mb-px flex items-baseline gap-2 px-4 py-3 font-body text-body transition-colors",
                selected ? "text-ink" : "text-slate hover:text-ink",
              )}
            >
              <span>{item.label}</span>
              {item.meta && (
                <span className="font-mono text-mono-xs uppercase text-slate">{item.meta}</span>
              )}
              {selected && (
                <span aria-hidden="true" className="absolute -bottom-px left-0 h-[2px] w-full bg-brass" />
              )}
            </button>
          );
        })}
      </div>

      {items.map((item, i) => (
        <div
          key={item.label}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
          className="pt-8"
        >
          {item.panel}
        </div>
      ))}
    </div>
  );
}
