import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import checkoutService from "./checkoutService";

export const createOrder = createAsyncThunk("checkout/createOrder", async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await checkoutService.createOrder(token);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const { reset } = checkoutSlice.actions;
export default checkoutSlice.reducer;