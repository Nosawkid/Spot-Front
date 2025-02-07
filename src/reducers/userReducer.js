import { createSlice } from "@reduxjs/toolkit";
import services from "../services/user";

const initialState = null;
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        username: action.payload.username,
        id: action.payload.id,
        token: action.payload.token,
        role: action.payload.role,
      };
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const loginUserAction = (email, password) => {
  return async (dispatch) => {
    try {
      const userData = await services.loginUser({
        loginId: email,
        password,
      });
      dispatch(setUser(userData));
      return userData;
    } catch (error) {
      console.log(error);
    }
  };
};
export default userSlice.reducer;
