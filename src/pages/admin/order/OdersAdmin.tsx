import React, { useState } from "react";
import "../category/category.scss";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductAdmin: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  //translate
  const { t } = useTranslation();

  return (
    <div className="category-list">
      <h1>{t("orders")}</h1>
      <h2>{t("allOrder")}</h2>
      <div className="order-filters">
        <button
          className={selectedFilter === "all" ? "selected" : ""}
          onClick={() => handleFilterClick("all")}
        >
          <Link to="/admin/order/all">{t("totalOrderList")}</Link>
        </button>
        <button
          className={selectedFilter === "waiting" ? "selected" : ""}
          onClick={() => handleFilterClick("waiting")}
        >
          <Link to="/admin/order/waitting">{t("pendingOrderList")}</Link>
        </button>
        <button
          className={selectedFilter === "confirmed" ? "selected" : ""}
          onClick={() => handleFilterClick("confirmed")}
        >
          <Link to="/admin/order/confirmed"> {t("confirmOrderList")}</Link>
        </button>
        <button
          className={selectedFilter === "success" ? "selected" : ""}
          onClick={() => handleFilterClick("success")}
        >
          <Link to="/admin/order/success">{t("shippingOrderList")}</Link>
        </button>
        <button
          className={selectedFilter === "delivered" ? "selected" : ""}
          onClick={() => handleFilterClick("delivered")}
        >
          <Link to="/admin/order/delivered"> {t("completeOrderList")}</Link>
        </button>
        <button
          className={selectedFilter === "cancel" ? "selected" : ""}
          onClick={() => handleFilterClick("cancel")}
        >
          <Link to="/admin/order/cancel">{t("cancelOrderList")}</Link>
        </button>
      </div>

      <div className="home_page_container">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default ProductAdmin;
