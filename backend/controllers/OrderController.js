import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import User from "../models/User.js";

// @desc add order
// @method POST/api/order
// @access private
const addOrder = asyncHandler(async (req, res) => {
  const {
    cartItems,
    itemsPrice,
    paymentMethod,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  if (!cartItems && cartItems.length == 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const user = await User.findOne({ email: req.user?.email });
    const order = new Order({
      orderItem: cartItems.map((x) => ({
        ...x.product,
        qty: x.qty,
        product: x.product?._id,
        _id: undefined,
      })),
      user: user?._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc get order detail
// @method GET/api/order/:id
// @access private
const getOrderDetail = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params?.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc update order to paid
// @method PUT/api/orders/:id/pay
// @access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params?.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_addres,
    };
  }
  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});

export { addOrder, getOrderDetail, updateOrderToPaid };
