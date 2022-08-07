import axios from "axios";

const API_URL = "/api/cart/";

const getCart = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

const addToCart = async ({ productId, quantity }, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(
        API_URL + "add",
        { productId, quantity },
        config
    );
    return response.data;
};

const removeItem = async ({ productId }, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + "remove", { productId }, config);
    return response.data;
};

const deleteCart = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL+ "delete", config);
    return response.data;
};


const cartService = {
    getCart,
    addToCart,
    removeItem,
    deleteCart,
};
export default cartService;
