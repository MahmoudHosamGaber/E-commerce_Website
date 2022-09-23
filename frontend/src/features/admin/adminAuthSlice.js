import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAuthService from "./adminAuthService";

const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = {
    admin: admin ? admin : null,
    users: [],
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

// Admin get all users
export const getUsers = createAsyncThunk(
    "admin/getUsers",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await adminAuthService.getUsers(token);
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

// Admin changes user status
export const changeUserStatus = createAsyncThunk(
    "admin/changeUserStatus",
    async (userData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await adminAuthService.changeUserStatus(userData, token);
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

// Admin changes user password

export const changeUserPassword = createAsyncThunk(
    "admin/changeUserPassword",
    async (userData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await adminAuthService.changeUserPassword(userData, token);
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
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.users = [];
            })
            .addCase(changeUserStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeUserStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.users = state.users.map((user) => {
                    if (user._id === action.payload._id) {
                        return { ...user, ...action.payload };
                    }
                    return user;
                });
            })
            .addCase(changeUserStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(changeUserPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeUserPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.users = state.users.map((user) => {
                    if (user._id === action.payload._id) {
                        return { ...user, ...action.payload };
                    }
                    return user;
                });
            })
            .addCase(changeUserPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
