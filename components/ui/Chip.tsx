import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ChipVariant =
  | "default"
  | "crit"
  | "high"
  | "med"
  | "low"
  | "info"
  | "open"
  | "progress"
  | "pending"
  | "remediated";

interface ChipProps {
  variant?: ChipVariant;
  className?: string;
  children: ReactNode;
}

/**
 * A data chip (§3.3). Mono, uppercase, tinted. Severity colour only ever
 * appears inside these — never as page decoration (§3.2).
 */
const variants: Record<ChipVariant, string> = {
  default: "bg-paper-sunk text-slate ring-rule",
  crit: "bg-sev-crit-tint text-sev-crit ring-sev-crit/25",
  high: "bg-sev-high-tint text-sev-high ring-sev-high/25",
  med: "bg-sev-med-tint text-sev-med ring-sev-med/25",
  low: "bg-sev-low-tint text-sev-low ring-sev-low/25",
  info: "bg-paper-sunk text-slate ring-rule",
  // Status
  open: "bg-sev-high-tint text-sev-high ring-sev-high/25",
  progress: "bg-sev-med-tint text-sev-med ring-sev-med/25",
  pending: "bg-sev-low-tint text-sev-low ring-sev-low/25",
  remediated: "bg-status-remediated-tint text-status-remediated ring-status-remediated/25",
};

export function Chip({ variant = "default", className, children }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 font-mono text-mono-xs uppercase ring-1 ring-inset",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
