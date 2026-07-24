import { cn } from "@/lib/cn";

interface RuleProps {
  orientation?: "horizontal" | "vertical";
  /** Render as a semantic <hr> (horizontal only). Default true for horizontal. */
  semantic?: boolean;
  className?: string;
}

/**
 * A hairline rule (§3.5). Rules — not cards or shadows — separate the document.
 */
export function Rule({ orientation = "horizontal", semantic = true, className }: RuleProps) {
  if (orientation === "vertical") {
    return (
      <span
        aria-hidden="true"
        className={cn("inline-block w-px self-stretch bg-rule", className)}
      />
    );
  }
  if (semantic) {
    return <hr className={cn("border-0 border-t border-rule", className)} />;
  }
  return <div aria-hidden="true" className={cn("h-px w-full bg-rule", className)} />;
}
