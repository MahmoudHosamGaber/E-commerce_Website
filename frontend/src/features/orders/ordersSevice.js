import axios from "axios";

const API_URL = "http://localhost:3001";

const getAllOrders = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/api/orders`, config);
  return response.data;
};

const ordersService = {
  getAllOrders,
};

export default ordersService;
