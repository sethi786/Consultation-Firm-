import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow, Table, THead, TBody, TR, TH, TD } from "@/components/ui";

type Section = { heading: string; body: string[] };

const LEGAL: Record<
  string,
  { title: string; intro: string; index: boolean; sections?: Section[] }
> = {
  security: {
    title: "Security",
    intro:
      "This page is a sales asset, not boilerplate. We publish our own posture so procurement teams can assess us the way we assess others.",
    index: true,
  },
  privacy: {
    title: "Privacy",
    intro: "What personal data we collect on this site and in engagements, and how we handle it.",
    index: true,
    sections: [
      {
        heading: "What we collect",
        body: [
          "When you use the contact form, we collect the details you provide: your name, work email, organisation, an optional seat count, and your message.",
          "If your organisation uses the client portal, we hold the account and engagement data needed to deliver the service — your email, role, and the findings, documents, and engagement records for your organisation.",
          "Our servers keep standard technical logs (such as IP address and request metadata) to operate the site securely and prevent abuse.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "To respond to your enquiry and scope an engagement, to deliver and operate our services, and to keep the site and portal secure. We do not sell your data, and we do not use it for advertising.",
        ],
      },
      {
        heading: "Cookies & analytics",
        body: [
          "The public site sets no advertising or cross-site tracking cookies — which is why there is no cookie banner. We use Plausible for analytics, which is cookieless and collects no personal data.",
          "The authenticated client portal uses a single, essential session cookie so you can stay signed in. It is not used for tracking.",
        ],
      },
      {
        heading: "Who we share it with",
        body: [
          "We use a small number of subprocessors to run the service — hosting, database, transactional email, and cookieless analytics (listed on our Security page). They process data only on our instructions. We do not sell or rent personal data to anyone.",
        ],
      },
      {
        heading: "Retention & your rights",
        body: [
          "We keep personal data only as long as needed for the purpose it was collected, then delete or anonymise it. You can ask us to access, correct, or delete your personal data — reach us through the contact form and we will respond.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms",
    intro: "The terms governing use of this website.",
    index: true,
    sections: [
      {
        heading: "Use of this site",
        body: [
          "You may use this website for lawful purposes only. You agree not to attempt to disrupt it, probe it without authorisation, or use it to infringe anyone's rights. (If you'd like to test our security, talk to us first — it's literally what we do.)",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "The content, design, and code of this site are owned by Northport Security or its licensors and are provided for your information. Framework references (NIST CSF, ISO/IEC 27001, CIS Controls) belong to their respective bodies and are used for identification only.",
        ],
      },
      {
        heading: "No warranty; no advice",
        body: [
          "The information on this site is provided in good faith and for general information. It is not security, legal, or compliance advice for your specific situation, and it is provided without warranties of any kind.",
        ],
      },
      {
        heading: "Engagements are governed separately",
        body: [
          "Any work we do for you is governed by the separate written agreement we sign with you — a master services agreement, statement of work, and data processing agreement. Where those terms differ from anything on this site, they prevail.",
        ],
      },
    ],
  },
  dpa: {
    title: "Data processing",
    intro: "How we handle client data when we deliver services.",
    index: true,
    sections: [
      {
        heading: "Our role",
        body: [
          "When we deliver an engagement, you are the controller of your data and we act as your processor, handling it only to provide the agreed services and only on your documented instructions.",
        ],
      },
      {
        heading: "Security measures",
        body: [
          "We apply least-privilege, time-bound access; row-level tenant isolation in the client portal so one client can never see another's data; audit logging of document access; encryption in transit; and short, refreshed sessions with MFA. Our own posture is published on the Security page.",
        ],
      },
      {
        heading: "Subprocessors",
        body: [
          "We use vetted subprocessors for hosting, database, transactional email, and cookieless analytics (listed on the Security page). We remain responsible for their handling of your data and will give you notice of material changes.",
        ],
      },
      {
        heading: "Breach notification, requests & deletion",
        body: [
          "We will notify you without undue delay if we become aware of a personal-data breach affecting your data, help you respond to data-subject requests, and return or delete your data on the termination of an engagement.",
          "The binding data processing agreement is executed alongside your master services agreement; this page summarises it.",
        ],
      },
    ],
  },
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return Object.keys(LEGAL).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = LEGAL[slug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.intro,
    alternates: { canonical: `/legal/${slug}` },
  };
}

function SecurityPosture() {
  const rows: [string, string][] = [
    ["Security headers", "Strict CSP (per-request nonce, no unsafe-inline scripts), HSTS with preload, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors 'none'"],
    ["Transport", "HTTPS only; HSTS with preload directive"],
    ["Hosting", "Vercel — serverless, US region; every deploy is immutable and previewable"],
    ["Application data", "Managed PostgreSQL; region configurable per engagement"],
    ["Subprocessors", "Vercel (hosting), Neon (database), Resend (transactional email), Plausible (cookieless analytics)"],
    ["Portal access control", "Microsoft Entra ID SSO with MFA, or email/password; short refreshed sessions; row-level tenant isolation; audited document downloads"],
    ["Analytics", "Plausible — cookieless, no cross-site tracking, no advertising cookies"],
    ["Incident response", "Documented process; breach-notification commitments set in the engagement data processing agreement"],
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
            <TD className="whitespace-nowrap align-top font-mono text-mono-xs uppercase text-slate">{k}</TD>
            <TD className="align-top">{v}</TD>
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
  const page = LEGAL[slug];
  if (!page) notFound();

  return (
    <Container width="measure" className="py-14 md:py-20">
      <Eyebrow className="mb-5">Legal</Eyebrow>
      <h1 className="text-display text-ink">{page.title}</h1>
      <p className="mt-4 text-lede text-slate">{page.intro}</p>

      <div className="mt-10">
        {slug === "security" ? (
          <SecurityPosture />
        ) : (
          <div className="flex flex-col gap-8">
            {page.sections?.map((s) => (
              <section key={s.heading}>
                <h2 className="text-h3 text-ink">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-3 text-body text-slate">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        )}
      </div>

      {slug !== "security" && (
        <p className="mt-12 border-t border-rule pt-6 text-caption text-slate">
          This page summarises our current practices in plain language. The binding
          terms for any engagement are those in the agreement we sign with you.
        </p>
      )}
    </Container>
  );
}
