import { Container } from "@/components/ui";

/**
 * Route-transition skeleton for the marketing site. Calm, documentary — a few
 * hairline placeholders rather than a spinner. The pulse is stilled under
 * prefers-reduced-motion by the global killswitch (globals.css §3.6).
 */
export default function Loading() {
  return (
    <Container className="py-20 md:py-28">
      <p className="font-mono text-mono-xs uppercase tracking-mono text-slate">Loading</p>
      <div className="mt-6 h-9 w-3/4 max-w-2xl animate-pulse rounded bg-rule/70" />
      <div className="mt-4 h-4 w-1/2 max-w-md animate-pulse rounded bg-rule/50" />
      <div className="mt-10 h-64 w-full animate-pulse rounded-lg border border-rule bg-paper-sunk/40" />
    </Container>
  );
}
