/**
 * Minimal className joiner. Filters falsy values so conditional classes read
 * cleanly. No dependency — we don't need clsx/tailwind-merge for this surface.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
