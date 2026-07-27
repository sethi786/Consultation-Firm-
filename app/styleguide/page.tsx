import type { Metadata } from "next";
import { ControlRegister } from "@/components/marketing/ControlRegister";
import {
  Button,
  Chip,
  Container,
  Grid,
  Col,
  Eyebrow,
  Rule,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  Field,
  TextareaField,
  SelectField,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

function Section({
  index,
  title,
  reference,
  children,
}: {
  index: number;
  title: string;
  reference?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-14">
      <Eyebrow index={index} reference={reference} className="mb-6">
        {title}
      </Eyebrow>
      {children}
    </section>
  );
}

const typeSpecimens = [
  { cls: "text-display font-display", name: "display", note: "5rem · Newsreader" },
  { cls: "text-h1 font-display", name: "h1", note: "3.5rem · -0.03em" },
  { cls: "text-h2 font-display", name: "h2", note: "2.25rem" },
  { cls: "text-h3 font-display", name: "h3", note: "1.5rem" },
  { cls: "text-lede font-body", name: "lede", note: "1.5rem · Public Sans" },
  { cls: "text-body font-body", name: "body", note: "1.125rem · lh 1.65" },
  { cls: "text-small font-body", name: "small", note: "0.9375rem" },
  { cls: "text-caption font-body", name: "caption", note: "0.8125rem" },
  { cls: "text-mono font-mono", name: "mono", note: "0.8125rem · IBM Plex Mono" },
  { cls: "text-mono-xs font-mono uppercase", name: "mono-xs", note: "0.6875rem · 0.08em" },
];

const swatches = [
  ["ink", "bg-ink"],
  ["pine", "bg-pine"],
  ["pine-lift", "bg-pine-lift"],
  ["slate", "bg-slate"],
  ["rule", "bg-rule"],
  ["paper", "bg-paper"],
  ["paper-sunk", "bg-paper-sunk"],
  ["brass", "bg-brass"],
  ["brass-lift", "bg-brass-lift"],
];

const sevSwatches = [
  ["sev-crit", "bg-sev-crit"],
  ["sev-high", "bg-sev-high"],
  ["sev-med", "bg-sev-med"],
  ["sev-low", "bg-sev-low"],
  ["remediated", "bg-status-remediated"],
];

export default function StyleGuidePage() {
  return (
    <main>
      <Container>
        <header className="border-b border-rule py-14">
          <Eyebrow className="mb-4">Waypoint · design system</Eyebrow>
          <h1 className="text-display">Style guide</h1>
          <p className="mt-4 max-w-measure text-lede text-slate">
            Every primitive at every variant, and the full type scale — reviewed in
            one view before we build pages. Evidence, not theatre.
          </p>
        </header>

        <Section index={0} title="Control register — signature element" reference="§3.4">
          <p className="mb-8 max-w-measure text-small text-slate">
            The homepage hero. Every framework reference is verified against the
            published framework. Hover or focus a service to filter; click to pin,
            Escape to clear. Rows populate in a cascade on load (under 900ms), gated
            by reduced-motion.
          </p>
          <ControlRegister />
        </Section>

        <Rule />

        <Section index={1} title="Type scale" reference="§3.3">
          <div className="divide-y divide-rule">
            {typeSpecimens.map((t) => (
              <div
                key={t.name}
                className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-8"
              >
                <div className="flex w-40 shrink-0 items-baseline justify-between gap-3">
                  <span className="font-mono text-mono-xs uppercase text-slate">
                    {t.name}
                  </span>
                  <span className="font-mono text-mono-xs text-slate/70">{t.note}</span>
                </div>
                <p className={`${t.cls} min-w-0 truncate`}>
                  Evidence, not theatre
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Rule />

        <Section index={2} title="Colour" reference="§3.2">
          <p className="mb-6 max-w-measure text-small text-slate">
            Institutional, not cyberpunk. Brass appears at most three times per
            viewport. Severity colour only ever appears inside data chips.
          </p>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-9">
            {swatches.map(([name, bg]) => (
              <div key={name}>
                <div className={`h-16 w-full rounded border border-rule ${bg}`} />
                <p className="mt-2 font-mono text-mono-xs uppercase text-slate">{name}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 md:grid-cols-5">
            {sevSwatches.map(([name, bg]) => (
              <div key={name}>
                <div className={`h-16 w-full rounded border border-rule ${bg}`} />
                <p className="mt-2 font-mono text-mono-xs uppercase text-slate">{name}</p>
              </div>
            ))}
          </div>
        </Section>

        <Rule />

        <Section index={3} title="Buttons" reference="§3.9">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Book an assessment</Button>
            <Button variant="secondary">View services</Button>
            <Button variant="ghost" trailing="→">
              Read the method
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="sm">
              Small primary
            </Button>
            <Button variant="secondary" size="sm">
              Small secondary
            </Button>
            <Button variant="primary" href="#">
              As a link
            </Button>
          </div>
        </Section>

        <Rule />

        <Section index={4} title="Chips" reference="§3.3">
          <div className="mb-4">
            <p className="mb-3 font-mono text-mono-xs uppercase text-slate">Severity</p>
            <div className="flex flex-wrap gap-3">
              <Chip variant="crit">Critical</Chip>
              <Chip variant="high">High</Chip>
              <Chip variant="med">Medium</Chip>
              <Chip variant="low">Low</Chip>
              <Chip variant="info">Info</Chip>
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-3 font-mono text-mono-xs uppercase text-slate">Status</p>
            <div className="flex flex-wrap gap-3">
              <Chip variant="open">Open</Chip>
              <Chip variant="progress">In progress</Chip>
              <Chip variant="pending">Pending verification</Chip>
              <Chip variant="remediated">Remediated</Chip>
            </div>
          </div>
          <div>
            <p className="mb-3 font-mono text-mono-xs uppercase text-slate">Framework tags</p>
            <div className="flex flex-wrap gap-3">
              <Chip>NIST CSF 2.0</Chip>
              <Chip>ISO 27001:2022</Chip>
              <Chip>CIS v8</Chip>
            </div>
          </div>
        </Section>

        <Rule />

        <Section index={5} title="Table" reference="§8">
          <Table caption="Example findings table">
            <THead>
              <TR>
                <TH>Ref</TH>
                <TH>Finding</TH>
                <TH>Severity</TH>
                <TH numeric>Age (days)</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD className="font-mono text-mono-xs text-slate">NPT-014</TD>
                <TD>Standing global admin on 6 accounts</TD>
                <TD>
                  <Chip variant="crit">Critical</Chip>
                </TD>
                <TD numeric>12</TD>
              </TR>
              <TR>
                <TD className="font-mono text-mono-xs text-slate">NPT-021</TD>
                <TD>Storage account public network access enabled</TD>
                <TD>
                  <Chip variant="high">High</Chip>
                </TD>
                <TD numeric>4</TD>
              </TR>
              <TR>
                <TD className="font-mono text-mono-xs text-slate">NPT-033</TD>
                <TD>Legacy auth not blocked in Conditional Access</TD>
                <TD>
                  <Chip variant="med">Medium</Chip>
                </TD>
                <TD numeric>1</TD>
              </TR>
            </TBody>
          </Table>
        </Section>

        <Rule />

        <Section index={6} title="Fields" reference="§3.9">
          <form className="grid max-w-xl grid-cols-1 gap-6">
            <Field label="Work email" type="email" placeholder="you@company.com" required hint="We reply within one business day." />
            <SelectField label="Service" defaultValue="" required>
              <option value="" disabled>
                Select a service
              </option>
              <option value="ai-security">AI &amp; LLM Security</option>
              <option value="cloud-security">Cloud Security</option>
              <option value="identity">Identity &amp; Access</option>
            </SelectField>
            <Field label="Seat count" type="text" defaultValue="not a number" error="Enter a whole number between 1 and 100,000." />
            <TextareaField label="What prompted this?" placeholder="One or two sentences is plenty." />
          </form>
        </Section>

        <Rule />

        <Section index={7} title="Grid" reference="§3.5">
          <Grid>
            {Array.from({ length: 12 }).map((_, i) => (
              <Col key={i} span={1} spanSm={1}>
                <div className="flex h-12 items-center justify-center rounded border border-rule bg-paper-sunk font-mono text-mono-xs text-slate">
                  {i + 1}
                </div>
              </Col>
            ))}
          </Grid>
          <Grid className="mt-4">
            <Col span={8} spanSm={4}>
              <div className="flex h-12 items-center justify-center rounded border border-rule bg-paper-sunk font-mono text-mono-xs text-slate">
                span 8
              </div>
            </Col>
            <Col span={4} spanSm={4}>
              <div className="flex h-12 items-center justify-center rounded border border-rule bg-paper-sunk font-mono text-mono-xs text-slate">
                span 4
              </div>
            </Col>
          </Grid>
        </Section>

        <Rule />

        <Section index={8} title="Eyebrow & rule" reference="§3.5">
          <div className="space-y-4">
            <Eyebrow index={2} reference="ISO 27001 A.8">
              Services
            </Eyebrow>
            <Eyebrow>Unnumbered running head</Eyebrow>
            <Rule />
            <p className="text-small text-slate">A hairline rule separates the document — no cards, no shadows.</p>
          </div>
        </Section>
      </Container>
    </main>
  );
}
