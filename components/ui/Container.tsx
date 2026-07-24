import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerWidth = "page" | "measure";

interface ContainerProps {
  as?: ElementType;
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
}

/**
 * Enforces the layout frame (§3.5): 1280px max, 24px gutters, centred.
 * `measure` narrows to the 68ch reading measure for long-form copy.
 */
export function Container({
  as: Tag = "div",
  width = "page",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 md:px-8",
        width === "page" && "max-w-page",
        width === "measure" && "max-w-measure",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
