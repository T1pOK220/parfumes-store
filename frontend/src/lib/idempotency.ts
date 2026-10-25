async function payloadHash(payload: unknown): Promise<string> {
  const data = new TextEncoder().encode(JSON.stringify(payload));
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function getOrReuseKey(
  payload: unknown,
): Promise<string> {
  const hash = await payloadHash(payload);
  const storageKey = `idem:${hash}`;

  const existingKey = localStorage.getItem(storageKey);

  if (existingKey) {
    return existingKey;
  }

  const newKey = crypto.randomUUID();
  localStorage.setItem(storageKey, newKey);

  return newKey;
}

export async function clearIdempotencyKey(
  payload: unknown,
): Promise<void> {
  const hash = await payloadHash(payload);
  localStorage.removeItem(`idem:${hash}`);
}