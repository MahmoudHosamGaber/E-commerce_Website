import ProductsList from "./ProductsList";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useState } from "react";

const OrdersList = ({ orders }) => {
  const handleClick = () => {
    setClicked((clicked) => !clicked);
  };
  const [clicked, setClicked] = useState(false);
  return orders.map((order) => {
    return (
      <div className="order_wrapper-content_items_product mb-5" key={order.id}>
        <button
          className="btn info_button w-100 d-flex align-items-center justify-content-between"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#orderOne"
          aria-expanded="true"
          aria-controls="collapseExample"
          onClick={() => handleClick()}
          key={order.id}
        >
          <p className="m-0" key={order.id}>
            Order #1232
          </p>
          {clicked ? (
            <MdKeyboardArrowUp key={order.id} />
          ) : (
            <MdKeyboardArrowDown key={order.id} />
          )}
        </button>
        <div className="collapse" id="orderOne" key={order.id}>
          <ProductsList products={order.orderDetails} key={order.id} />
        </div>
      </div>
    );
  });
};

export default OrdersList;
