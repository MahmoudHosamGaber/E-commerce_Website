import './Cart.css'
import {BsFillTrashFill} from "react-icons/bs";
const CartItem = ({cartItem}) => {
  return (
    <div class="card mb-3" key={cartItem.productId}>
        <div class="card-body">
            <div class="d-flex justify-content-between">
                 <div class="d-flex flex-row align-items-center">
                    <div className="image">
                        <img src={cartItem.mainImage} className="img-fluid rounded-3" alt="product-img" ></img>
                        </div>
                        <div className="ms-3">
                          <h5>{cartItem.name}</h5>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <div className='quantity'>
                          <h5 class="fw-normal mb-0">{cartItem.quantity}</h5>
                        </div>
                        <div className='total-price'>
                          <h5 class="mb-0">{cartItem.totalPrice}</h5>
                        </div>
                        <div className='delete'><BsFillTrashFill /></div>
                      </div>
                    </div>
                  </div>
     </div>
  )
}

export default CartItem
