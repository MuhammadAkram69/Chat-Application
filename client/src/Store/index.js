import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import functionalitySlice from "./Slices/functionalitySlice";

const store = configureStore({
  reducer: {
    userState: userSlice,
    functionalityState: functionalitySlice,
  },
});

export default store;
