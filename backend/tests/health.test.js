import request from "supertest";
import {app} from "../server.js";
import { pool } from "../database/database.js";
describe("GET /health", () => {
  it("responds with 200 and status ok", async () => {
    const res = await request(app).get("/health");
 
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
 afterAll(async () => {
    await pool.end();
});