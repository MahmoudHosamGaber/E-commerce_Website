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

const addProduct = async (product, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post("/api/products", product, config);
    return response.data;
};

const getArchivedProducts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get("/api/products/archived", config);
    return response.data;
};

const productService = {
    updateSingleProduct,
    deleteSingleProduct,
    addProduct,
    getArchivedProducts,
};

export default productService;
