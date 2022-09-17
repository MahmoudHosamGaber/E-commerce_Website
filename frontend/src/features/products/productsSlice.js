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
    async (product, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            const response = await productsService.updateSingleProduct(
                product,
                token
            );
            return response;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            const response = await productsService.deleteSingleProduct(
                id,
                token
            );
            return response;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getArchivedProducts = createAsyncThunk(
    "products/getArchivedProducts",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().admin.admin.token;
            const response = await productsService.getArchivedProducts(token);
            return response.products;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error.message ||
                error.toString();
            return rejectWithValue(message);
        }
    }
);

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (product, { getState, rejectWithValue }) => {
        try {
            const token = getState().admin.admin.token;
            const response = await productsService.addProduct(product, token);
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
        archivedProducts: [],
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
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.allProducts = action.payload;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const updatedProduct = state.archivedProducts.find(
                    (product) => product._id === action.payload._id
                );
                if (
                    updatedProduct &&
                    action.payload.quantityInStock &&
                    updatedProduct.quantityInStock === 0 &&
                    action.payload.quantityInStock > 0
                ) {
                    state.allProducts.push({
                        ...updatedProduct,
                        ...action.payload,
                    });
                    state.archivedProducts = state.archivedProducts.filter(
                        (product) => product._id !== action.payload._id
                    );
                }

                state.allProducts = state.allProducts.map((product) => {
                    if (product._id === action.payload._id) {
                        return { ...product, ...action.payload };
                    }

                    return product;
                });
                state.archivedProducts = state.archivedProducts.map(
                    (product) => {
                        if (product._id === action.payload._id) {
                            return { ...product, ...action.payload };
                        }

                        return product;
                    }
                );

                state.isSuccess = true;
                state.message = "Product Updated Successfully";
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
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.allProducts = state.allProducts.filter(
                    (product) => product._id !== action.payload._id
                );
                state.archivedProducts = state.archivedProducts.concat({
                    ...action.payload,
                    quantityInStock: 0,
                });
                state.isSuccess = true;
                state.message = "Product Deleted Successfully";
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(deleteProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.allProducts = [...state.allProducts, action.payload];
                state.isSuccess = true;
                state.message = "Product Added Successfully";
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(addProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getArchivedProducts.fulfilled, (state, action) => {
                state.archivedProducts = action.payload;
                state.isLoading = false;
            })
            .addCase(getArchivedProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(getArchivedProducts.pending, (state, action) => {
                state.isLoading = true;
            });
    },
});

export const { addProductDetails, reset } = productsSlice.actions;
export default productsSlice.reducer;
