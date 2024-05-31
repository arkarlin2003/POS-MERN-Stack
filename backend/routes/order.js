import { Router } from "express";
import {
  addOrder,
  getOrderDetail,
  updateOrderToPaid,
} from "../controllers/OrderController.js";

const orderRouter = Router();

orderRouter
  .post("/order", addOrder)
  .get("/order/:id", getOrderDetail)
  .put("/orders/:id/pay", updateOrderToPaid);
export default orderRouter;
