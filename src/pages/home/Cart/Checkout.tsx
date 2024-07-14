import React from "react";
import {  useSelector } from "react-redux";
import { StoreType } from "@/stores"; // Giả sử đường dẫn này là đúng
// import apis from "@/apis";
// import { orderActions } from "@/stores/slices/order.slice";
import "./Cart.scss";
// import { showToast } from "@/util/toast";

export default function Checkout() {

  const userStore = useSelector((store: StoreType) => store.userStore.data);
 
  const orderStore = useSelector((store: StoreType) => store.orderStore);

  console.log(orderStore.cart);
  return (
      <div className="checkout-container">
      <div id="fui-toast"></div>
      <h2 className="checkout-title">Checkout</h2>
      <div className="user-info">
        <h3>Thông tin khách hàng</h3>
        <p>Tên: {userStore.userName}</p>
        <p>Email: {userStore.email}</p>
        <p>Số điện thoại: {userStore.phone}</p>
      </div>
      <div className="shipping-info">
        <h3>Thông tin nhận hàng</h3>
        <input
          type="text"
          placeholder="Tỉnh / Thành phố"
          // value={city}
          // onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Quận / Huyện"
          // value={district}
          // onChange={(e) => setDistrict(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phường / Xã"
          // value={ward}
          // onChange={(e) => setWard(e.target.value)}
        />
        <input
          type="text"
          placeholder="Địa chỉ nhà"
          // value={shippingAddress}
          // onChange={(e) => setShippingAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ghi chú (nếu có)"
          // value={notes}
          // onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      {orderStore.cart && (
        <div className="cart-info">
          <h3>Giỏ hàng</h3>
          <ul>
            {orderStore.cart.details.map((item) => (
              <li key={item.id}>
                {item.productmodel.name} - <br />
                Số lượng: {item.quantity}
                <br />
                {item.productmodel.productImg && item.productmodel.productImg.length > 0 && (
                  <img
                    src={item.productmodel.productImg[0].images}
                    alt=""
                    className="cart-item-image"
                  />
                )}
                <br />
              </li>
            ))}
          </ul>
          <p className="total-price">Tổng cộng: {orderStore.cart.totalPrices.toLocaleString()}đ</p>
        </div>
      )}
      <button className="checkout-button">Thanh toán</button>
    </div>
  
  );
}
