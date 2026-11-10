import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearIdempotencyKey, getOrReuseKey } from "../src/lib/idempotency";

function createStorage(): Storage {
  const data = new Map<string, string>();

  return {
    get length() {
      return data.size;
    },
    clear: () => data.clear(),
    getItem: (key) => data.get(key) ?? null,
    key: (index) => Array.from(data.keys())[index] ?? null,
    removeItem: (key) => {
      data.delete(key);
    },
    setItem: (key, value) => {
      data.set(key, value);
    },
  };
}

describe("idempotency", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", createStorage());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("повертає той самий ключ для однакового payload", async () => {
    const payload = { productId: 1, quantity: 2 };

    const first = await getOrReuseKey(payload);
    const second = await getOrReuseKey(payload);

    expect(second).toBe(first);
  });

  it("повертає різні ключі для різних payload", async () => {
    const first = await getOrReuseKey({ productId: 1 });
    const second = await getOrReuseKey({ productId: 2 });

    expect(second).not.toBe(first);
  });

  it("після clearIdempotencyKey створює новий ключ", async () => {
    const payload = { productId: 1 };

    const first = await getOrReuseKey(payload);
    await clearIdempotencyKey(payload);
    const second = await getOrReuseKey(payload);

    expect(second).not.toBe(first);
  });
});