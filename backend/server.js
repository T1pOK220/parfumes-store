import "dotenv/config";
import express from "express";
import cors from "cors";
import { checkConnection } from "./database/database.js";
import parfumeRoutes from "./api/routes/parfumeRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { xRequestIdMiddleware } from "./middleware/xRequestIdMiddleware.js";
import { injectionMiddleware } from "./middleware/injectionMiddleware.js";
import { rateLimitMiddleware } from "./middleware/rateLimitMiddlware.js";
import authRoutes from "./api/routes/authRoutes.js";
import userRoutes from "./api/routes/userRoutes.js";
import favouritesRoutes from "./api/routes/favouriteRoutes.js";
import cartRoutes from "./api/routes/cartRoutes.js";
import orderRoutes from "./api/routes/orderRoutes.js";
const PORT = process.env.PORT || 5000;
export const app = express();
app.use(cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

checkConnection();

app.use(authRoutes);
app.use(userRoutes);
app.use(parfumeRoutes);
app.use(favouritesRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

app.use(xRequestIdMiddleware);
app.use(rateLimitMiddleware);
app.use(injectionMiddleware);


app.get("/health", (req, res) => {
  res.json({ status: "ok"});
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
