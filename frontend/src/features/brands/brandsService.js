import axios from "axios";

const API_URL = "/api/brands/";

// Get all the brands
const getBrands = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const brandsService = {
    getBrands,
};

export default brandsService;
