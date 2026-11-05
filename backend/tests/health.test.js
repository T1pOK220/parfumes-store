import request from 'supertest';
import { app } from '../server.js';
import  pool  from '../database/database.js';
describe('GET /health', () => {
  test('повинен повернути статус 200', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      message: 'Server is running',
    });
  });
});
afterAll(async () => {
  await pool.end();
});