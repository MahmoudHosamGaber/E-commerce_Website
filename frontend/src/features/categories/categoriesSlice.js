import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoriesService from "./categoriesService";


const initialState = {
    categories: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''
}

// Get all categories
export const getCategories = createAsyncThunk('categories/getcategories', async (thunkAPI) => {
try {
    return await categoriesService.getCategories()
} catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
}
})

export const categoriesSlice = createSlice({
    name: 'categories',
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
         .addCase(getCategories.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.categories = action.payload
         })
         .addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.categories = []
         })
    },
})

export const {reset} = categoriesSlice.actions
export default categoriesSlice.reducer