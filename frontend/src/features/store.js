import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import ordersReducer from "./orders/ordersSlice";
import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import categoriesReducer from "./categories/categoriesSlice";
import brandsReducer from "./brands/brandsSlice";
import adminReducer from "./admin/adminAuthSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsSlice,
        categories: categoriesReducer,
        brands: brandsReducer,
        cart: cartReducer,
        orders: ordersReducer,
        admin: adminReducer,
    },
});
