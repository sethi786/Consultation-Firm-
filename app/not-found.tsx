import Link from "next/link";
import { Container, Button, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col">
      <header className="border-b border-rule">
        <Container className="flex h-16 items-center">
          <Link href="/" className="inline-flex items-baseline gap-2">
            <span className="font-display text-h3 text-ink">Northport</span>
            <span className="font-mono text-mono-xs uppercase text-slate">Security</span>
          </Link>
        </Container>
      </header>

      <Container className="flex flex-1 flex-col justify-center py-24">
        <Eyebrow className="mb-5">Error 404</Eyebrow>
        <h1 className="max-w-measure text-h1 text-ink">
          That page isn&apos;t here.
        </h1>
        <p className="mt-4 max-w-measure text-lede text-slate">
          The link may be old or mistyped. Nothing&apos;s broken on your end — let&apos;s
          get you back to solid ground.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/services" variant="secondary">
            View services
          </Button>
        </div>
      </Container>
    </main>
  );
}
