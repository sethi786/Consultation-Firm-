import { cn } from "@/lib/cn";

/**
 * The Waypoint mark — a precise navigation marker: an upward beacon with a
 * notched base, the coordinate you steer by. Geometric, institutional, and set
 * in `currentColor` so it inherits ink/pine/paper from context. Paired with the
 * Newsreader wordmark; never used as decoration on its own inside content.
 */
export function WaypointMark({
  className,
  title = "",
}: {
  className?: string;
  /** Accessible name. Empty (the default) renders the mark as decorative —
   *  correct wherever it sits beside the visible "Waypoint" wordmark. */
  title?: string;
}) {
  const a11y = title
    ? ({ role: "img", "aria-label": title } as const)
    : ({ "aria-hidden": true } as const);
  return (
    <svg
      viewBox="0 0 24 24"
      {...a11y}
      className={cn("h-[1.05em] w-[1.05em]", className)}
      fill="currentColor"
    >
      <path d="M12 2.5 L20 20 L12 15.4 L4 20 Z" />
    </svg>
  );
}
