import { Router } from "express";
import { getProduct, getProducts } from "../controllers/ProductController.js";

const productRouter = Router();

productRouter.get("/", getProducts).get("/:id", getProduct);
export default productRouter;
