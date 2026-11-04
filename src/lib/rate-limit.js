const buckets = globalThis.__vvfRateBuckets || new Map();
globalThis.__vvfRateBuckets = buckets;

export function clientKey(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "local";
}

export function allow(key, limit, windowMs) {
  const now = Date.now();

  if (buckets.size > 2000) {
    for (const [entryKey, entry] of buckets) {
      if (entry.reset <= now) buckets.delete(entryKey);
    }
  }

  const entry = buckets.get(key);

  if (!entry || entry.reset <= now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count += 1;
  return true;
}
