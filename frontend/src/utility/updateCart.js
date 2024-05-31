const changeDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  state.itemsPrice = changeDecimal(
    state.cartItems.reduce((pre, cur) => pre + cur.product.price * cur.qty, 0)
  );

  state.shippingPrice = changeDecimal(state.itemsPrice > 100 ? 10 : 0);
  state.taxPrice = changeDecimal(Number(0.15 * state.itemsPrice));
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  return state;
};
