import { AiTwotoneStar } from "react-icons/ai";

const CustomerReview = ({ customerReview }) => {
    const stars = [];
    for (let index = 0; index < customerReview?.stars; index++) {
        stars.push(<AiTwotoneStar />);
    }
    return (
        <>
            <h5>{customerReview?.username || "Anonymous User"}:</h5>
            <p className="m-1">
                {stars.map((star, index) => (
                    <span key={index}>{star}</span>
                ))}
            </p>
            <p className="ms-3">{customerReview?.comment}</p>
        </>
    );
};

export default CustomerReview;
