"use client";

import { Container, Button } from "@/components/ui";

/**
 * Error boundary for the marketing site. States what happened and the fix, in
 * the firm's voice — no apology, no stack trace to the buyer (§5). Errors are
 * logged server-side; the digest is shown quietly for support reference.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-24 md:py-32">
      <p className="font-mono text-mono-xs uppercase tracking-mono text-slate">Error</p>
      <h1 className="mt-4 max-w-2xl text-h1 text-ink text-balance">This page didn&apos;t load.</h1>
      <p className="mt-5 max-w-measure text-body text-slate">
        Something on our side interrupted it. Try again — and if it keeps happening,
        book an assessment and tell us what you were doing, and we&apos;ll look into it.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
      {error.digest && (
        <p className="mt-10 font-mono text-mono-xs uppercase tracking-mono text-slate/50">
          Reference {error.digest}
        </p>
      )}
    </Container>
  );
}
