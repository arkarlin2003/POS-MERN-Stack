import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const credentialSlice = createSlice({
  name: "credential",
  initialState,
  reducers: {
    setCredential: (state, { payload }) => {
      state = payload;
      localStorage.setItem("userInfo", JSON.stringify(payload));
    },
  },
});

export const { setCredential } = credentialSlice.actions;
export default credentialSlice.reducer;
