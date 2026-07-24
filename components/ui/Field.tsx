"use client";

import {
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

interface FieldShellProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  /** Render-prop receives the wiring to spread onto the control. */
  children: (wiring: {
    id: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    "aria-required"?: boolean;
  }) => ReactNode;
}

const controlBase =
  "w-full rounded border bg-paper px-3 py-2 text-body text-ink placeholder:text-slate/60 transition-colors focus:border-pine focus-visible:outline-none disabled:opacity-45";

function FieldShell({ label, hint, error, required, children }: FieldShellProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-mono-xs uppercase text-slate">
        {label}
        {required && <span className="text-sev-crit"> *</span>}
      </label>
      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        "aria-required": required || undefined,
      })}
      {hint && !error && (
        <p id={hintId} className="text-caption text-slate">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-caption text-sev-crit">
          {error}
        </p>
      )}
    </div>
  );
}

function borderState(error?: string) {
  return error ? "border-sev-crit" : "border-rule";
}

export function Field({
  label,
  hint,
  error,
  required,
  className,
  ...rest
}: {
  label: string;
  hint?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required}>
      {(wiring) => (
        <input {...wiring} className={cn(controlBase, borderState(error), className)} required={required} {...rest} />
      )}
    </FieldShell>
  );
}

export function TextareaField({
  label,
  hint,
  error,
  required,
  className,
  ...rest
}: {
  label: string;
  hint?: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required}>
      {(wiring) => (
        <textarea
          {...wiring}
          className={cn(controlBase, borderState(error), "min-h-32 resize-y", className)}
          required={required}
          {...rest}
        />
      )}
    </FieldShell>
  );
}

export function SelectField({
  label,
  hint,
  error,
  required,
  className,
  children,
  ...rest
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required}>
      {(wiring) => (
        <select
          {...wiring}
          className={cn(controlBase, borderState(error), "appearance-none pr-8", className)}
          required={required}
          {...rest}
        >
          {children}
        </select>
      )}
    </FieldShell>
  );
}
