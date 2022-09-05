import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { Navbar, Footer } from "./components";
import { mainTheme } from "./themes.js";
import { ThemeProvider } from "@mui/material/styles";
import {
    UserInfo,
    Orders,
    Login,
    Categories,
    Products,
    ProductDetails,
    SearchPage,
    Home,
    FAQs,
    Cart,
    Security,
} from "./pages";
import Register from "./pages/Log-Reg/Register.js";
import SuccessCard from "./pages/Checkout/success";
import CancelCard from "./pages/Checkout/cancel";
import ContactUs from "./pages/Contactus/ContactUs";
const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <ThemeProvider theme={mainTheme}>
                <Routes>
                    <Route path="/products" element={<Products />} />
                    <Route
                        path="/products/:categoryId"
                        element={<Products />}
                    />
                    <Route
                        path="/productDetails"
                        element={<ProductDetails />}
                    />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/profile" element={<UserInfo />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/faqs" element={<FAQs />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile/security" element={<Security />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/SearchPage" element={<SearchPage />} />
                    <Route path="/success" element={<SuccessCard />} />
                    <Route path="/cancel" element={<CancelCard />} />
                    <Route path="/contactus" element={<ContactUs />} />
                </Routes>
            </ThemeProvider>
            <ToastContainer />
            <Footer />
        </BrowserRouter>
    );
};
export default App;
