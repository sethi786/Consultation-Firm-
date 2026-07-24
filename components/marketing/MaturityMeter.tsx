import { cn } from "@/lib/cn";
import type { Maturity } from "@/content/controls";

/**
 * Five-segment maturity meter (§3.4). Current is filled (pine); the target
 * segment carries a brass marker. A visually-hidden text alternative ("3 → 4")
 * is always present for assistive tech and the no-CSS document.
 *
 * `animate` fills the current segments on first paint (approved motion #2, §3.6).
 */
export function MaturityMeter({
  current,
  target,
  animate = false,
  delayMs = 0,
}: {
  current: Maturity;
  target: Maturity;
  animate?: boolean;
  delayMs?: number;
}) {
  const segments = [1, 2, 3, 4, 5] as const;
  return (
    <span className="inline-flex items-center gap-2">
      <span className="inline-flex gap-[3px]" aria-hidden="true">
        {segments.map((n) => {
          const filled = n <= current;
          const isTarget = n === target && n > current;
          return (
            <span
              key={n}
              className={cn(
                "h-3.5 w-[7px] rounded-[1px] border",
                filled
                  ? "border-pine bg-pine"
                  : isTarget
                    ? "border-brass bg-transparent"
                    : "border-rule bg-transparent",
                animate && filled && "origin-left animate-[meter-fill_360ms_var(--ease-doc)_both]",
              )}
              style={animate && filled ? { animationDelay: `${delayMs}ms` } : undefined}
            />
          );
        })}
      </span>
      <span className="font-mono text-mono-xs text-slate tabular-nums" aria-hidden="true">
        {current}&nbsp;→&nbsp;{target}
      </span>
      <span className="sr-only">
        Current maturity {current} of 5, target {target} of 5
      </span>
    </span>
  );
}
