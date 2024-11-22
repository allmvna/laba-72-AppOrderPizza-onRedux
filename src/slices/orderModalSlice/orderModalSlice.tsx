import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDish} from "../sliceDish/sliceDish.tsx";
import {nanoid} from "nanoid";

export interface OrderDish extends IDish {
    orderId: string;
    quantity: number;
}

interface OrderState {
    orders: OrderDish[];
    total: number;
    quantity: number;
    isModalOpen: boolean;
    isLoading: boolean;
    error: boolean;
}

const initialState: OrderState = {
    orders: [],
    total: 0,
    quantity: 0,
    isModalOpen: false,
    isLoading: false,
    error: false,
};

const calculateTotal = (orders: OrderDish[]) =>
    orders.reduce((sum, dish) => sum + dish.price * dish.quantity, 0);

export const orderModalSlice = createSlice({
    name: 'orderModal',
    initialState,
    reducers: {
        addToOrder(state, action: PayloadAction<IDish>) {
            const existingDish = state.orders.find((dish) => dish.id === action.payload.id);
            if (existingDish) {
                existingDish.quantity += 1;
            } else {
                state.orders.push({ ...action.payload, orderId: nanoid(), quantity: 1 });
            }
            state.total = calculateTotal(state.orders);
        },

        removeFromOrder(state, action: PayloadAction<string>) {
            const existingDish = state.orders.find((dish) => dish.orderId === action.payload);
            if (existingDish) {
                if (existingDish.quantity > 1) {
                    existingDish.quantity -= 1;
                } else {
                    state.orders = state.orders.filter((dish) => dish.orderId !== action.payload);
                }
            }
            state.total = calculateTotal(state.orders);
        },
        toggleModal(state, action: PayloadAction<boolean>) {
            state.isModalOpen = action.payload;
        },
    },
});

export const { addToOrder, toggleModal, removeFromOrder } = orderModalSlice.actions;
export const orderModalReducer = orderModalSlice.reducer;
