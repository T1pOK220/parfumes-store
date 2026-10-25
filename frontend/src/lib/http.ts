import { getOrReuseKey } from "./idempotency";

type RetryOptions = {
  retries?: number;
  baseDelayMs?: number;
  jitter?: boolean;
};

type HttpOptions = RequestInit & {
  timeoutMs?: number;
  retry?: RetryOptions;
  idempotencyKey?: string;
};

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const backoff = (
  baseDelayMs: number,
  attempt: number,
  jitter: boolean,
) => {
  const delay = baseDelayMs * 2 ** attempt;
  return delay + (jitter ? Math.floor(Math.random() * 100) : 0);
};


const getRetryAfterMs = (response: Response): number => {
  const value = response.headers.get("Retry-After");

  if (!value) {
    return 1000;
  }

  const seconds = Number(value);

  if (Number.isFinite(seconds) && seconds >= 0) {
    return seconds * 1000;
  }

  const date = Date.parse(value);

  if (!Number.isNaN(date)) {
    return Math.max(0, date - Date.now());
  }

  return 1000;
};

export async function fetchWithResilience(
  url: string,
  options: HttpOptions = {},
): Promise<Response> {
  const {
  timeoutMs = 3000,
  retry = {},
  idempotencyKey: providedIdempotencyKey,
  ...init
} = options;
  const {
    retries = 2,
    baseDelayMs = 250,
    jitter = true,
    } = retry;
    
    const method = (init.method ?? "GET").toUpperCase();

    const idempotencyKey =
        providedIdempotencyKey ??
        (method === "POST" && init.body
            ? await getOrReuseKey(JSON.parse(String(init.body)))
            : undefined);

    const headers = new Headers(init.headers);

    headers.set("X-Request-Id", crypto.randomUUID());
    
    if (idempotencyKey) {
        headers.set("Idempotency-Key", idempotencyKey);
    }

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  for (let attempt = 0; ; attempt++) {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    let response: Response;

    try {
      response = await fetch(url, {
        ...init,
        headers,
        signal: controller.signal,
      });
    } catch (error) {
      clearTimeout(timeout);

      if (error instanceof Error && error.name === "AbortError") {
        throw error;
      }

      // Повторюємо мережеву помилку, поки є спроби.
      if (attempt >= retries) {
        throw error;
      }

      await sleep(backoff(baseDelayMs, attempt, jitter));
      continue;
    }

      clearTimeout(timeout);
      
      // Повторюємо запит після 429 з урахуванням Retry-After.
      if (response.status === 429) {
          if (attempt >= retries) {
              return response;
          }

          const delay = getRetryAfterMs(response);
          await sleep(delay);
          continue;
      }

    // Повторюємо запит лише при помилках 5xx.
    if (response.status >= 500 && response.status <= 599) {
      if (attempt >= retries) {
        return response;
      }

      await sleep(backoff(baseDelayMs, attempt, jitter));
      continue;
    }

    return response;
  }
}

export async function checkHealth(
  baseUrl: string,
): Promise<boolean> {
  const response = await fetchWithResilience(
    `${baseUrl}/health`,
    {
      method: "GET",
      timeoutMs: 1000,
      retry: {
        retries: 0,
      },
    },
  );

  if (!response.ok) {
    return false;
  }

  const data: { status: string } = await response.json();

  return data.status === "ok";
}