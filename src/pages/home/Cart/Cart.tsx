import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/stores/slices";
import apis from "@/apis";
import { orderActions } from "@/stores/slices/order.slice";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
  selected: boolean;
}

const CartPage: React.FC = () => {
 
 const dispatch = useDispatch();
 const orderStore = useSelector((store: StoreType) => store.orderStore);
 console.log(orderStore.cart);
  const navigate = useNavigate();

  
  const findCurrentQuantityById = (id: number): number => {
    // Giả sử orderStore.cart là một mảng các sản phẩm, và mỗi sản phẩm có id và quantity
    const product = orderStore.cart?.details.find((product) => product.id === id);
    if (!product) {
      console.error("Product not found");
      return 0; // Hoặc xử lý khác tùy thuộc vào yêu cầu của bạn
    }
    return product.quantity;
  };
  const handleQuantityChange = async (id: number, change: number) => {
    try {
      const currentQuantity = findCurrentQuantityById(id); // Bạn cần định nghĩa hàm này
      console.log("currentQuantity", currentQuantity);
      const newQuantity = currentQuantity + change;
      if (newQuantity < 1) return; // Ngăn số lượng âm
      console.log("newQuantity", newQuantity);
      const response = await apis.order.updateQuantity({
        orderDetailId: id,
        quantity: newQuantity,
      });

      if (response.status === 200) {
        // Cập nhật state local
        window.location.reload();


      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  
   
 

 

  const handleBackClick = () => {
    navigate("/");
  };
const { t } = useTranslation();
  return (
    <div className="cart-page">
      <header>
        <button onClick={handleBackClick}>←</button>
        <h1>{t("mycart")}</h1>
        <button
          onClick={() => {
            apis.order.deleteCard().then((res) => {
              window.location.reload();
            });
          }}
        >
          xóa tất cả
        </button>
      </header>

      {orderStore.cart && orderStore.cart.details && (
        <>
          {orderStore.cart.details.map((item) => (
            <div key={item.id} className="main-product">
              <input
                type="checkbox"
                checked={item.selected}
                // onChange={() => handleSelectToggle(item.id)}
              />
              <img
                src={item.productvariant.image}
                alt={item.productvariant.product.name}
              />
              <div>
                <h2>{item.productvariant.product.name}</h2>
                <p>{item.price.toLocaleString()} đ</p>
              </div>
              <div className="quantity-control">
                <button onClick={() => handleQuantityChange(item.id, -1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>
                  +
                </button>
              </div>
              <p>
                Thành tiền:
                {(item.price * item.quantity).toLocaleString()} đ
              </p>
            </div>
          ))}
          <div className="cart-total">
            <h3>Tổng cộng:{orderStore.cart.totalPrices.toLocaleString()}đ</h3>
            <button
              onClick={() => {
                navigate("/checkout");
              }}
            >
              {t("checkout")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
