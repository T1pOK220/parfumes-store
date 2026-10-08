import express from "express";
import { idempotencyMiddleware } from "../../middleware/idempotencyMiddleware.js";
import { AuthorizationMiddleware } from "../../middleware/authorizationMiddleware.js";
import * as favouriteController from "../controllers/favouriteController.js";
const router = express.Router();
router.get("/favourites", AuthorizationMiddleware, favouriteController.getAllFavouriteController);
router.post("/favourites/:id", AuthorizationMiddleware, idempotencyMiddleware, favouriteController.addToFavouriteController);
router.delete("/favourites/:id", AuthorizationMiddleware, favouriteController.deleteFromFavouriteController);
export default router;