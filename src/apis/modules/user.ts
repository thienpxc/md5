import { User } from "@/stores/slices/user.slices";
import axios from "axios";

export const userApi = {
  authen: async () => {
    return axios.post(`${import.meta.env.VITE_SV}/authen`, {});
  },
  getAllUser: async () => {
    return axios.get(`${import.meta.env.VITE_SV}/list`);
  },
  update: (data: User) => {
    return axios.put(`${import.meta.env.VITE_SV}/update`, data);
  },
  changePassword: (data: User) => {
    return axios.put(`${import.meta.env.VITE_SV}/changePassword`, data);
  },
  searchUser: (name: string) => {
    return axios.get(`${import.meta.env.VITE_SV}/search?name=${name}`);
  },
  paginationUser: (offset: number, limit: number) => {
    return axios.get(
      `${import.meta.env.VITE_SV}/pagination?offset=${offset}&limit=${limit}`
    );
  },
};
