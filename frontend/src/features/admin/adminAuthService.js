import axios from "axios";

const API_URL = "/api/admin/";

// Admin Log In
const adminLogin = async (adminData) => {
    const response = await axios.post(API_URL + "login", adminData);
    return response.data;
};

const adminAuthService = {
    adminLogin,
};

export default adminAuthService;
