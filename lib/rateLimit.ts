/**
 * Rate limiting via Upstash Redis.
 * Credentials are read in this order (first complete pair wins):
 *   1. KV_REST_API_URL + KV_REST_API_TOKEN  (injected by the Vercel Marketplace Upstash integration)
 *   2. UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN  (legacy manual setup)
 * If neither pair is set, rate limiting is skipped (all requests allowed).
 * If Redis errors or is slow, checkRateLimit fails OPEN (request allowed, warning logged).
 *
 * SECURITY: Use a dedicated Upstash Redis database for this app (Stratum company site).
 * Do not share the same Redis instance with a SaaS or other apps so rate limits and
 * data are isolated. Create a separate database in the Upstash console for this project.
 */
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { logger } from './logger.js';

/** Max time to wait on Redis before failing open. */
const RATE_LIMIT_TIMEOUT_MS = 1500;

let ratelimit: Ratelimit | null = null;

function getRatelimit(): Ratelimit | null {
  if (ratelimit) return ratelimit;
  // Prefer the Vercel Marketplace (KV_*) pair; never mix a URL from one pair with a token from the other.
  const useKv = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  const url = useKv ? process.env.KV_REST_API_URL : process.env.UPSTASH_REDIS_REST_URL;
  const token = useKv ? process.env.KV_REST_API_TOKEN : process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    ratelimit = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(10, '60 s'),
      analytics: false,
    });
  } catch {
    return null;
  }
  return ratelimit;
}

/**
 * Returns true if the request is allowed, false if rate limited.
 * identifier: e.g. IP or `ip:path` (e.g. req.headers['x-forwarded-for'] or req.socket.remoteAddress)
 *
 * Fails OPEN: if Redis is unreachable, errors, or is slower than RATE_LIMIT_TIMEOUT_MS,
 * the request is allowed (with a warning) so a Redis outage never takes the API down.
 */
export async function checkRateLimit(identifier: string): Promise<{ allowed: boolean; remaining?: number }> {
  const rl = getRatelimit();
  if (!rl) return { allowed: true };
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error(`Rate limit check timed out after ${RATE_LIMIT_TIMEOUT_MS}ms`)), RATE_LIMIT_TIMEOUT_MS);
    });
    const { success, remaining } = await Promise.race([rl.limit(identifier), timeout]);
    return { allowed: success, remaining };
  } catch (err) {
    logger.warn('Rate limit check failed; allowing request (fail-open):', err instanceof Error ? err.message : err);
    return { allowed: true };
  } finally {
    if (timer) clearTimeout(timer);
  }
}
