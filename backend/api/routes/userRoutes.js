import express from "express";
import { idempotencyMiddleware } from "../../middleware/idempotencyMiddleware.js";
import { AuthorizationMiddleware } from "../../middleware/authorizationMiddleware.js";
import * as authController from "../controllers/authController.js"
const router = express.Router();
router.get("/user/me", AuthorizationMiddleware,authController.getUserByIdController);
router.patch("/user/me", AuthorizationMiddleware,authController.updateUserController);
export default router;