import React, { useState, useEffect } from "react";
import Subheading from "../../components/SubHeading/Subheading";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, reset } from "../../features/cart/cartSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import "./productdetails.css";
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";

const ProductDetails = () => {
    const [quantityCounter, setQuantityCounter] = useState(1);
    const product = useSelector((state) => state.products.selectedProduct[0]);
    const dispatch = useDispatch();
    const { isSuccess, isError, message } = useSelector((state) => state.cart);
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast.success("Product Added Successfully");
        }
        dispatch(reset());
    }, [isSuccess, isError, message, dispatch]);

    const addProduct = (productId, quantity) => {
        console.log(quantity);
        dispatch(addToCart({ productId, quantity }));
    };
    const handleQuantityAddition = () => {
        setQuantityCounter(quantityCounter + 1);
    };

    const handleQuantitySubtraction = () => {
        if (quantityCounter > 0) {
            setQuantityCounter(quantityCounter - 1);
        }
    };

    return (
        <div className="details__wrapper pt-4 pb-4">
            <div className="container">
                <Subheading title="Product" />
                <div className="details__wrappper-content">
                    <div className="row">
                        <div className="details__img col-sm-12 col-md-6">
                            <img src={product.images[1]} alt="" />
                        </div>
                        <div className="details__info col-sm-12 col-md-6">
                            <div className="details__info-head d-flex justify-content-between align-items-center mb-4">
                                <h3>{product.name}</h3>
                                <p
                                    style={{
                                        fontSize: "36px",
                                        marginRight: 50,
                                    }}
                                >
                                    ${product.price}
                                </p>
                            </div>
                            <h3 className="mb-3">Product Details</h3>
                            <ul className="info__list">
                                <li>{product.description}</li>
                                <li>Stock: {product.quantityInStock}</li>
                                <li>
                                    Delivery time:{" "}
                                    {product.daysTillDelivery > 1 ? (
                                        <span>
                                            {product.daysTillDelivery} days
                                        </span>
                                    ) : (
                                        <span>
                                            {product.daysTillDelivery} day
                                        </span>
                                    )}
                                </li>
                            </ul>
                            <div className="quantity__wrapper mt-4 d-flex justify-content-between align-items-center">
                                <div className="quantity__container d-flex justify-content-between align-items-center">
                                    <p className="me-3 p-0 mb-0">Quantity: </p>
                                    <AiOutlineMinus
                                        style={{
                                            color: "#795548",
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            handleQuantitySubtraction()
                                        }
                                    />
                                    <div
                                        className="quantity ms-3 me-3 pb-2"
                                        style={{ fontSize: 40 }}
                                    >
                                        {quantityCounter}
                                    </div>
                                    <AiOutlinePlus
                                        style={{
                                            color: "#795548",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => handleQuantityAddition()}
                                    />
                                </div>
                                <button
                                    className="add__cart"
                                    onClick={() =>
                                        addProduct(product._id, quantityCounter)
                                    }
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductReview productId={product._id} />
        </div>
    );
};

export default ProductDetails;
