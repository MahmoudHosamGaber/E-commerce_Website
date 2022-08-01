import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import ordersReducer from "./orders/ordersSlice";
import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import categoriesReducer from "./categories/categoriesSlice"
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// *** Hint **::--------------- The persistReducer is for saving the redux data in the localStorage
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, productsSlice);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    categories: categoriesReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export const persistor = persistStore(store);
