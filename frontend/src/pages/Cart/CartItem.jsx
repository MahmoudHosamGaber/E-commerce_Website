import { removeItem } from "../../features/cart/cartSlice";
//import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import "./Cart.css";
import { BsFillTrashFill } from "react-icons/bs";
//import { toast } from "react-toastify";

const CartItem = ({ cartItem }) => {
    //const {isError, isSuccess, message} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    let productId = {
        productId: cartItem.productId,
    };
    const deleteItem = ({ productId }) => {
        dispatch(removeItem({ productId }));
    };

    return (
        <div className="cart-card" key={cartItem.productId}>
            <div className="card-content">
                <div className="product-info">
                    <img
                        className="img-fluid"
                        src={cartItem.image}
                        alt="product"
                    ></img>
                    <h3> {cartItem.name} </h3>
                </div>
                <h4> {cartItem.quantity} </h4>
                <h4 className="total-price">
                    {cartItem.price * cartItem.quantity}
                </h4>
                <button
                    className="delete-btn"
                    onClick={() => deleteItem(productId)}
                >
                    <BsFillTrashFill />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
