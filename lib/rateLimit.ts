/**
 * Rate limiting via Upstash Redis.
 * Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Vercel (or .env).
 * If not set, rate limiting is skipped (all requests allowed).
 *
 * SECURITY: Use a dedicated Upstash Redis database for this app (Stratum company site).
 * Do not share the same Redis instance with a SaaS or other apps so rate limits and
 * data are isolated. Create a separate database in the Upstash console for this project.
 */
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let ratelimit: Ratelimit | null = null;

function getRatelimit(): Ratelimit | null {
  if (ratelimit) return ratelimit;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
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
 */
export async function checkRateLimit(identifier: string): Promise<{ allowed: boolean; remaining?: number }> {
  const rl = getRatelimit();
  if (!rl) return { allowed: true };
  const { success, remaining } = await rl.limit(identifier);
  return { allowed: success, remaining };
}
