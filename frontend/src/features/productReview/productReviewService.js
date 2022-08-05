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

const productReviewService = {
    getReview,
};
export default productReviewService;
