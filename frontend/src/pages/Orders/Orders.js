import OrdersList from "./OrdersList";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchOrders } from "../../features/orders/ordersSlice";
import "./orders.css";
import Spinner from "../../components/Spinner";

const Orders = () => {
    const orders = useSelector((state) => state.orders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);
    if (orders.isLoading) {
        return <Spinner />;
    }

    if (orders.isError) {
        return (
            <>
                <div>{orders.message}</div>;{" "}
            </>
        );
    }

    return (
        <div className="orders_wrapper">
            <div className="orders_wrapper-content d-flex w-100 p-5">
                <h1 className="mb-5">My Orders</h1>
                <div className="order_wrapper-content_items w-75">
                    <OrdersList orders={orders.orders} />
                </div>
            </div>
        </div>
    );
};

export default Orders;
