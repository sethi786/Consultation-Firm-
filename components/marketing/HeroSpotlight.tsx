"use client";

import { useEffect, useRef } from "react";

/**
 * Hero backdrop — a slow pine "aurora" that drifts, plus a soft glow that
 * follows the pointer. Absolutely positioned inside the hero section (its
 * parent must be `relative`). Purely decorative: `aria-hidden`, pointer-events
 * none, and fully stilled by the global reduced-motion killswitch.
 */
export function HeroSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null);
  const spotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // No pointer-follow on touch — the aurora carries it there.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const host = ref.current?.parentElement;
    const spot = spotRef.current;
    if (!host || !spot) return;

    let raf = 0;
    function onMove(e: PointerEvent) {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = host!.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        spot!.style.setProperty("--mx", `${x}%`);
        spot!.style.setProperty("--my", `${y}%`);
        spot!.dataset.active = "true";
      });
    }
    function onLeave() {
      spot!.dataset.active = "false";
    }
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Slow drifting aurora */}
      <div
        className="aurora absolute left-1/2 top-[-20%] h-[70%] w-[80%] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-pine) 14%, transparent), transparent)",
        }}
      />
      {/* Pointer-follow glow */}
      <div ref={spotRef} className="spotlight absolute inset-0" data-active="false" />
    </div>
  );
}
