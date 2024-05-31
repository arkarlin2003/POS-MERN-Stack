import { ADD_ORDER_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const orderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: ({ cart, token }) => ({
        url: ADD_ORDER_URL,
        method: "POST",
        body: cart,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getOrderDetail: builder.query({
      query: ({ orderId, credential }) => ({
        url: ADD_ORDER_URL + "/" + orderId,
        method: "GET",
        headers: {
          Authorization: `Bearer ${credential._token}`,
        },
      }),
    }),
  }),
});

export const { useAddOrderMutation, useGetOrderDetailQuery } = orderSlice;
