import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Dark-surface primitives for the portal (CLAUDE.md §7). Mono-heavy, dense. */

export function PortalButton({
  variant = "primary",
  className,
  children,
  ...rest
}: {
  variant?: "primary" | "ghost" | "danger";
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const variants = {
    primary: "bg-portal-brass text-portal-bg hover:opacity-90 font-medium",
    ghost: "border border-portal-line text-portal-ink hover:bg-portal-panel",
    danger: "border border-sev-high/40 text-sev-high hover:bg-sev-high/10",
  } as const;
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded px-4 py-2 text-small transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-brass disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function PortalPanel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("rounded-lg border border-portal-line bg-portal-panel", className)}>
      {children}
    </div>
  );
}

export function PortalEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-mono-xs uppercase text-portal-ink-2", className)}>{children}</p>
  );
}

const SEV_CLASS: Record<string, string> = {
  critical: "bg-sev-crit/15 text-[#e88a7d] ring-sev-crit/40",
  high: "bg-sev-high/15 text-[#e0a06a] ring-sev-high/40",
  medium: "bg-sev-med/15 text-[#cbbd7a] ring-sev-med/40",
  low: "bg-sev-low/20 text-[#9fc0b2] ring-sev-low/40",
  info: "bg-portal-line text-portal-ink-2 ring-portal-line",
};

const STATUS_CLASS: Record<string, string> = {
  open: "bg-sev-high/15 text-[#e0a06a] ring-sev-high/40",
  in_progress: "bg-sev-med/15 text-[#cbbd7a] ring-sev-med/40",
  pending_verification: "bg-sev-low/20 text-[#9fc0b2] ring-sev-low/40",
  remediated: "bg-status-remediated/20 text-[#7fc79f] ring-status-remediated/40",
  closed: "bg-portal-line text-portal-ink-2 ring-portal-line",
};

export function SeverityChip({ severity }: { severity: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 font-mono text-mono-xs uppercase ring-1 ring-inset",
        SEV_CLASS[severity] ?? SEV_CLASS.info,
      )}
    >
      {severity}
    </span>
  );
}

export function StatusChip({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 font-mono text-mono-xs uppercase ring-1 ring-inset",
        STATUS_CLASS[status] ?? STATUS_CLASS.closed,
      )}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

export function PortalInput({
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded border border-portal-line bg-portal-bg px-3 py-2 text-body text-portal-ink placeholder:text-portal-ink-2/60 focus:border-portal-brass focus-visible:outline-none",
        className,
      )}
      {...rest}
    />
  );
}
