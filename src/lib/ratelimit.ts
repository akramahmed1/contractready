/**
 * Minimal in-memory rate limiter (token bucket per key).
 *
 * Good enough for abuse friction on low-traffic forms. Note: counters live in
 * this server instance only, so on multi-instance deployments each instance
 * enforces its own budget. Upgrade to a shared store (Redis/Upstash) if the
 * app scales past one instance.
 */
interface Bucket {
  tokens: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

function sweep(now: number) {
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k);
    }
  }
}

/**
 * Returns true when the request is allowed, false when the budget is spent.
 * @param key bucket key, e.g. `free-checklist:1.2.3.4`
 * @param maxRequests tokens per window
 * @param windowMs window length in milliseconds
 */
export function checkRateLimit(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  sweep(now);
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { tokens: maxRequests - 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.tokens <= 0) return false;
  bucket.tokens -= 1;
  return true;
}

/** Best-effort client IP from proxy headers. Never trust it for auth. */
export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
