import { PRODUCT_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      providesTags: ["Product"],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: PRODUCT_URL + id,
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productSlice;
