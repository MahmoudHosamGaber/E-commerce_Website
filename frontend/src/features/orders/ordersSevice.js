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


//Create an order 
const createOrder= async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(`${API_URL}/api/orders`, config)

  return response.data
}

const ordersService = {
  getAllOrders,
  createOrder
};

export default ordersService;
