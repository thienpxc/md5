import apis from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "./category.slices";

export interface ProductImg {
  id: string;
  images: string;
  
}


export interface Product {
  map // Thêm sản phẩm mới vào state
    (arg0: (product: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode | Iterable<import("react").ReactNode>;
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  productImg: ProductImg[];
  categoryId: Category;
  status: boolean;
  isFeatured: boolean;
  createdDate: string;
}
export interface ProductState {
  data: Product[] | null;
}
const productStateInit: ProductState = {
  data: null,
  
};



const productSlice = createSlice({
  name: "products",
  initialState: productStateInit,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findDataThunk.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        // Thêm sản phẩm mới vào state
        state.data!.push(action.payload);
      });
    
  },
});

const addProductThunk = createAsyncThunk(
  "product/addProduct",
  async (formData: {
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
    const res = await apis.product.addProduct(formData);
    return res.data; // Giả sử API trả về sản phẩm đã được thêm
  }
);



const findDataThunk = createAsyncThunk("product/findData", async () => {
  const res = await apis.product.findAll();

  return res.data;
});




export const productReducer = productSlice.reducer;
export const productActions = {
  ...productSlice.actions,
  findDataThunk,
  addProductThunk,
  
};
