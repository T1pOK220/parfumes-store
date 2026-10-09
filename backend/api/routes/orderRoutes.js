import express from "express";
import { idempotencyMiddleware } from "../../middleware/idempotencyMiddleware.js";
import { AuthorizationMiddleware } from "../../middleware/authorizationMiddleware.js";
import * as orderController from "../controllers/orderController.js";
const router = express.Router();
router.get("order/",AuthorizationMiddleware,orderController.getOrdersController);
router.post("order/",AuthorizationMiddleware,idempotencyMiddleware,orderController.createOrderController);
export default router;