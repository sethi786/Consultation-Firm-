import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EyebrowProps {
  /** Section index, e.g. 2 -> "§ 02". Omit for an unnumbered label. */
  index?: number;
  /** Optional framework/reference the section speaks to, shown after an em dash. */
  reference?: string;
  className?: string;
  children: ReactNode;
}

/**
 * The margin annotation (§3.5): mono, uppercase, e.g. "§ 02 — SERVICES".
 * The structural motif that ties marketing pages to the portal.
 */
export function Eyebrow({ index, reference, className, children }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-mono text-mono-xs uppercase text-slate",
        className,
      )}
    >
      {typeof index === "number" && (
        <span className="text-brass-lift">§&nbsp;{String(index).padStart(2, "0")}</span>
      )}
      {typeof index === "number" && <span className="text-rule">{"  —  "}</span>}
      <span className="text-slate">{children}</span>
      {reference && <span className="text-slate">{"  ·  "}{reference}</span>}
    </p>
  );
}
