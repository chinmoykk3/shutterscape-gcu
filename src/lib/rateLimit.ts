interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const ipMap = new Map<string, RateLimitEntry>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

export function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = ipMap.get(ip);

  // Clean up expired entries periodically
  if (ipMap.size > 10000) {
    for (const [key, val] of ipMap) {
      if (now > val.resetTime) ipMap.delete(key);
    }
  }

  if (!entry || now > entry.resetTime) {
    ipMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: MAX_ATTEMPTS - entry.count };
}
