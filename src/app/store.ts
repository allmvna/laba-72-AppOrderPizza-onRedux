import { configureStore } from "@reduxjs/toolkit";
import {dishReducer} from "../slices/sliceDish/sliceDish.tsx";

export const store = configureStore({
  reducer: {
    menu: dishReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
