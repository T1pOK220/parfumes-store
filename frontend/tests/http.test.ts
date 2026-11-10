import { afterEach, describe, expect, it, vi } from "vitest";
import { checkHealth, fetchWithResilience } from "../src/lib/http";

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const fastRetry = { baseDelayMs: 1, jitter: false };

describe("fetchWithResilience", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("не повторює запит при успішній відповіді", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await fetchWithResilience("http://localhost:5000/items");

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("додає заголовок X-Request-Id", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}));
    vi.stubGlobal("fetch", fetchMock);

    await fetchWithResilience("http://localhost:5000/items");

    const headers = fetchMock.mock.calls[0][1].headers as Headers;
    expect(headers.get("X-Request-Id")).toBeTruthy();
  });

  it("повторює запит при 500 і повертає успішну відповідь", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({}, 500))
      .mockResolvedValueOnce(jsonResponse({}, 200));
    vi.stubGlobal("fetch", fetchMock);

    const response = await fetchWithResilience("http://localhost:5000/items", {
      retry: fastRetry,
    });

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("повертає 5xx після вичерпання спроб", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}, 503));
    vi.stubGlobal("fetch", fetchMock);

    const response = await fetchWithResilience("http://localhost:5000/items", {
      retry: { ...fastRetry, retries: 1 },
    });

    expect(response.status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

describe("checkHealth", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("повертає true, коли сервіс відповідає status: ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse({ status: "ok" })),
    );

    await expect(checkHealth("http://localhost:5000")).resolves.toBe(true);
  });

  it("повертає false, коли сервіс відповідає помилкою", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse({}, 400)),
    );

    await expect(checkHealth("http://localhost:5000")).resolves.toBe(false);
  });

  it("повертає false, коли status не дорівнює ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse({ status: "down" })),
    );

    await expect(checkHealth("http://localhost:5000")).resolves.toBe(false);
  });
});