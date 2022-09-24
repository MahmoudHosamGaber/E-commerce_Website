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

// Admin change user status

const changeUserStatus = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(
        API_URL + "users/status",
        userData,
        config
    );
    return response.data;
};

// Admin changes user password

const changeUserPassword = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(
        API_URL + "users/password",
        userData,
        config
    );
    return response.data;
};

// Admin get all orders

const getOrders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + "orders", config);
    return response.data;
};

// Admin change user status

const changeOrderStatus = async (orderData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(
        API_URL + `orders/${orderData.id}/status`,
        {status : orderData.status},
        config
    );
    return response.data;
};


// Admin get all coupons 

const getCoupons = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get("/api/coupons/", config);
    return response.data;
};

// Admin delete a coupon 

const deleteCoupon = async (code, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(`/api/coupons/${code}`, config);
    return response.data;
}

// Admin create a coupon 

const createCoupon = async(couponData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`/api/coupons/`, couponData, config);
    return response.data;
}
const adminAuthService = {
    adminLogin,
    getUsers,
    changeUserStatus,
    changeUserPassword,
    getOrders,
    changeOrderStatus,
    getCoupons,
    deleteCoupon,
    createCoupon,
};

export default adminAuthService;
