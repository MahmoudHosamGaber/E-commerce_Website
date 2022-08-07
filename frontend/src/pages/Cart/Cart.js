import { Button } from "react-bootstrap";
import React, { useEffect } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../features/cart/cartSlice";
import CartItem from "./CartItem";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const token = useSelector((state) => state.auth.user.token);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    const checkout = async () => {
        const response = await axios.post(
            "/create-payment-intent",
            { items: cartItems },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!response.data.url) {
            toast.error("Your cart is empty");
            return;
        }
        window.location.href = response.data.url;
    };

    return (
        <div className="Cart">
            <div className="container">
                <h1 className="title"> My Cart </h1>

                <div className="cart-header container">
                    <h1>Product</h1>
                    <h1 className="quantity-header">Quantity</h1>
                    <h1 className="total-header ">Total </h1>
                </div>

                <div className="Cart__wrapper-Titel mb-4 "></div>
                {cartItems.map((item) => {
                    return <CartItem cartItem={item} key={item.productId} />;
                })}
                
<div className="checkout-info container">
            <div className="total-info col-lg-5 col-md-5 col-sm-12 ">
                <div className=" shipping-days">
                    <h4>Total price</h4>
                    <h5>
                        {cartItems.reduce((acc, item) => {
                            return acc + item.price * item.quantity;
                        }, 0)}
                    </h5>
                </div>
                <div className=" shipping-days">
                    <h4>DeliveryTime</h4>
                    <h5>
                        {Math.max(
                            ...cartItems.map((item) => item.daysTillDelivery)
                        )}
                    </h5>
                </div>
            </div>
            <Button className="btn" onClick={checkout}>
                    checkout
            </Button>
</div>

            </div>
        </div>
    );
};

export default Cart;
