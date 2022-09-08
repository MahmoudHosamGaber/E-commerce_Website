import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAuthService from "./adminAuthService";

const initialState = {
    admin: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Admin login
export const adminLogin = createAsyncThunk(
    "admin/adminLogin",
    async (admin, thunkAPI) => {
        try {
            return await adminAuthService.adminLogin(admin);
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

export const adminAuthSlice = createSlice({
    name: "admin",
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
            .addCase(adminLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.admin = action.payload;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.admin = null;
            });
    },
});

export const { reset } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
