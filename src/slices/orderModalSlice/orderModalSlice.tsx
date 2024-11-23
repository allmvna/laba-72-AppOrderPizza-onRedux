import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDish} from "../sliceDish/sliceDish.tsx";
import {nanoid} from "nanoid";
import axiosAPI from "../../axiosAPI.ts";
import {RootState} from "../../app/store.ts";


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

interface OrderData {
    [key: string]: number;
}


export const addOrders = createAsyncThunk(
    'order/addOrder',
    async (orders: OrderDish[]) => {
        const { data: currentOrders } = await axiosAPI.get('/orders.json');
        const ordersData = currentOrders ?? {};

        for (const order of orders) {
            const { id, quantity } = order;
            if (ordersData[id]) {
                ordersData[id] += quantity;
            } else {
                ordersData[id] = quantity;
            }
            await axiosAPI.put('/orders.json', ordersData);
        }
        return ordersData;
    }
);

export const fetchOrders = createAsyncThunk<OrderDish[], void, { state: RootState }>(
    'order/fetchOrders',
    async (_, { getState }) => {
        const { data } = await axiosAPI.get<OrderData>('/orders.json');
        const dishes = (getState() as RootState).menu.dishes;

        const ordersArray: OrderDish[] = [];

        for (const key in data) {
            const dish = dishes.find(d => d.id === key);
            if (dish) {
                ordersArray.push({
                    orderId: key,
                    title: dish.title,
                    price: dish.price,
                    quantity: data[key],
                    id: dish.id,
                    image: dish.image,
                });
            }
        }

        return ordersArray;
    }
);

export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async (orderId: string) => {
        const { data: currentOrders } = await axiosAPI.get('/orders.json');
        const ordersData = currentOrders ?? {};

        delete ordersData[orderId];
        await axiosAPI.put('/orders.json', ordersData);
        return orderId;
    }
);


export const DELIVERY_COST = 150;

const calculateTotal = (orders: OrderDish[]) => {
    const orderTotal = orders.reduce((sum, dish) => sum + dish.price * dish.quantity, 0);
    return orderTotal + (orders.length > 0 ? DELIVERY_COST : 0);
};


export const orderModalSlice = createSlice({
    name: 'orderModal',
    initialState,
    reducers: {
        addToOrder(state, action: PayloadAction<IDish>) {
            const existingDish = state.orders.find((dish) => dish.id === action.payload.id);
            if (existingDish) {
                existingDish.quantity += 1;
            } else {
                state.orders.push({
                    ...action.payload,
                    orderId: nanoid(),
                    quantity: 1,
                });
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

        clearOrders(state) {
            state.orders = [];
            state.total = 0;
            state.quantity = 0;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(addOrders.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(addOrders.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addOrders.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<OrderDish[]>) => {
                state.orders = action.payload;
                state.total = calculateTotal(state.orders);
                state.isLoading = false;
            })
            .addCase(fetchOrders.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(order => order.orderId !== action.payload);
                state.total = calculateTotal(state.orders);
                state.isLoading = false;
            })
            .addCase(deleteOrder.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    }
});

export const { addToOrder, toggleModal, removeFromOrder, clearOrders } = orderModalSlice.actions;
export const orderModalReducer = orderModalSlice.reducer;
