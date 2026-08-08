import { WaypointMark } from "@/components/ui";

/**
 * Hero product visual — the floating "product UI" moment every modern
 * software-firm hero has (wiz/docker register). Two stacked cards showing the
 * real deliverable: a findings register and a maturity read. Data is from the
 * published sample assessment and labelled as such — our own product surface,
 * never a fabricated client claim. Pure CSS/SVG, no images; gentle
 * transform-only float, stilled by the reduced-motion killswitch.
 */

const ROWS: { id: string; title: string; sev: string; chip: string; status: string; statusTone: string }[] = [
  {
    id: "WPT-001",
    title: "Standing Global Administrator accounts",
    sev: "Critical",
    chip: "bg-sev-crit-tint text-sev-crit",
    status: "Open",
    statusTone: "text-sev-crit",
  },
  {
    id: "WPT-003",
    title: "Storage account exposed to public networks",
    sev: "High",
    chip: "bg-sev-high-tint text-sev-high",
    status: "In progress",
    statusTone: "text-sev-high",
  },
  {
    id: "WPT-008",
    title: "EDR missing on 6% of servers",
    sev: "Medium",
    chip: "bg-sev-med-tint text-sev-med",
    status: "Remediated",
    statusTone: "text-status-remediated",
  },
];

function MiniMeter({ current, target }: { current: number; target: number }) {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-3 w-[6px] rounded-[2px] ${
            n <= current ? "bg-pine" : n === target ? "border border-brass bg-transparent" : "bg-rule"
          }`}
        />
      ))}
    </span>
  );
}

export function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[540px] select-none">
      {/* Spectrum glow behind the stack */}
      <div
        className="absolute -inset-8 rounded-[40px] opacity-70 blur-2xl"
        style={{
          background:
            "linear-gradient(120deg, color-mix(in oklab, var(--color-teal) 22%, transparent), color-mix(in oklab, var(--color-sky) 18%, transparent), color-mix(in oklab, var(--color-violet) 20%, transparent))",
        }}
      />

      {/* Back card — maturity summary */}
      <div className="blob-b absolute -right-3 -top-8 w-64 rotate-2 rounded-2xl border border-rule bg-surface p-4 shadow-pop-sm">
        <p className="font-mono text-mono-xs uppercase tracking-mono text-slate">Maturity — identity</p>
        <div className="mt-2 flex items-center justify-between">
          <MiniMeter current={2} target={4} />
          <span className="font-mono text-mono-xs uppercase text-slate">
            2.0 <span className="text-brass-lift">→</span> 4.0
          </span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-rule">
          <div className="spectrum-bar h-full w-3/5 rounded-full" />
        </div>
      </div>

      {/* Front card — findings register */}
      <div className="blob-a relative rounded-2xl border border-rule bg-surface shadow-pop">
        <div className="flex items-center justify-between border-b border-rule px-5 py-3.5">
          <span className="inline-flex items-center gap-2">
            <WaypointMark className="h-4 w-4 text-pine" title="" />
            <span className="font-mono text-mono-xs uppercase tracking-mono text-ink">
              Findings register
            </span>
          </span>
          <span className="rounded-full bg-paper-sunk px-2.5 py-0.5 font-mono text-mono-xs uppercase text-slate">
            Sample report
          </span>
        </div>
        <ul className="divide-y divide-rule/70 px-5">
          {ROWS.map((r) => (
            <li key={r.id} className="flex items-center gap-3 py-3.5">
              <span className="font-mono text-mono-xs text-slate/80">{r.id}</span>
              <span className="min-w-0 flex-1 truncate text-caption text-ink">{r.title}</span>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-mono-xs uppercase ${r.chip}`}
              >
                {r.sev}
              </span>
              <span className={`hidden font-mono text-mono-xs uppercase sm:inline ${r.statusTone}`}>
                {r.status}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-rule px-5 py-3">
          <span className="font-mono text-mono-xs uppercase tracking-mono text-slate">
            NIST CSF 2.0 · ISO 27001 · CIS v8
          </span>
          <span className="font-mono text-mono-xs uppercase text-status-remediated">
            Verified fixes: 9
          </span>
        </div>
      </div>

      {/* Floating framework chip */}
      <div className="blob-b absolute -bottom-6 -left-3 rounded-xl border border-rule bg-surface px-3.5 py-2.5 shadow-pop-sm">
        <span className="flex items-center gap-2">
          <span className="spectrum-bar h-1.5 w-5 rounded-full" />
          <span className="font-mono text-mono-xs uppercase tracking-mono text-ink">
            Evidence, not theatre
          </span>
        </span>
      </div>
    </div>
  );
}
