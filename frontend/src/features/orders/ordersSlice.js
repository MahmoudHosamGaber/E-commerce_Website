import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ordersService from "./ordersSevice";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { getState, rejectWithValue }) => {
    try {
      //
      const response = await ordersService.getAllOrders(
        // TODO get token from the state
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTFjYjBlODc1NjA4ODFhNjE4MzlhNyIsImlhdCI6MTY1ODY4NjA4NCwiZXhwIjoxNjU4OTQ1Mjg0fQ.JPs8NsdiE4ONERTCQ2aHLTcObM4X0k-CocQhMN_4SVg"
      );
      return response.orders;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

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
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.orders = [];
      });
  },
});

export const { reset } = ordersSlice.actions;
export default ordersSlice.reducer;
