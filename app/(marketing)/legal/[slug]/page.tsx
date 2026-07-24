import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow, Chip, Table, THead, TBody, TR, TH, TD } from "@/components/ui";

const LEGAL = {
  security: {
    title: "Security",
    intro:
      "This page is a sales asset, not boilerplate. It publishes our own posture so procurement teams can assess us the way we assess others.",
  },
  privacy: {
    title: "Privacy",
    intro: "How we handle personal data on this site and in engagements.",
  },
  terms: {
    title: "Terms",
    intro: "The terms governing use of this website.",
  },
  dpa: {
    title: "Data processing",
    intro: "Our data processing commitments for client engagements.",
  },
} as const;

type LegalSlug = keyof typeof LEGAL;

export function generateStaticParams() {
  return (Object.keys(LEGAL) as LegalSlug[]).map((slug) => ({ slug }));
}

function isLegalSlug(s: string): s is LegalSlug {
  return s in LEGAL;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isLegalSlug(slug)) return {};
  return {
    title: LEGAL[slug].title,
    description: LEGAL[slug].intro,
    alternates: { canonical: `/legal/${slug}` },
    robots: slug === "security" ? undefined : { index: false },
  };
}

function SecurityPosture() {
  const rows: [string, string][] = [
    ["Headers grade", "{{TODO: publish A+ from securityheaders.com after Phase 7}}"],
    ["Content Security Policy", "Strict, nonce-based, no unsafe-inline (Phase 7)"],
    ["Transport", "HTTPS only, HSTS with preload"],
    ["Hosting", "{{TODO: Vercel region / hosting detail}}"],
    ["Data residency", "{{TODO: where client data is stored and processed}}"],
    ["Subprocessors", "{{TODO: Neon, Resend, Vercel, Plausible — with regions}}"],
    ["Authentication", "Microsoft Entra ID SSO + MFA for the client portal"],
    ["Incident response", "{{TODO: your commitment and notification window}}"],
    ["Analytics", "Plausible — cookieless, no cross-site tracking"],
  ];
  return (
    <Table caption="Northport Security posture">
      <THead>
        <TR>
          <TH>Area</TH>
          <TH>Posture</TH>
        </TR>
      </THead>
      <TBody>
        {rows.map(([k, v]) => (
          <TR key={k}>
            <TD className="whitespace-nowrap font-mono text-mono-xs uppercase text-slate">{k}</TD>
            <TD>{v}</TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isLegalSlug(slug)) notFound();
  const page = LEGAL[slug];

  return (
    <Container width="measure" className="py-14 md:py-20">
      <div className="mb-5 flex items-center gap-3">
        <Eyebrow>Legal</Eyebrow>
        {slug !== "security" && <Chip>Draft</Chip>}
      </div>
      <h1 className="text-display text-ink">{page.title}</h1>
      <p className="mt-4 text-lede text-slate">{page.intro}</p>

      <div className="mt-10">
        {slug === "security" ? (
          <SecurityPosture />
        ) : (
          <p className="text-body text-slate">
            {`{{TODO: ${page.title} content — to be drafted and reviewed by counsel before launch.}}`}
          </p>
        )}
      </div>
    </Container>
  );
}
