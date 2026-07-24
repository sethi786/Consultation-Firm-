import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GridProps {
  className?: string;
  children: ReactNode;
}

/**
 * The 12-column grid (§3.5). Gutter is 24px. Place children with
 * `col-span-*` utilities (or the <Col> helper) against `grid-cols-12`.
 */
export function Grid({ className, children }: GridProps) {
  return (
    <div className={cn("grid grid-cols-4 gap-6 md:grid-cols-12", className)}>
      {children}
    </div>
  );
}

interface ColProps {
  span?: number; // columns at md+ (out of 12)
  spanSm?: number; // columns below md (out of 4)
  start?: number; // md+ start line
  className?: string;
  children: ReactNode;
}

const spanMd: Record<number, string> = {
  1: "md:col-span-1", 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4",
  5: "md:col-span-5", 6: "md:col-span-6", 7: "md:col-span-7", 8: "md:col-span-8",
  9: "md:col-span-9", 10: "md:col-span-10", 11: "md:col-span-11", 12: "md:col-span-12",
};
const spanBase: Record<number, string> = {
  1: "col-span-1", 2: "col-span-2", 3: "col-span-3", 4: "col-span-4",
};
const startMd: Record<number, string> = {
  1: "md:col-start-1", 2: "md:col-start-2", 3: "md:col-start-3", 4: "md:col-start-4",
  5: "md:col-start-5", 6: "md:col-start-6", 7: "md:col-start-7", 8: "md:col-start-8",
  9: "md:col-start-9", 10: "md:col-start-10", 11: "md:col-start-11", 12: "md:col-start-12",
};

export function Col({ span = 12, spanSm = 4, start, className, children }: ColProps) {
  return (
    <div
      className={cn(
        spanBase[spanSm],
        spanMd[span],
        start ? startMd[start] : undefined,
        className,
      )}
    >
      {children}
    </div>
  );
}
