import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

//Get user's cart
export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await cartService.getCart(token);
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

//Add product to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await cartService.addToCart({ productId, quantity }, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Remove item from cart
export const removeItem = createAsyncThunk(
    "cart/removeItem",
    async ({ productId }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await cartService.removeItem({ productId }, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete user's cart
export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await cartService.deleteCart(token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const initialState = {
    cartItems: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.cartItems = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.message = action.payload;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.cartItems = [];
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartItems = [...action.payload];
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.message = action.payload;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })
            .addCase(removeItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = state.cartItems.filter(
                    (cartItem) => cartItem.productId !== action.payload
                );
            })
            .addCase(removeItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.cartItems = [];
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.message = action.payload;
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            });
    },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
