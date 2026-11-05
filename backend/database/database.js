import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL не задано");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

export const checkConnection = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("База даних успішно підключена");
    return true;
  } catch (error) {
    console.error("Помилка підключення до БД:", error.message);
    return false;
  }
};

export default pool;
