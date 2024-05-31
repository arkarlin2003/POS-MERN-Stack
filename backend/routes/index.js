import { Router } from "express";
import productRouter from "./products.js";
import authRouter from "./auth.js";
import orderRouter from "./order.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

//authentication
router.use("/api", authRouter);
//products
router.use("/api/products", productRouter);
//orders
router.use("/api", authenticate, orderRouter);
export default router;
