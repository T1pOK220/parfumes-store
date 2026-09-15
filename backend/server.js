import "dotenv/config";
import express from "express";
import cors from "cors";
import { parfumes } from "./database/index.js";
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
  }));
app.use(express.json());
parfumes.checkConnection();
app.get("/items", async (req, res) => {
  try {
    const result = await parfumes.getItems();
    if (result.length < 1) {
      throw new Error("Не вдалося отримати дані з бази");
    }
    res.json({
      items: result,
      message: "Успішно отримано",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Помилка при отриманні даних",
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});