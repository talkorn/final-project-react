import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import darkModeReducer from "./darkMode";
import categoryReducer from "./category";

const store = configureStore({
  reducer: {
    authSlice: authReducer,
    darkModeSlice: darkModeReducer,
    categorySlice: categoryReducer,
  },
});
export default store;
