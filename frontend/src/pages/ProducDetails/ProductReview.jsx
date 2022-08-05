import { AiTwotoneStar } from "react-icons/ai";
import productReviewService from "../../features/productReview/productReviewService";
import CustomerReview from "./CustomerReview";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductReview = ({ productId }) => {
    const token = useSelector((state) => state.auth.user.token);
    const [review, setReview] = useState({});
    useEffect(() => {
        (async () => {
            const productReview = await productReviewService.getReview(
                token,
                productId
            );
            setReview(productReview);
        })();
    }, []);
    const stars = [];
    for (let i = 1; i <= Math.floor(review?.reviews?.[0]?.averageStars); i++) {
        stars.push(<AiTwotoneStar className="ms-2" />);
    }
    if (review?.reviewsList?.length === 0) {
        return (
            <div className="reviews__container mt-5 mb-5 w-100">
                <div className="container">
                    <div className="total__reviews">
                        <div className="h3">Product Reviews</div>
                        <div className="h1">Be The First To Review</div>
                        <div className="write__review mb-4 ">
                            <button className="write__review-button">
                                Write a review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="reviews__container mt-5 mb-5 w-100">
            <div className="container">
                <div className="total__reviews d-flex align-items-center mb-4">
                    <h3 className="m-0">Product Reviews: </h3>
                    <p className="m-0">
                        {stars.map((star, index) => (
                            <span key={index}>{star}</span>
                        ))}
                    </p>
                </div>
                <div className="customers-reviews">
                    {review?.reviewsList?.map((customerReview, index) => (
                        <CustomerReview
                            customerReview={customerReview}
                            key={index}
                        />
                    ))}
                </div>

                <div className="write__review mb-4 ">
                    <button className="write__review-button">
                        Write a review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductReview;
