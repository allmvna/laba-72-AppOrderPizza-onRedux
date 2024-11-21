import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export interface IDish {
    id: string;
    title: string;
    price: number;
    image: string;
}

interface DishState {
    dishes: IDish[];
    isLoading: boolean;
    error: boolean;
}


const initialState : DishState = {
    dishes: [],
    isLoading: false,
    error: false,
};

interface DishesResponse {
    [id: string]: IDish;
}

export const addDish = createAsyncThunk('dish/addDish', async (dish: IDish) => {
    const { data } = await axiosAPI.post('/dishes.json', dish);
    return { ...dish, id: data.name };
});

export const fetchDishes = createAsyncThunk('dish/fetchDishes', async () => {
    const { data } = await axiosAPI.get<DishesResponse>('/dishes.json');
    return Object.keys(data).map((id) => ({
        ...data[id],
        id,
    }));
});

export const deleteDish = createAsyncThunk('dish/deleteDish', async (id: string) => {
    await axiosAPI.delete(`/dishes/${id}.json`);
    return id;
});


export const sliceDish = createSlice({
    name: 'dish',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addDish.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(addDish.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dishes.push(action.payload);
            })
            .addCase(addDish.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(fetchDishes.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchDishes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dishes = action.payload;
            })
            .addCase(fetchDishes.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(deleteDish.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(deleteDish.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dishes = state.dishes.filter(dish => dish.id !== action.payload);
            })
            .addCase(deleteDish.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },

});

export const dishReducer = sliceDish.reducer;