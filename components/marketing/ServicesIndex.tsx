import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { SERVICE_LIST } from "@/content/services";

/**
 * The six services as a ruled list — not cards (§4.3). Each row: name, one-line
 * description, and the buyer's question it answers, linking to the service page.
 */
export function ServicesIndex({ index = 2 }: { index?: number }) {
  return (
    <Container as="section" className="py-16 md:py-24">
      <Eyebrow index={index} className="mb-8">
        Services
      </Eyebrow>
      <ul className="border-t border-rule">
        {SERVICE_LIST.map((s, i) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group grid grid-cols-1 gap-2 border-b border-rule py-7 transition-colors hover:bg-paper-sunk/40 md:grid-cols-12 md:gap-6 md:px-2"
            >
              <div className="flex items-baseline gap-4 md:col-span-5">
                <span className="font-mono text-mono-xs text-slate">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h3 text-ink group-hover:text-pine">{s.name}</h3>
              </div>
              <p className="text-small text-slate md:col-span-5">{s.blurb}</p>
              <p className="font-mono text-mono-xs uppercase text-slate/80 md:col-span-2 md:text-right">
                <span className="inline-block max-w-[16rem] normal-case md:max-w-none">
                  “{s.question}”
                </span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
