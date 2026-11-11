import { createError } from "../utilities/errorResponse.js";

const requests = new Map();
const WINDOW_MS = 10_000;
const MAX_REQ = 5;

export const rateLimitMiddleware = (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "local";
  const now = Date.now();

  const record = requests.get(ip);

  if (!record || now > record.ts) {
    requests.set(ip, { count: 1, ts: now + WINDOW_MS });
    return next();
  }

  if (record.count >= MAX_REQ) {
    const retryAfter = Math.ceil((record.ts - now) / 1000);
    res.set("Retry-After", String(retryAfter));
    return next(
      createError("RATE_LIMITED", "rate-limit", "Too many requests", 429, "RateLimitError")
    );
  }

  record.count++;
  next();
};