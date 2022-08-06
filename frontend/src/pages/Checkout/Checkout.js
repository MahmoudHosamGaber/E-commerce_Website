import "./Checkout.css";
import React, { useState, useEffect } from "react";
import {useSelector, useDispatch}  from "react-redux";
import {getCart} from "../../features/cart/cartSlice";
import CheckoutList from "./CheckoutList";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.STRIPE_PRIVATE_KEY);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
    const {cartItems} = useSelector((state) => state.cart);
    const dispatch = useDispatch()
 
    useEffect(() => {
    dispatch(getCart())
   },[dispatch])
  
   return (
    <div className="main-container container">
     <div className="order-summary container col-lg-5 col-md-5 col-sm-12">
        <header>
        <h3>Order Summary</h3>
        <hr></hr>
        </header>
        
             <div className="order-items container" >
              <table>
              {cartItems.map((item) => {
            return (
                <CheckoutList item={item} key={item.productId}/>
                )
              })}
               </table>
             </div>
             <hr></hr>
             <div className=" shipping-days">
                 <h4>Total price</h4>
                 <h5>{cartItems.reduce((acc, item) => {
                  return acc + item.totalPrice;
                 }, 0)}
                 </h5>
             </div>
             <div className=" shipping-days">
                 <h4>DeliveryTime</h4>
                 <h5>{Math.max(...cartItems.map(item => item.daysTillDelivery))}
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
  )
}

export default Checkout