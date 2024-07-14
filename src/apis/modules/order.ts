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

  checkOut: async (cartId: number) => {
    return axios.post(`${import.meta.env.VITE_SV}/order/${cartId}/check-out`);
  },
  updateQuantity: async (data: { orderDetailId: number; quantity: number }) => {
    return axios.put(`${import.meta.env.VITE_SV}/update-quantity`, data);
  },
  deleteCard: async () => {
    return axios.delete(`${import.meta.env.VITE_SV}/order/clear-cart`);
  },
};