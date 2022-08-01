import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit';
import cartService  from './cartService';

//Get user's cart
export const getCart = createAsyncThunk("cart/getCart", async (thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await cartService.getCart(token);
       
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message) 
    }
})

const initialState = {
    cartItems: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
      reset: (state) => {
         state.isError = false;
         state.isLoading = false;
         state.isSuccess = false;
         state.message = "";
      },
    },
    extraReducers(builder){
        builder 
          .addCase(getCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cartItems = action.payload;
          })
          .addCase(getCart.rejected, (state, action) => {
            state.message = action.payload;
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.cartItems = [];
          })
    },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;