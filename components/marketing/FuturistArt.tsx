import { WaypointMark } from "@/components/ui";

/**
 * Large-scale generative brand art — futuristic navigation imagery drawn as
 * SVG, no raster assets. Two pieces:
 *
 * - NavGrid: a perspective grid receding to a horizon — a navigation chart in
 *   three-point space. Used as the hero's floor plane.
 * - HorizonBand: a full-bleed wireframe terrain panorama with the brass route
 *   crossing ridgelines to a marked waypoint — the "big picture" band.
 *
 * Both are aria-hidden decoration, deterministic (no randomness — stable
 * SSR), and stay within the banned-motif rules: no hexagons, circuits,
 * particles, or globes — this is chart-room imagery, not cyberpunk.
 */

export function NavGrid({ className }: { className?: string }) {
  const W = 1440;
  const H = 420;
  const cx = W / 2;
  const horizon = 40;
  // Horizontal lines, spacing expanding toward the viewer.
  const rows = Array.from({ length: 11 }, (_, i) => horizon + Math.pow(i / 10, 1.8) * (H - horizon));
  // Radial lines fanning from the vanishing point.
  const fans = Array.from({ length: 21 }, (_, i) => (i - 10) / 10); // -1..1
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      preserveAspectRatio="none"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="navgrid-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.45" stopColor="white" stopOpacity="0.5" />
          <stop offset="1" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="navgrid-mask">
          <rect width={W} height={H} fill="url(#navgrid-fade)" />
        </mask>
      </defs>
      <g mask="url(#navgrid-mask)" stroke="var(--color-pine)" strokeOpacity="0.14">
        {rows.map((y, i) => (
          <line key={`r${i}`} x1="0" y1={y} x2={W} y2={y} strokeWidth={i < 4 ? 0.75 : 1} />
        ))}
        {fans.map((f, i) => (
          <line
            key={`f${i}`}
            x1={cx}
            y1={horizon}
            x2={cx + f * W * 1.1}
            y2={H}
            strokeWidth="0.75"
          />
        ))}
      </g>
    </svg>
  );
}

/** Deterministic ridge heights — a fixed pseudo-noise, stable across renders. */
function ridge(seed: number, x: number): number {
  return (
    Math.sin(x * 0.011 + seed * 1.7) * 26 +
    Math.sin(x * 0.023 + seed * 3.1) * 14 +
    Math.sin(x * 0.005 + seed * 0.7) * 34
  );
}

export function HorizonBand() {
  const W = 1440;
  const H = 520;
  const LINES = 14;
  const paths = Array.from({ length: LINES }, (_, i) => {
    const base = 150 + (i / (LINES - 1)) * 320;
    const amp = 0.35 + (i / (LINES - 1)) * 0.65; // nearer ridges are taller
    const pts = Array.from({ length: 73 }, (_, k) => {
      const x = (k / 72) * W;
      const y = base + ridge(i, x) * amp;
      return `${k === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    });
    return pts.join(" ");
  });
  // The route: crosses the terrain to the waypoint on the far ridge.
  const route = "M60 470 C 300 430, 420 380, 620 330 S 950 260, 1150 215";

  return (
    <section className="relative overflow-hidden bg-night" aria-label="Waypoint — charting the route">
      {/* Aurora light on the horizon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, rgba(79,157,130,0.24), transparent 70%), radial-gradient(40% 40% at 82% 30%, rgba(124,58,237,0.16), transparent 70%)",
        }}
      />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
        preserveAspectRatio="xMidYMax slice"
        className="block h-[46vh] min-h-[320px] w-full"
        fill="none"
      >
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={i === LINES - 1 ? "rgba(244,245,242,0.28)" : "rgba(244,245,242,0.12)"}
            strokeWidth={i > LINES - 4 ? 1.4 : 1}
          />
        ))}
        <path
          d={route}
          stroke="rgba(201,168,94,0.8)"
          strokeWidth="2"
          strokeDasharray="1 9"
          strokeLinecap="round"
        />
        {[[60, 470], [620, 330], [950, 258]].map(([x, y]) => (
          <circle key={`${x}`} cx={x} cy={y} r="3.5" fill="rgba(244,245,242,0.5)" />
        ))}
      </svg>
      {/* The waypoint on the far ridge */}
      <div aria-hidden="true" className="absolute right-[18%] top-[28%] flex flex-col items-center">
        <WaypointMark className="h-8 w-8 text-brass" />
        <span className="mt-2 h-10 w-px bg-gradient-to-b from-brass/70 to-transparent" />
      </div>
      {/* One quiet line of copy — the picture carries the section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 pb-10 text-center">
        <p className="font-mono text-mono-xs uppercase tracking-mono text-paper/60">
          Fix the position · chart the route · prove the fix
        </p>
      </div>
    </section>
  );
}
