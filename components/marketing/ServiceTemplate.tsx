import Link from "next/link";
import { Container, Eyebrow, Chip } from "@/components/ui";
import { ServiceControls } from "./ServiceControls";
import { ContactCTA } from "./ContactCTA";
import { SERVICE_LIST } from "@/content/services";
import type { ServiceDetail } from "@/content/services/types";

function SectionHead({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className="mb-6 font-mono text-mono-xs uppercase text-slate">
      <span className="text-brass-lift">{index}</span>
      <span className="text-rule">{"  —  "}</span>
      {children}
    </h2>
  );
}

export function ServiceTemplate({ service }: { service: ServiceDetail }) {
  const serviceNumber =
    SERVICE_LIST.findIndex((s) => s.slug === service.slug) + 1;
  const idx = String(serviceNumber).padStart(2, "0");

  return (
    <>
      {/* Header — lede answers the buyer's question in the first paragraph */}
      <Container className="pt-14 pb-12 md:pt-20 md:pb-16">
        <Eyebrow className="mb-5">Services / {idx}</Eyebrow>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="text-display text-ink">{service.name}</h1>
            <p className="mt-4 font-mono text-mono-xs uppercase text-slate">
              “{service.question}”
            </p>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <p className="max-w-measure text-lede text-slate">{service.situation}</p>
          </div>
        </div>
      </Container>

      {/* What we do */}
      <Container as="section" className="border-t border-rule py-14 md:py-20">
        <SectionHead index={`§ ${idx}.1`}>What we do</SectionHead>
        <ul className="border-t border-rule">
          {service.workstreams.map((w) => (
            <li
              key={w.title}
              className="grid grid-cols-1 gap-2 border-b border-rule py-6 md:grid-cols-12 md:gap-6"
            >
              <h3 className="text-h3 text-ink md:col-span-4">{w.title}</h3>
              <p className="text-small text-slate md:col-span-5">{w.detail}</p>
              <p className="font-mono text-mono-xs uppercase text-brass-lift md:col-span-3 md:text-right">
                {w.deliverable}
              </p>
            </li>
          ))}
        </ul>
      </Container>

      {/* Controls we move */}
      <section className="border-t border-rule bg-paper-sunk/30">
        <Container className="py-14 md:py-20">
          <SectionHead index={`§ ${idx}.2`}>Controls we move</SectionHead>
          <p className="mb-8 max-w-measure text-small text-slate">
            The framework controls this service advances, drawn from the same
            verified register as the homepage. Every reference is checked against the
            published framework.
          </p>
          <ServiceControls service={service.slug} />
        </Container>
      </section>

      {/* Engagement tiers */}
      <Container as="section" className="border-t border-rule py-14 md:py-20">
        <SectionHead index={`§ ${idx}.3`}>Engagement tiers</SectionHead>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-rule bg-rule md:grid-cols-3">
          {service.tiers.map((tier) => (
            <div key={tier.name} className="flex flex-col gap-4 bg-paper p-6">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-h3 text-ink">{tier.name}</h3>
                  <span className="font-mono text-mono-xs uppercase text-slate">
                    {tier.duration}
                  </span>
                </div>
                <p className="mt-2 text-small text-slate">{tier.summary}</p>
              </div>
              <div className="font-mono text-mono-xs uppercase text-brass-lift">
                {tier.price}
              </div>
              <div>
                <p className="mb-2 font-mono text-mono-xs uppercase text-slate">Includes</p>
                <ul className="flex flex-col gap-1.5">
                  {tier.includes.map((it) => (
                    <li key={it} className="flex gap-2 text-small text-ink">
                      <span aria-hidden="true" className="text-pine">
                        —
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 font-mono text-mono-xs uppercase text-slate">Not included</p>
                <ul className="flex flex-col gap-1.5">
                  {tier.excludes.map((it) => (
                    <li key={it} className="flex gap-2 text-small text-slate">
                      <span aria-hidden="true" className="text-rule">
                        ×
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Deliverables */}
      <Container as="section" className="border-t border-rule py-14 md:py-20">
        <SectionHead index={`§ ${idx}.4`}>What you receive</SectionHead>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          {service.deliverables.map((d) => (
            <li key={d} className="flex items-baseline gap-3 border-b border-rule py-3">
              <span aria-hidden="true" className="font-mono text-mono-xs text-brass-lift">
                ▪
              </span>
              <span className="text-body text-ink">{d}</span>
            </li>
          ))}
        </ul>
      </Container>

      {/* Evidence — case study slot + certifications (placeholders, §5) */}
      <section className="border-t border-rule bg-paper-sunk/30">
        <Container className="py-14 md:py-20">
          <SectionHead index={`§ ${idx}.5`}>Evidence</SectionHead>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="rounded border border-rule bg-paper p-6 lg:col-span-7">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-mono-xs uppercase text-slate">Case study</span>
                <Chip>Awaiting sign-off</Chip>
              </div>
              <p className="text-body text-slate">
                {"{{TODO: one anonymised case study for this service, with the "}
                client&apos;s written approval on every number (e.g. “a 900-seat
                Ontario credit union”). No fabricated metrics.{"}}"}
              </p>
            </div>
            <div className="lg:col-span-5">
              <p className="mb-3 font-mono text-mono-xs uppercase text-slate">
                Relevant certifications
              </p>
              <p className="text-small text-slate">
                {"{{TODO: certifications and partner tiers held — e.g. Microsoft "}
                Solutions Partner, AWS, CrowdStrike — pending confirmation.{"}}"}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <Container as="section" className="border-t border-rule py-14 md:py-20">
        <SectionHead index={`§ ${idx}.6`}>Questions procurement asks</SectionHead>
        <dl className="border-t border-rule">
          {service.faqs.map((f) => (
            <div
              key={f.q}
              className="grid grid-cols-1 gap-2 border-b border-rule py-6 md:grid-cols-12 md:gap-6"
            >
              <dt className="text-h3 text-ink md:col-span-5">{f.q}</dt>
              <dd className="text-body text-slate md:col-span-7">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* Other services */}
      <Container as="section" className="border-t border-rule py-10">
        <p className="mb-4 font-mono text-mono-xs uppercase text-slate">Other services</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {SERVICE_LIST.filter((s) => s.slug !== service.slug).map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="text-small text-pine hover:text-pine-lift"
            >
              {s.name} →
            </Link>
          ))}
        </div>
      </Container>

      <ContactCTA
        prompt={`Book your ${service.name} assessment.`}
        service={service.slug}
      />
    </>
  );
}
