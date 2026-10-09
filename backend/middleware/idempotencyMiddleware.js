import { createError } from "../utilities/errorResponse.js";
import { IdempotencyStore } from "../utilities/idempotencyKeys.js";
export const idempotencyMiddleware = (req, res, next) => {
  if (req.method !== "POST") {
    return next();
  }

  const idempotencyKey = req.get("Idempotency-Key");

  if (!idempotencyKey) {
    throw createError(
      "IDEMPOTENCY_KEY_REQUIRED",
      "idempotencyKey",
      "Idempotency key is required",
    );
  }

  const previous = IdempotencyStore.get(idempotencyKey);

  if (previous) {
    return res.status(previous.statusCode).json(previous.body);
  }

  const originalJson = res.json.bind(res);
  res.json = (body) => {
  IdempotencyStore.set(idempotencyKey, {
    statusCode: res.statusCode,
    body,
  });

  return originalJson(body);
};

  next();
};