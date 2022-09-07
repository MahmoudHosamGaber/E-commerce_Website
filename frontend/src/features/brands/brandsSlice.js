import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandsService from "./brandsService";

const initialState = {
    brands: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

//Get all the brands

export const getBrands = createAsyncThunk(
    "brands/getBrands",
    async (thunkAPI) => {
        try {
            return await brandsService.getBrands();
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


export const brandsSlice = createSlice({
    name: "brands",
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        } 
    },
    extraReducers: (builder) => {
        builder
         .addCase(getBrands.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getBrands.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.brands = action.payload
         })
         .addCase(getBrands.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.brands = []
         })
    },
})

export const { reset } = brandsSlice.actions;
export default brandsSlice.reducer;