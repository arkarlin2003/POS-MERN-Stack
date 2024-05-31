import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// @desc get all products
// @method GET/api/products
// @access public
const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  if (!products) throw new Error("Products not found!");
  res.json(products);
});

// @desc get product:id
// @method GET/api/products/:id
// @access public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new Error("Product not found!");
  res.json(product);
});

export { getProducts, getProduct };
