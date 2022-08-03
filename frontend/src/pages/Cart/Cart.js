import { Button } from 'react-bootstrap';
import React ,{ useEffect } from 'react';
import './Cart.css'
import {useSelector, useDispatch} from "react-redux";
import {getCart} from "../../features/cart/cartSlice";
import CartItem from "./CartItem";
const Cart = () => {
  
  const {cartItems} = useSelector((state) => state.cart)
  const dispatch = useDispatch()
   useEffect(() => {
    dispatch(getCart())
   },[dispatch])


    return (
      <div className='Cart'>
     <div className='container'>
      
        <h1 className='title'> My Cart </h1>
        
        <div className='cart-header container'>
                <h1 >Product</h1>
                <h1 className='quantity-header'>Quantity</h1>
                <h1 className='total-header ' >Total </h1>
                
            </div>

            <div className="Cart__wrapper-Titel mb-4 ">
            </div>
               { cartItems.map((item) => {
                return (
                  <CartItem cartItem={item} />
                )
                })
               }
              
              <Button className='btn1 mt-5'  href='/'>Continue shopping</Button>
              <Button className='btn2 mt-5'  href='/'>Check out</Button>
       </div>
     </div>
       
    )

 }

export default Cart