"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container, WaypointMark } from "@/components/ui";

/**
 * Full-bleed cinematic brand scene (apple.com / rangerover.com register): a
 * deep night surface, slow aurora light, and large-scale brand art — a
 * topographic chart with a plotted route to a waypoint, which IS the firm's
 * story. Giant display type with a spectrum accent. The art layer drifts on a
 * gentle scroll parallax (transform-only, reduced-motion gated); text is
 * always painted — no opacity gating.
 */

/** Topographic contour art + a dotted route to the waypoint. Pure SVG. */
function TopoArt({ className }: { className?: string }) {
  // Concentric, slightly-rotated ellipses read as contour lines around the
  // summit point; a dashed path is the route; the mark is the waypoint.
  const rings = [
    { rx: 90, ry: 54, rot: -8 },
    { rx: 150, ry: 96, rot: -4 },
    { rx: 215, ry: 142, rot: 2 },
    { rx: 285, ry: 192, rot: 6 },
    { rx: 360, ry: 248, rot: 10 },
    { rx: 440, ry: 310, rot: 13 },
    { rx: 525, ry: 378, rot: 15 },
  ];
  return (
    <svg
      viewBox="0 0 1200 800"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <g transform="translate(760 330)">
        {rings.map((r, i) => (
          <ellipse
            key={i}
            rx={r.rx}
            ry={r.ry}
            transform={`rotate(${r.rot})`}
            stroke="rgba(244,245,242,0.10)"
            strokeWidth={i < 2 ? 1.4 : 1}
          />
        ))}
      </g>
      {/* The route: base camp → waypoint */}
      <path
        d="M80 760 C 260 700, 300 560, 430 520 S 640 470, 700 400 S 745 350 758 332"
        stroke="rgba(201,168,94,0.55)"
        strokeWidth="2"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
      {/* Route checkpoints */}
      {[
        [80, 760],
        [430, 520],
        [700, 400],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="rgba(244,245,242,0.35)" />
      ))}
    </svg>
  );
}

export function CinematicScene() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Gentle counter-scroll drift on the art; none under reduced motion.
  const artY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-night text-paper"
    >
      {/* Aurora light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-[15%] top-[10%] h-[80%] w-[55%] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(79,157,130,0.35), transparent)",
          }}
        />
        <div
          className="absolute -right-[10%] bottom-[-20%] h-[70%] w-[45%] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(124,58,237,0.28), transparent)",
          }}
        />
      </div>

      {/* Brand art — parallax layer */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: artY }}
        className="pointer-events-none absolute inset-0"
      >
        <TopoArt className="h-full w-full object-cover" />
        {/* The waypoint itself, marked in brass at the summit */}
        <WaypointMark className="absolute left-[62.2%] top-[39.5%] h-7 w-7 text-brass" />
      </motion.div>

      <Container className="relative py-32 md:py-48">
        <motion.div
          initial={reduce ? false : { y: 48 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
          className="max-w-3xl"
        >
          <p className="font-mono text-mono-xs uppercase tracking-mono text-paper/60">
            Why “Waypoint”
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.98] tracking-[-0.03em] text-paper text-balance">
            A waypoint is a precise, marked coordinate.{" "}
            <span className="spectrum-text">You navigate by it.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lede text-paper/70">
            That&apos;s the work: fix your position, chart the route, and prove
            every step of the way — with evidence your board and auditors can
            navigate by.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
