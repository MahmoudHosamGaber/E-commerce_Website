import ProductsList from "./ProductsList";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useState } from "react";

const OrdersList = ({ orders }) => {
  const handleClick = () => {
    setClicked((clicked) => !clicked);
  };
  const [clicked, setClicked] = useState(false);
  return orders.map((order, index) => {
    return (
      <div className="order_wrapper-content_items_product mb-5" key={order._id}>
        <button
          className="btn info_button w-100 d-flex align-items-center justify-content-between"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#order-${index}`}
          aria-expanded="false"
          aria-controls="collapseExample"
          onClick={() => handleClick()}
        >
          <p className="m-0">Order #{index + 1}</p>
          {clicked ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </button>
        <div className="collapse" id={`order-${index}`}>
          <ProductsList products={order.orderDetails} />
        </div>
      </div>
    );
  });
};

export default OrdersList;
