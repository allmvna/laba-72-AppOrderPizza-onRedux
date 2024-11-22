import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDish } from "../sliceDish/sliceDish.tsx";
import {nanoid} from "nanoid";

export interface OrderDish extends IDish {
    orderId: string;
}

interface OrderState {
    orders: OrderDish[];
    total: number;
    isModalOpen: boolean;
}

const initialState: OrderState = {
    orders: [],
    total: 0,
    isModalOpen: false,
};

const calculateTotal = (orders: IDish[]) =>
    orders.reduce((sum, dish) => sum + dish.price, 0);

export const orderModalSlice = createSlice({
    name: 'orderModal',
    initialState,
    reducers: {
        addToOrder(state, action: PayloadAction<IDish>) {
            state.orders.push({ ...action.payload, orderId: nanoid() });
            state.total = calculateTotal(state.orders);
        },
        toggleModal(state, action: PayloadAction<boolean>) {
            state.isModalOpen = action.payload;
        },
        removeFromOrder(state, action: PayloadAction<string>) {
            const idToRemove = action.payload;
            state.orders = state.orders.filter(dish => dish.orderId !== idToRemove);
            state.total = calculateTotal(state.orders);
        },
    },
});

export const { addToOrder, toggleModal, removeFromOrder } = orderModalSlice.actions;
export const orderModalReducer = orderModalSlice.reducer;
