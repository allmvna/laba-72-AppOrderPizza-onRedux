import { configureStore } from "@reduxjs/toolkit";
import {dishReducer} from "../slices/sliceDish/sliceDish.tsx";
import {orderModalReducer} from "../slices/orderModalSlice/orderModalSlice.tsx";

export const store = configureStore({
  reducer: {
    menu: dishReducer,
    orderModal: orderModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
