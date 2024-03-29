import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + "register", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

// Log in user
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

// Logout user
const logout = async () => {
    localStorage.removeItem("user");
};

// Update user password
const updateUserInfo = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL, userData, config);
    if (response.data) {
        const user = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem(
            "user",
            JSON.stringify({ ...user, ...response.data })
        );
    }
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    updateUserInfo,
};

export default authService;
