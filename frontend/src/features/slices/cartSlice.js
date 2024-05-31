import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utility/updateCart";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
      shippingAddress: {},
      paymentMethod: "Paypal",
    };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartToCard: (state, action) => {
      const item = action.payload;
      let existItem = state.cartItems.find(
        (cart) => cart.product._id == item.product._id
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((cart) =>
          cart.product._id == existItem.product._id ? item : cart
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      updateCart(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeCart: (state, action) => {
      const item = action.payload;
      state.cartItems = state.cartItems.filter(
        (cart) => cart.product._id != item.product._id
      );
      updateCart(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    saveShippingAddress: (state, { payload }) => {
      state.shippingAddress = payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state, { payload }) => {
      state = payload;
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addCartToCard,
  removeCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
