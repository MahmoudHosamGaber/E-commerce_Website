import axios from "axios";

const API_URL = "/api/product";

const getReview = async (token, productId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}/${productId}`, config);
    return response.data;
};

const addReview = async (token, productId, review) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(
        `${API_URL}/${productId}/review`,
        review,
        config
    );
    return response.data;
};
const productReviewService = {
    getReview,
    addReview,
};
export default productReviewService;
