import { controlsForService } from "@/content/controls";
import type { ServiceSlug } from "@/content/services";
import { MaturityMeter } from "./MaturityMeter";

const FRAMEWORK_ABBR: Record<string, string> = {
  "NIST CSF 2.0": "NIST CSF",
  "ISO/IEC 27001:2022": "ISO 27001",
  "CIS Controls v8": "CIS v8",
};

/**
 * "Controls we move" (§6.3): a filtered, static slice of the register for a
 * single service. Same verified data as the homepage hero, presented compactly.
 */
export function ServiceControls({ service }: { service: ServiceSlug }) {
  const rows = controlsForService(service);
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Framework controls this service moves, with current and target maturity.
        </caption>
        <thead>
          <tr className="border-y border-rule">
            <th scope="col" className="whitespace-nowrap py-2 pr-3 font-mono text-mono-xs font-medium uppercase text-slate">
              Framework
            </th>
            <th scope="col" className="whitespace-nowrap py-2 pr-3 font-mono text-mono-xs font-medium uppercase text-slate">
              Ref
            </th>
            <th scope="col" className="py-2 pr-3 font-mono text-mono-xs font-medium uppercase text-slate">
              Control
            </th>
            <th scope="col" className="whitespace-nowrap py-2 font-mono text-mono-xs font-medium uppercase text-slate">
              Maturity
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={`${c.reference}`} className="border-b border-rule/60 align-top">
              <td className="whitespace-nowrap py-2.5 pr-3 font-mono text-mono-xs uppercase text-slate">
                {FRAMEWORK_ABBR[c.framework]}
              </td>
              <td className="whitespace-nowrap py-2.5 pr-3 font-mono text-caption text-ink">
                {c.reference}
              </td>
              <td className="py-2.5 pr-3 text-small text-ink">{c.name}</td>
              <td className="whitespace-nowrap py-2.5">
                <MaturityMeter current={c.current} target={c.target} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
