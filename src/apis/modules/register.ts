import axios from "axios";

export const registerApi = {
  registerUser: async (data: {
    userName: string;
    phone: string;
    email: string;
    password: string;
  
  }) => {
    return await axios.post(`${import.meta.env.VITE_SV}/register`, data);
  },
  
};
