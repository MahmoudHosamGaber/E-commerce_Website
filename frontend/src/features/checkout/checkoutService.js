import axios from "axios";

const API_URL = "/api/orders/";

//Create an order 
const createOrder = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, config);
    return response.data;
};

const checkoutService = {
    createOrder
};

export default checkoutService;