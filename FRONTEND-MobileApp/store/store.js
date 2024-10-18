import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "../slice/locationSlice";
import userAuthSlice from "../slice/userAuthSlice";

export const store = configureStore({
  reducer: {
    location: locationSlice,
    userAuth: userAuthSlice,
  },
});
