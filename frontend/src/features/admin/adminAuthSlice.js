import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAuthService from "./adminAuthService";

const admin = JSON.parse(localStorage.getItem("admin"));
const initialState = {
    admin: admin ? admin : null,
    users: [],
    orders: [],
    coupons: [],
    customerQueries: [],
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

// Admin get all orders

export const getOrders = createAsyncThunk(
    "admin/getOrders",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await adminAuthService.getOrders(token);
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

// Admin changes order status
export const changeOrderStatus = createAsyncThunk(
    "admin/changeOrderStatus",
    async (orderData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await adminAuthService.changeOrderStatus(orderData, token);
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

// Admin get all coupons

export const getCoupons = createAsyncThunk(
    "admin/getCoupons",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await adminAuthService.getCoupons(token);
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

// Admin delete a coupon

export const deleteCoupon = createAsyncThunk(
    "admin/deleteCoupon",
    async (code, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await adminAuthService.deleteCoupon(code, token);
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

// Admin delete a coupon

export const createCoupon = createAsyncThunk(
    "admin/createCoupon",
    async (couponData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await adminAuthService.createCoupon(couponData, token);
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

// Admin get all customers queries

export const getCustomerQueries = createAsyncThunk(
    "admin/getCustomerQueries",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await adminAuthService.getCustomerQueries(token);
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

// Admin delete a customer query

export const deleteCustomerQuery = createAsyncThunk(
    "admin/deleteCustomerQuery",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().admin.admin.token;
            return await adminAuthService.deleteCustomerQuery(id, token);
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
                state.message = "Users retrieval is successfull";
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
                state.message = "Status have been updated";
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
                state.message = "Password have been updated";
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
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = "Orders retrieval is successfull";
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(changeOrderStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeOrderStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.orders = state.orders.map((order) => {
                    if (order._id === action.payload.updatedOrder._id) {
                        return { ...order, ...action.payload.updatedOrder };
                    }
                    return order;
                });
            })
            .addCase(changeOrderStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "Coupons retrieval is successfull";
                state.coupons = action.payload;
            })
            .addCase(getCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "Coupon is successfully deleted";
                state.coupons = state.coupons.filter(
                    (coupon) => coupon._id !== action.payload.id
                );
            })
            .addCase(deleteCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "Coupon is successfully added";
                state.coupons = [...state.coupons, action.payload];
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCustomerQueries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCustomerQueries.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "Customer queries retrieval is successfull";
                state.customerQueries = action.payload;
            })
            .addCase(getCustomerQueries.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteCustomerQuery.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCustomerQuery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "Customer query is successfully deleted";
                state.customerQueries = state.customerQueries.filter(
                    (query) => query._id !== action.payload.id
                );
            })
            .addCase(deleteCustomerQuery.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
