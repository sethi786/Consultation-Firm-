import type { ReactNode, ThHTMLAttributes, TdHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Semantic table primitives (§8: "real tables for tabular data"). The mono
 * uppercase header treatment and hairline row rules are the document motif.
 * Numeric cells right-align via `numeric`.
 */

export function Table({
  className,
  children,
  caption,
}: {
  className?: string;
  children: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full border-collapse text-left", className)}>
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        {children}
      </table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b border-rule bg-paper-sunk/60">{children}</thead>
  );
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TR({
  className,
  children,
  ...rest
}: {
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b border-rule/70 transition-colors hover:bg-paper-sunk/50",
        className,
      )}
      {...rest}
    >
      {children}
    </tr>
  );
}

export function TH({
  className,
  children,
  numeric,
  scope = "col",
  ...rest
}: {
  numeric?: boolean;
} & ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope={scope}
      className={cn(
        "px-3 py-2.5 font-mono text-mono-xs font-medium uppercase text-slate",
        numeric ? "text-right tabular-nums" : "text-left",
        className,
      )}
      {...rest}
    >
      {children}
    </th>
  );
}

export function TD({
  className,
  children,
  numeric,
  ...rest
}: {
  numeric?: boolean;
} & TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        "px-3 py-2.5 align-middle text-small text-ink",
        numeric ? "text-right tabular-nums" : "text-left",
        className,
      )}
      {...rest}
    >
      {children}
    </td>
  );
}
