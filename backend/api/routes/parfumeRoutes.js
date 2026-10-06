import express from "express";
import {
  createParfumeController,
  deleteParfumeController,
  getAllParfumesController,
  updateParfumeController,
} from "../controllers/parfumeController.js";
import { idempotencyMiddleware } from "../../middleware/idempotencyMiddleware.js";
const router = express.Router();

router.get("/parfumes", getAllParfumesController);

router.post("/parfumes",idempotencyMiddleware ,createParfumeController);

router.patch("/parfumes/:id", updateParfumeController);

router.delete("/parfumes/:id", deleteParfumeController);
export default router;
