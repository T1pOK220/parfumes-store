import express from "express";
import {
  createParfumeController,
  deleteParfumeController,
  getAllParfumesController,
  updateParfumeController,
  getParfumeController,
  getFilterController,
} from "../controllers/parfumeController.js";
import { idempotencyMiddleware } from "../../middleware/idempotencyMiddleware.js";
import { validationMiddleware } from "../../middleware/validationMiddleware.js";
import { AuthorizationMiddleware } from "../../middleware/authorizationMiddleware.js";
import { createParfumeSchema } from "../../validation/createParfumeSchema.js";
const router = express.Router();

router.get("/parfumes",AuthorizationMiddleware,getAllParfumesController);
router.post("/parfumes",AuthorizationMiddleware,idempotencyMiddleware,validationMiddleware(createParfumeSchema),createParfumeController);
router.patch("/parfumes/:id",AuthorizationMiddleware, updateParfumeController);
router.delete("/parfumes/:id",AuthorizationMiddleware, deleteParfumeController);
router.get("/parfumes/:id",AuthorizationMiddleware, getParfumeController);
router.get("/parfumes/filter",AuthorizationMiddleware,getFilterController);

export default router;
