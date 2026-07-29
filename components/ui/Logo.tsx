import { cn } from "@/lib/cn";

/**
 * The Waypoint mark — a precise navigation marker: an upward beacon with a
 * notched base, the coordinate you steer by. Geometric, institutional, and set
 * in `currentColor` so it inherits ink/pine/paper from context. Paired with the
 * Newsreader wordmark; never used as decoration on its own inside content.
 */
export function WaypointMark({
  className,
  title = "Waypoint",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
      className={cn("h-[1.05em] w-[1.05em]", className)}
      fill="currentColor"
    >
      <path d="M12 2.5 L20 20 L12 15.4 L4 20 Z" />
    </svg>
  );
}
