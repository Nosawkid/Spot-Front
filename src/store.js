import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import tokenReducer from "./reducers/tokenReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
  },
});

export default store;
