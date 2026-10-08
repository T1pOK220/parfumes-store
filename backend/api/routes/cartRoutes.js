import express from "express";
import { AuthorizationMiddleware } from "../../middleware/authorizationMiddleware.js";
import { validationMiddleware } from "../../middleware/validationMiddleware.js";
import { addToCartSchema } from "../../validation/addToCartSchema.js"
import { idempotencyMiddleware } from "../../middleware/idempotencyMiddleware.js";
import * as cartController from "../controllers/cartController.js";
const router = express.Router();
router.get("/cart", AuthorizationMiddleware, cartController.getAllFromCartController);
router.delete("/cart", AuthorizationMiddleware, cartController.deleteFromCartController);
router.post("/cart/item", AuthorizationMiddleware,idempotencyMiddleware, validationMiddleware(addToCartSchema), cartController.addToCartController);
router.delete("cart/item/:id", AuthorizationMiddleware, cartController.deleteFromCartController);
router.patch("cart/item/:id", AuthorizationMiddleware, cartController.updateQuantityController);
export default router;