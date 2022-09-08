import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "./productsService";
export const fetchAllProducts = createAsyncThunk(
    "allProducts/fetchAllProducts",
    async () => {
        const res = await fetch("http://localhost:3001/api/products")
            .then((res) => res.json())
            .then((data) => data);
        return res.products;
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async (product, { getState, rejectWithValue }) => {
        try {
            const response = await productsService.updateSingleProduct(product);
            return response;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error.message ||
                error.toString();
            return rejectWithValue(message);
        }
    }
);

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        allProducts: [],
        selectedProduct: [],
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
    },
    reducers: {
        addProductDetails: (state, action) => {
            state.selectedProduct = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.allProducts = action.payload;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.allProducts = state.allProducts.map((product) => {
                    if (product._id === action.payload._id) {
                        return { ...product, ...action.payload };
                    }
                    return product;
                });
                state.isSuccess = true;
                state.message = "";
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateProduct.pending, (state, action) => {
                state.isLoading = true;
            });
    },
});

export const { addProductDetails } = productsSlice.actions;
export default productsSlice.reducer;
