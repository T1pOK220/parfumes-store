const requests = new Map();

export const rateLimit = (req, res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "local";
    const now = Date.now();

    const record = requests.get(ip) || { count: 0, ts: now };

  if (!record || now > record.ts) {
    requests.set(ip, {
      count: 1,
      ts: now + 10000
    });

    return next();
  }

  if (record.count >= 5) {
    const retryAfter = Math.ceil(
      (record.ts - now) / 1000
    );

   res.set("Retry-After", String(retryAfter));

   throw createError(
    "RATE_LIMITED",
    "rate-limit",
    "Too many requests",
    429,
    "RateLimitError");
  }

  record.count++;
  next();
};