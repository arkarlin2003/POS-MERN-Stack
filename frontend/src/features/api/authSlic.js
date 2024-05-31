import { LOGIN_URL, LOGOUT_URL, REGISTER_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: REGISTER_URL,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: LOGIN_URL,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: LOGOUT_URL,
        method: "POST",
      }),
    }),
  }),
});
export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authSlice;
