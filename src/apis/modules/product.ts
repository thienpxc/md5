/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteImage } from "@/firebase";
import axios from "axios";

export const productApi = {
  findAll: async () => {
    return await axios.get(`${import.meta.env.VITE_SV}/admin/products`);
  },
  findAllCategoryTrue: async () => {
    return await axios.get(`${import.meta.env.VITE_SV}/categories/findAll`);
  },
  addProduct: async (data: {
    product: {
      name: string;
      description: string;
      price: string;
      quantity: string;
      categoryId: string;
    };
    images: {
      imageUrl: string;
    }[];
  }) => {
    return await axios.post(`${import.meta.env.VITE_SV}/admin/products`, data);
  },
  getProductById: async (id: string | undefined) => {
    return await axios.get(`${import.meta.env.VITE_SV}/admin/products/${id}`);
  },
  deleteImage: async (imageUrl: string) => {
    return await axios.delete(
      `${import.meta.env.VITE_SV}/admin/products/${imageUrl}`
    );
  },
  updateProduct: async (data: {
    product: {
      name: string | undefined;
      price: string | undefined;
      quantity: string | undefined;
      description: string | undefined;
    };
    images: (
      | string
      | {
          imageUrl: string;
        }
    )[];
  }) => {
    return await axios.put(`${import.meta.env.VITE_SV}/admin/products`, data);
  },
  findByisFeaturedTrue: async () => {
    return await axios.get(`${import.meta.env.VITE_SV}`);
  },
  findCategoryById: async (id: string) => {
    console.log(id);
    return await axios.get(`${import.meta.env.VITE_SV}/category/${id}`);
  },
  newProduct: async () => {
    return await axios.get(`${import.meta.env.VITE_SV}/new-products`);
  }
};
