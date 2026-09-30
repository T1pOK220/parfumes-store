import express from "express";
import {
  createParfumeController,
  deleteParfumeController,
  getAllParfumesController,
  updateParfumeController,
} from "../controllers/parfumeController.js";

const router = express.Router();

router.get("/parfumes", getAllParfumesController);

router.post("/parfumes", createParfumeController);

router.patch("/parfumes/:id", updateParfumeController);

router.delete("/parfumes/:id", deleteParfumeController);
export default router;
