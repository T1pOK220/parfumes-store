import express from "express";
import { idempotencyMiddleware } from "../../middleware/idempotencyMiddleware.js";
import * as authController from "../controllers/authController.js"
import { validationMiddleware } from "../../middleware/validationMiddleware.js";
import { registerSchema } from "../../validation/registerSchema.js";
import { loginSchema } from "../../validation/loginSchemas.js";
const router = express.Router();
router.post("/auth/register", idempotencyMiddleware,validationMiddleware(registerSchema), authController.registerController);
router.get("/auth/login", validationMiddleware(loginSchema),authController.loginController);
export default router;