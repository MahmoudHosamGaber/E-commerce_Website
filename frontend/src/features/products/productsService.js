import axios from "axios";

const updateSingleProduct = async (product, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
    );
    return response.data;
};

const deleteSingleProduct = async (productId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(`/api/products/${productId}`, config);
    return response.data;
};

const productService = {
    updateSingleProduct,
    deleteSingleProduct,
};

export default productService;
