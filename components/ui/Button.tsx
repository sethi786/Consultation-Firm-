import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Trailing glyph slot (e.g. an arrow). Kept decorative. */
  trailing?: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  prefetch?: boolean;
  onClick?: () => void;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-body font-medium transition-colors duration-150 ease-doc disabled:cursor-not-allowed disabled:opacity-45";

const sizes: Record<Size, string> = {
  sm: "text-small px-3.5 py-1.5",
  md: "text-small px-5 py-2.5",
};

const variants: Record<Variant, string> = {
  // Pine fill — the primary action. Paper text meets AA on pine.
  primary: "bg-pine text-paper hover:bg-pine-lift",
  // Ink outline — secondary.
  secondary: "border border-ink/25 text-ink hover:border-ink/60 hover:bg-ink/[0.03]",
  // Text only — the brass underline motif (one of the three permitted brass uses).
  ghost:
    "text-pine underline decoration-brass decoration-2 underline-offset-4 hover:text-pine-lift hover:decoration-brass-lift px-1",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, trailing } = props;
  const classes = cn(base, sizes[size], variants[variant], className);
  const content = (
    <>
      {children}
      {trailing && <span aria-hidden="true">{trailing}</span>}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, prefetch, onClick } = props;
    return (
      <Link href={href} prefetch={prefetch} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  // Strip the presentational props so only valid DOM attributes reach <button>.
  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    trailing: _t,
    ...buttonAttrs
  } = props;

  return (
    <button className={classes} {...buttonAttrs}>
      {content}
    </button>
  );
}
