import React, { useState, useEffect } from "react";
import Star from "./Star";

// import { AiFillStar, AiFillStarOutline, AiFillStarHalf } from "react-icons/ai";

const Reviews = ({ product }) => {
  // const { product, stars } = props;
  //   console.log("props", product);
  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  //fetch call to get reviews
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    // console.log("useEffect getReviews");
    fetch(`http://localhost:3001/api/product/${product._id}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        // console.log('fetch data', data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("reviews", reviews);

  const avg =
    isEmpty(reviews) || isEmpty(reviews.reviews)
      ? 0
      : reviews.reviews[0].averageStars;
  const cnt =
    isEmpty(reviews) || isEmpty(reviews.reviews) ? 0 : reviews.reviews[0].count;
  const lst =
    isEmpty(reviews) || isEmpty(reviews.reviews) ? [] : reviews.reviewsList;
  console.log("lst", lst);
  return (
    <>
      <div className="total__reviews d-flex1 align-items-center mb-4">
        <h2 className="m-0">Total Reviews:</h2>
        <p className="m-0">
          <Star avg={avg} index={1} />
          <Star avg={avg} index={2} />
          <Star avg={avg} index={3} />
          <Star avg={avg} index={4} />
          <Star avg={avg} index={5} />
        </p>
        <h3>
          Average of {avg} from {cnt} reviews
        </h3>
      </div>
      {/* customer reviews */}

      <div className="customers-reviews">
        {lst.map((review) => (
          <div key={review._id}>
            <h5>Customer Name: </h5>
            <p className="m-1">
              <Star avg={review.stars} index={1} />
              <Star avg={review.stars} index={2} />
              <Star avg={review.stars} index={3} />
              <Star avg={review.stars} index={4} />
              <Star avg={review.stars} index={5} />
            </p>
            <div className="ms-3">
              <p className="m-0">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
      {/* must be a loggedin user to write a review */}
      <div className="write__review mb-4 ">
        <button className="write__review-button">
            Write a review
        </button>
    </div>
    </>
  );
};

export default Reviews;
