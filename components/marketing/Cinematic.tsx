"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Cinematic section reveal — a soft spring rise as sections enter the
 * viewport, with optional child staggering. TRANSFORM-ONLY (no opacity gate):
 * content is painted in the SSR output and can never be left hidden if
 * hydration or the animation fails (the blank-page bug class). Fully stilled
 * under prefers-reduced-motion.
 */

const SPRING = { type: "spring", stiffness: 90, damping: 18, mass: 0.9 } as const;

export function CinematicSection({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ y: 44 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container + item pair for card grids. */
export function CinematicGroup({
  children,
  className,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="off"
      whileInView="on"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ on: { transition: { staggerChildren: stagger } }, off: {} }}
    >
      {children}
    </motion.div>
  );
}

export function CinematicItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{ off: { y: 36 }, on: { y: 0, transition: SPRING } }}
    >
      {children}
    </motion.div>
  );
}
