import "dotenv/config";
import express from "express";
import cors from "cors";
import { parfumes } from "./database/index.js";
import parfumeRoutes from "./api/routes/parfumeRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { xRequestIdMiddleware } from "./middleware/xRequestIdMiddleware.js";
import { injectionMiddleware } from "./middleware/injectionMiddleware.js";
const PORT = process.env.PORT || 5000;
export const app = express();
app.use(cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

parfumes.checkConnection();

app.use(parfumeRoutes);
app.use(xRequestIdMiddleware);
app.use(injectionMiddleware);
app.get("/health", (req, res) => {
  res.json({ status: "ok"});
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
