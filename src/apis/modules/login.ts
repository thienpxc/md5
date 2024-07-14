import axios from "axios";

export const loginApi = {
  loginApi: async (data: { loginId: string; password: string }) => {
    return await axios.post(`${import.meta.env.VITE_SV}/login`, data);
  },
};
