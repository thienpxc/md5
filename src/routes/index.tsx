import HeroHeader from "@pages/home/HomePage/HeroHeader";
import Profile from "@/pages/home/users/profile/Profile";


import Cart from "@/pages/home/Cart/Cart2";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PasswordChange from "@/pages/home/users/changePassword/PasswordChange";




import EditProduct from "@/pages/admin/product/EditProduct";
import ProductAdmin from "@/pages/admin/product/ProductAdmin";
import UserAdmin from "@/pages/admin/user/UsersAdmin";
import OrderAdmin from "@/pages/admin/order/OdersAdmin";

import Confirmed from "@/pages/admin/order/Confirmed";
import Success from "@/pages/admin/order/Success";
import Delivered from "@/pages/admin/order/Delivered";
import Waitting from "@/pages/admin/order/Waitting";
import Cancel from "@/pages/admin/order/Cancel";
import AddProduct from "@/pages/admin/product/AddProduct";
import ProductDetail from "@/pages/home/ProductDetail/ProductDetail";
import EditProfile from "@/pages/home/users/profile-edit/EditProfile";
import ProductCategory from "@pages/home/HomePage/Product/ProductCategory";
import Category from "@pages/home/HomePage/Product/Category";
import OrderHistory from "@/pages/home/Cart/OrderHistory";
import Order from "@pages/admin/product/Order";
import Checkout from "@/pages/home/Cart/Checkout";
import { lazyFn, lazyFnDelay } from "./lazy";
export default function index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={lazyFnDelay(() => import("@pages/not-fond/404"))}
        />
        <Route path="/" element={lazyFnDelay(() => import("@pages/Home"))}>
          <Route
            path=""
            element={lazyFnDelay(
              () => import("@pages/home/HomePage/HeroHeader")
            )}
          ></Route>
          <Route
            path="category"
            element={<Category></Category>}
          ></Route>
          <Route
            path="/category/product/:productId"
            element={<ProductCategory></ProductCategory>}
          ></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>
          <Route path="/detail/:productId" element={<ProductDetail />} />
        </Route>
        <Route path="/profile" element={<Profile></Profile>}>
          <Route path="orderhistory" element={<OrderHistory></OrderHistory>} />
          <Route path="edit" element={<EditProfile></EditProfile>} />
          <Route
            path="changepassword"
            element={<PasswordChange></PasswordChange>}
          />
        </Route>
        <Route
          path="/login"
          element={lazyFnDelay(() => import("@/pages/logIn/LogIn"), {
            enable: localStorage.getItem("token") == null,
            fallBackUrl: "/",
          })}
        />
        <Route
          path="/register"
          element={lazyFnDelay(() => import("@/pages/logIn/Register"), {
            enable: localStorage.getItem("token") == null,
            fallBackUrl: "/",
          })}
        />
        <Route
          path="/admin"
          element={lazyFnDelay(() => import("@/pages/admin/home/HomeAdmin"), {
            enable: localStorage.getItem("token") != null,
            fallBackUrl: "/",
          })}
        >
          <Route
            path="category"
            element={lazyFn(
              () => import("@/pages/admin/category/CategoryAdmin")
            )}
          />
          <Route path="product" element={<ProductAdmin></ProductAdmin>} />
          <Route path="product/add" element={<AddProduct></AddProduct>} />
          <Route
            path="product/edit/:productId"
            element={<EditProduct></EditProduct>}
          />

          <Route path="user" element={<UserAdmin></UserAdmin>} />
          <Route path="order" element={<OrderAdmin></OrderAdmin>}>
            <Route path="all" element={<Order></Order>} />
            <Route path="confirmed" element={<Confirmed></Confirmed>} />
            <Route path="success" element={<Success></Success>} />
            <Route path="delivered" element={<Delivered></Delivered>} />
            <Route path="waitting" element={<Waitting></Waitting>} />
            <Route path="cancel" element={<Cancel></Cancel>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
