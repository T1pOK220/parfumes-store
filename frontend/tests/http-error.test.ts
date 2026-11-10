import { describe, expect, it } from "vitest";
import { HttpError } from "../src/lib/http-error";

describe("HttpError", () => {
  it("зберігає повідомлення, статус і requestId", () => {
    const error = new HttpError("Not found", 404, "req-1");

    expect(error.message).toBe("Not found");
    expect(error.status).toBe(404);
    expect(error.requestId).toBe("req-1");
    expect(error.name).toBe("HttpError");
  });

  it("є екземпляром Error", () => {
    const error = new HttpError("Server error", 500);

    expect(error).toBeInstanceOf(Error);
    expect(error.requestId).toBeUndefined();
  });
});