import { AiTwotoneStar } from "react-icons/ai";
import productReviewService from "../../features/productReview/productReviewService";
import CustomerReview from "./CustomerReview";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductReviewForm from "./ProductReviewForm";
import { Rating } from "@mui/material";
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

    if (review?.reviewsList?.length === 0) {
        return (
            <div className="reviews__container mt-5 mb-5 w-100">
                <div className="container">
                    <div className="total__reviews">
                        <div className="h3">Product Reviews</div>
                        <div className="h1">Be The First To Review</div>
                        <div className="write__review mb-4 ">
                            <ProductReviewForm
                                productId={productId}
                                review={review}
                                setReview={setReview}
                            />
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
                    <Rating
                        name="half-rating"
                        size="large"
                        value={parseFloat(review?.reviewAverage?.averageStars)}
                        precision={0.5}
                        readOnly
                    />
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
                    <ProductReviewForm
                        productId={productId}
                        review={review}
                        setReview={setReview}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductReview;
