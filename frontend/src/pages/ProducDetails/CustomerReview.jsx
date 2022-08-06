import { AiTwotoneStar } from "react-icons/ai";
import { Rating } from "@mui/material";

const CustomerReview = ({ customerReview }) => {
    return (
        <>
            <h5>{customerReview?.username || "Anonymous User"}:</h5>
            <Rating value={customerReview?.stars} precision={0.5} readOnly />
            <p className="ms-3">{customerReview?.comment}</p>
        </>
    );
};

export default CustomerReview;
