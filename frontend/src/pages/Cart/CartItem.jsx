import './Cart.css'
import {BsFillTrashFill} from "react-icons/bs";
const CartItem = ({cartItem}) => {
  return (
    <div className='cart-card' key={cartItem.productId}>
                    <div className='card-content'>
                      <div className='product-info'>
                        <img className="img-fluid" src={cartItem.image} alt="product"></img>
                        <h3> {cartItem.name} </h3>
                      </div>
                        <h4> {cartItem.quantity} </h4>
                        <h4 className='total-price'>{cartItem.totalPrice}</h4> 
                        <div className="delete-btn"><BsFillTrashFill /></div>
                    </div>
                  </div>
  )
}

export default CartItem
