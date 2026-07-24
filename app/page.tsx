import { Container, Button, Eyebrow } from "@/components/ui";

// Placeholder homepage. The real homepage (Control Register hero, §4) is built
// in Phase 3 once the register component exists.
export default function Home() {
  return (
    <main>
      <Container className="py-24">
        <Eyebrow className="mb-4">Northport Security</Eyebrow>
        <h1 className="max-w-measure text-h1">
          Evidence-led security consulting.
        </h1>
        <p className="mt-4 max-w-measure text-lede text-slate">
          Homepage under construction. The design system is available for review.
        </p>
        <div className="mt-8 flex gap-4">
          <Button href="/styleguide" variant="primary">
            View the style guide
          </Button>
        </div>
      </Container>
    </main>
  );
}
