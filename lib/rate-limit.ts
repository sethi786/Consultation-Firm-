/**
 * Minimal in-memory sliding-window rate limiter (§8).
 *
 * This is best-effort and per-instance: on serverless it limits per warm
 * lambda, not globally. It's enough to blunt casual abuse of the contact form.
 * For production-grade limiting across instances, back this with a durable store
 * (e.g. Upstash Redis) — the interface here is intentionally swappable.
 */

type Stamp = number[];
const store = new Map<string, Stamp>();

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterMs: number;
}

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const cutoff = now - windowMs;
  const hits = (store.get(key) ?? []).filter((t) => t > cutoff);

  if (hits.length >= limit) {
    const retryAfterMs = hits[0] + windowMs - now;
    store.set(key, hits);
    return { ok: false, remaining: 0, retryAfterMs: Math.max(0, retryAfterMs) };
  }

  hits.push(now);
  store.set(key, hits);

  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (store.size > 5000) {
    for (const [k, v] of store) {
      const live = v.filter((t) => t > cutoff);
      if (live.length === 0) store.delete(k);
      else store.set(k, live);
    }
  }

  return { ok: true, remaining: limit - hits.length, retryAfterMs: 0 };
}
