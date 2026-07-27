"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll-reveal: content rises and fades in the first time it enters the
 * viewport. Subtle and premium, not bouncy.
 *
 * Fail-safe by design: content is NEVER left permanently hidden. If
 * `prefers-reduced-motion` is set, IntersectionObserver is unavailable, or the
 * observer simply never fires (some mobile browsers, fast scrolls, background
 * tabs), a short safety timeout reveals the content anyway. The animation is an
 * enhancement — the words always show.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  /** Stagger, in ms. */
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      setReduced(true);
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) {
      setShown(true);
      return;
    }

    // Safety net: reveal no matter what within 700ms, so content is never stuck
    // hidden if the observer never fires on this device.
    const safety = window.setTimeout(() => setShown(true), 700);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            window.clearTimeout(safety);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        // TRANSFORM-ONLY reveal: content is always visible (no opacity gate), so
        // a browser that never fires the observer still shows everything — the
        // slide is pure enhancement.
        !reduced && "motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-doc",
        !reduced && !shown && "translate-y-3",
        !reduced && shown && "translate-y-0",
        className,
      )}
      style={!reduced && shown ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
