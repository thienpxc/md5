import { categoryApi } from "./modules/category";

import { productApi } from "./modules/product";
import {loginApi} from "./modules/login";
import { registerApi } from "./modules/register";

import { userApi } from "./modules/user";
import { orderApi } from "./modules/order";

import "./axios.instance";
import { addressApi } from "./modules/apighn";

export default {
  category: categoryApi,
  login: loginApi,
  register: registerApi,
  user: userApi,
  product: productApi,
  address: addressApi,
  order: orderApi,
};
