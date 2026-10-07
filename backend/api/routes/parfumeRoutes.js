import express from "express";
import {
  createParfumeController,
  deleteParfumeController,
  getAllParfumesController,
  updateParfumeController,
  getParfumeController,
} from "../controllers/parfumeController.js";
import { idempotencyMiddleware } from "../../middleware/idempotencyMiddleware.js";
import { validationMiddleware } from "../../middleware/validationMiddleware.js";
import { createParfumeSchema } from "../../validation/createParfumeSchema.js";
const router = express.Router();

router.get("/parfumes", getAllParfumesController);
router.post("/parfumes",idempotencyMiddleware,validationMiddleware(createParfumeSchema),createParfumeController);
router.patch("/parfumes/:id", updateParfumeController);
router.delete("/parfumes/:id", deleteParfumeController);
router.get("/parfumes/:id", getParfumeController);

export default router;
