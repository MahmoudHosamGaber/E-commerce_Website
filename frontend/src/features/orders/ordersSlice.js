import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ordersService from "./ordersSevice";
import moment from "moment";

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async (_, { getState, rejectWithValue }) => {
        try {
            const response = await ordersService.getAllOrders(
                getState().auth.user.token
            );
            return response.orders;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error.message ||
                error.toString();
            return rejectWithValue(message);
        }
    }
);


export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await ordersService.createOrder(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

const initialState = {
    orders: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchOrders.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orders = action.payload;

                state.orders.sort((a, b) =>
                    moment(b.updatedAt).diff(a.updatedAt)
                );
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.orders = [];
            })
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state) => {
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

export const { reset } = ordersSlice.actions;
export default ordersSlice.reducer;
