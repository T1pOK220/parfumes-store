import "dotenv/config";
import express from "express";
import cors from "cors";
import { parfumes } from "./database/index.js";
import parfumeRoutes from "./api/routes/parfumeRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

parfumes.checkConnection();

app.use(parfumeRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
