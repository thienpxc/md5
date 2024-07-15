import apis from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
export interface User {
  id: number;
  userName: string;
  password: string;
  email: string;
  phone: string;
  avatarUrl: string;

  role?: Role;
  permission?: string;
  status?: boolean;
  isDeleted?: boolean;
  isVerified?: boolean;
  createAt?: string;
  updateAt?: string;
  addresses: Address[];
}

export interface Address {
  id?: number;
  isDefault?: boolean;

  title: string;
  detail: string;
  phone: string;
  name: string;

  ProvinceID: number;
  ProvinceName: string;
  DistrictID: number;
  DistrictName: string;
  WardCode: string;
  WardName: string;
}
export interface Provine {
  ProvinceID: number;
  ProvinceName: string;
}

export interface District {
  DistrictID: number;
  DistrictName: string;
}

export interface Ward {
  WardCode: string;
  WardName: string;
}

export interface AddressCreate {
  id?: number;
  isDefault?: boolean;

  title: string;
  detail: string;
  phone: string;
  name: string;

  provinceID: number;
  provinceName: string;
  districtID: number;
  districtName: string;
  wardCode: string;
  wardName: string;
}

export interface UserState {
  data: User | null;
  loading: boolean;
}

const initialState: UserState = {
  data: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findDataThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(findDataThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(findDataThunk.rejected, (state, action) => {
      state.data = null;
      localStorage.removeItem("token");
      state.loading = false;
    });
  },
});

const findDataThunk = createAsyncThunk("user/findData", async () => {
  const res = await apis.user.authen();
  return res.data;
});

export const userReducer = userSlice.reducer;
export const userActions = {
  ...userSlice.actions,
  findDataThunk,
};
