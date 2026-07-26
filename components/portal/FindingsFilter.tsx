"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SEVERITIES = ["", "critical", "high", "medium", "low", "info"];
const STATUSES = ["", "open", "in_progress", "pending_verification", "remediated", "closed"];
const SORTS = [
  { value: "-createdAt", label: "Newest" },
  { value: "createdAt", label: "Oldest" },
  { value: "dueDate", label: "Due date" },
  { value: "severity", label: "Severity" },
];

export function FindingsFilter() {
  const router = useRouter();
  const params = useSearchParams();

  function set(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`/portal/findings?${next.toString()}`);
  }

  const selectClass =
    "rounded border border-portal-line bg-portal-bg px-2.5 py-1.5 font-mono text-mono-xs uppercase text-portal-ink focus:border-portal-brass focus-visible:outline-none";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="flex items-center gap-2">
        <span className="font-mono text-mono-xs uppercase text-portal-ink-2">Severity</span>
        <select
          className={selectClass}
          defaultValue={params.get("severity") ?? ""}
          onChange={(e) => set("severity", e.target.value)}
        >
          {SEVERITIES.map((s) => (
            <option key={s} value={s}>
              {s || "all"}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2">
        <span className="font-mono text-mono-xs uppercase text-portal-ink-2">Status</span>
        <select
          className={selectClass}
          defaultValue={params.get("status") ?? ""}
          onChange={(e) => set("status", e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s ? s.replace(/_/g, " ") : "all"}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2">
        <span className="font-mono text-mono-xs uppercase text-portal-ink-2">Sort</span>
        <select
          className={selectClass}
          defaultValue={params.get("sort") ?? "-createdAt"}
          onChange={(e) => set("sort", e.target.value)}
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
