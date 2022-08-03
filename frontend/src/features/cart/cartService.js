import axios from 'axios';

const API_URL = '/api/cart/';

const getCart = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };  
    const response = await axios.get(API_URL, config);
    return response.data;
}

const addToCart = async (prodducId, quantity, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(API_URL + "add", prodducId, quantity, config);
    return response.data;
}

const cartService = {
    getCart,
    addToCart
};
export default cartService;