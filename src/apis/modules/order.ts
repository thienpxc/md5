import axios from "axios"

export const orderApi = {
  addToCart: async (data: {
   
    product: number;
    quantity: number;
   
    price: number;
  }) => {
    return axios.post(`${import.meta.env.VITE_SV}/order/add-to-cart`, data);
  },

  getCart: async () => {
    return axios.get(`${import.meta.env.VITE_SV}/order/find-cart`);
  },

  checkOut: async (data: {
        total: number;
        addressId: number;
        id: number;
      }) => {
    return axios.post(`${import.meta.env.VITE_SV}/check-out`,data);
  },
  updateQuantity: async (data: { orderDetailId: number; quantity: number }) => {
    return axios.put(`${import.meta.env.VITE_SV}/update-quantity`, data);
  },
  deleteCard: async () => {
    return axios.delete(`${import.meta.env.VITE_SV}/order/clear-cart`);
  },
  findAll: async () => {
    return axios.get(`${import.meta.env.VITE_SV}/find-all-order`);
  },
};