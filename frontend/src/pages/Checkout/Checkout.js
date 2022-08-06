import "./Checkout.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../features/cart/cartSlice";
import CheckoutList from "./CheckoutList";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.STRIPE_PRIVATE_KEY);

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");
    const token = useSelector((state) => state.auth.user.token);
    const { cartItems } = useSelector((state) => state.cart);
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        (async () => {
            const response = await axios.post(
                "/create-payment-intent",
                { items: cartItems },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setClientSecret(response.data);
        })();
    }, []);
    console.log(clientSecret.url);
    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret,
        appearance,
    };
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);
    console.log(cartItems);
    return (
        <div className="main-container container">
            <div className="order-summary container col-lg-5 col-md-5 col-sm-12">
                <header>
                    <h3>Order Summary</h3>
                    <hr></hr>
                </header>

                <div className="order-items container">
                    <table>
                        {cartItems.map((item) => {
                            return (
                                <CheckoutList
                                    item={item}
                                    key={item.productId}
                                />
                            );
                        })}
                    </table>
                </div>
                <hr></hr>
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
            <div className="checkout-form col-lg-5 col-md-5 col-sm-12 container">
                <header>
                    <h3>Fill checkout form</h3>
                    <hr></hr>
                </header>
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default Checkout;
