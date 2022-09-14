import axios from "axios";

const API_URL = "/api/admin/";

// Admin Log In
const adminLogin = async (adminData) => {
    const response = await axios.post(API_URL + "login", adminData);
    if (response.data) {
        localStorage.setItem("admin", JSON.stringify(response.data));
    }
    return response.data;
};

// Admin get all users
const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + "users/", config);
    return response.data;
};

const adminAuthService = {
    adminLogin,
    getUsers,
};

export default adminAuthService;
