"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 up to `value` the first time it scrolls into view — a calm,
 * Wealthsimple-style number reveal. Fully gated behind `prefers-reduced-motion`:
 * reduced-motion users see the final value immediately, with no animation.
 * Renders a <span> with tabular figures so the width doesn't jitter mid-count.
 */
export function CountUp({
  value,
  durationMs = 1100,
  className,
  suffix = "",
}: {
  value: number;
  durationMs?: number;
  className?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      setDone(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          // easeOutCubic — quick then settles, matching --ease-doc's feel.
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * value));
          if (t < 1) requestAnimationFrame(tick);
          else setDone(true);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, durationMs, done]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
      {suffix}
    </span>
  );
}
