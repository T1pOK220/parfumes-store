import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: true, },
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
})
export const checkConnection = async()=> {
    try {
      await pool.query("SELECT 1");

      console.log("База даних успішно підключена");
    } catch (error) {
      console.error(error);
      console.log("Помилка підключення");
    }
  }
export default pool;