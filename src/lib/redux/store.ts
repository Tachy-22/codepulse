import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import jsTsSlice from "./jsTsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { 
      userSlice, 
      jsTs: jsTsSlice 
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
