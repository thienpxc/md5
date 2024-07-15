import { AddressCreate } from "@/stores/slices/user.slices";
import axios from "axios";

const GHN_API_URL = "https://online-gateway.ghn.vn/shiip/public-api";
const GHN_TOKEN = "2b5b2820-41f5-11ef-8f55-4ee3d82283af"; 


export const addressApi = {
  findProvine: async () => {
    return await axios.get(`${import.meta.env.VITE_SV}/address/find-provine`);
  },
  findDistrict: async (provine_id: number) => {
    return await axios.get(
      `${import.meta.env.VITE_SV}/address/find-district/` + provine_id
    );
  },
  findWard: async (district_id: number) => {
    return await axios.get(
      `${import.meta.env.VITE_SV}/address/find-ward/` + district_id
    );
  },
  create: async (data: AddressCreate) => {
    return await axios.post(`${import.meta.env.VITE_SV}/address/create`, data);
  },
  findByUser: async () => {
    return await axios.get(
      `${import.meta.env.VITE_SV}/address/get-all-for-user`
    );
  },
  findAllForUser: async () => {
    return await axios.get(
      `${import.meta.env.VITE_SV}/receipts/find-all-for-user`
    );
  },
};