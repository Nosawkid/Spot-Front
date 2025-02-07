import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      return {
        token: action.payload.token,
      };
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
