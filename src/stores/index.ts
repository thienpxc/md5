import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  CategoryState,
  categoryActions,
  categoryReducer,
} from "./slices/category.slices";

import { UserState, userActions, userReducer } from "./slices/user.slices";
import { productActions, productReducer, ProductState } from "./slices/product.slices";
import { orderActions, orderReducer, OrderState } from "./slices/order.slice";
import { useDispatch } from "react-redux";

export type StoreType = {
  categoryStore: CategoryState;
  userStore: UserState;
  productsStore: ProductState;
  orderStore: OrderState;
};

const rootReducer = combineReducers({
  categoryStore: categoryReducer,
  userStore: userReducer,
  productsStore: productReducer,
  orderStore: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

store.dispatch(categoryActions.findAllThunk());
store.dispatch(productActions.findDataThunk());
store.dispatch(userActions.findDataThunk());

store.dispatch(orderActions.loadDataThunk());

export default store;
