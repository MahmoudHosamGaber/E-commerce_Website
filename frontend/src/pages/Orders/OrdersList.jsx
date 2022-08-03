import ProductsList from "./ProductsList";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useState } from "react";
import moment from "moment";

const OrdersList = ({ orders }) => {
    const handleClick = () => {
        setClicked((clicked) => !clicked);
    };
    // let temp = orders.split().sort((order1, order2) => {
    //     console.log(typeof moment(order1.updatedAt).diff(order2.updatedAt));

    //     return moment(order1.updatedAt).diff(order2.updatedAt);
    // });
    const [clicked, setClicked] = useState(false);

    if (orders.length === 0) {
        return (
            <div className="text-center h3">You haven't made any orders!</div>
        );
    }
    return orders.map((order, index) => {
        return (
            <div
                className="order_wrapper-content_items_product mb-5"
                key={order._id}
            >
                <button
                    className="btn info_button w-100 d-flex align-items-center justify-content-between"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#order-${index}`}
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    onClick={() => handleClick()}
                >
                    <p className="h6 fw-bold">Status: {order.status}</p>
                    <p className="m-0 lead">
                        {moment(order.updatedAt).fromNow()}
                    </p>
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
