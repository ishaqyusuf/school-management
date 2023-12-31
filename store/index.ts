import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import slicers from "./slicers";
export const store = configureStore({
  reducer: {
     slicers
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware();
  },
});
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
