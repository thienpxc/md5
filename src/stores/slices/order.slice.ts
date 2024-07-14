import apis from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

enum Status {
  SHOPPING = "SHOPPING",
  WAITING = "WAITING",
  CONFIRMED = "CONFIRMED",
  DELIVERED = "DELIVERED",
  SUCCESS = "SUCCESS",
  CANCEL = "CANCEL",
  DELETED = "DELETED",
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  stauts: boolean;
}

interface OrderDetail {
  productmodel: any;
  id: number;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  user: number;
  status: Status;
  note: string;
  createDate: string;
  updateDate: string;
  details: OrderDetail[];
  totalPrices: number;
}

export interface OrderState {
  cart: null | Order;
  orders: Order[];
}

const initialState: OrderState = {
  cart: null,
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(loadDataThunk.fulfilled, (state, action) => {
      state.cart =
        action.payload.find(
          (order: Order) => order.status == Status.SHOPPING
        ) || null;
      state.orders = action.payload.filter(
        (order: Order) => order.status != Status.SHOPPING
      );
    });
  },
});

const loadDataThunk = createAsyncThunk("order/loadDataThunk", async () => {
  const res = await apis.order.getCart();
  console.log(res.data);

  return res.data;
});

export const orderReducer = orderSlice.reducer;
export const orderActions = {
  ...orderSlice.actions,
  loadDataThunk,
};
