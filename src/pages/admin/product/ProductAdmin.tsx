import React, { useEffect } from "react";
import "../category/category.scss";
import "./product.scss";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import { StoreType, useAppDispatch } from "@/stores";
import { productActions } from "@/stores/slices/product.slices";

const ProductAdmin: React.FC = () => {
 const navigate = useNavigate();
  const dispatch = useAppDispatch();
 const productStore = useSelector((store: StoreType) => store.productsStore);




 useEffect(() => {
   dispatch(productActions.findDataThunk());
 }, [dispatch]);
  //translation
  const { t } = useTranslation();

   if (!productStore.data) {
     return <div>Loading...</div>; // hoặc bất kỳ loading indicator nào bạn muốn
   }
  return (
    <div className="category-list">
      <h1>{t("product")}</h1>
      <h2>{t("allProduct")}</h2>

      <button className="add-category-btn">
        <Link className="link-add-category" to="add">
          {t("addProduct")}
        </Link>
      </button>

      <table>
        <thead>
          <tr>
            <th>{t("idProduct")}</th>
            <th>{t("nameProduct")}</th>
            {/* <th>{t("imageProduct")}</th> */}
            <th>{t("categoryProduct")}</th>
            {/* <th>{t("priceProduct")}</th> */}
            <th>price</th>
            <th>{t("imageProduct")}</th>
            <th>quantity</th>
            {/* <th>{t("updateDateProduct")}</th> */}
            <th>{t("statusProduct")}</th>
            <th>SpecialProducts</th>
            <th colSpan={2}>Tools</th>
          </tr>
        </thead>
        <tbody>
          {productStore.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.categoryId?.name}</td>

              <td>{product.price}</td>
              <td>
                <img
                  className="product-image"
                  src={product.productImg[0]?.images}
                  alt={product.name}
                />
              </td>
              <td>{product.quantity}</td>
              <td>{product.status ? "Active" : "Inactive"}</td>
              <td>{product.isFeatured ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => navigate(`edit/${product.id}`)}>
                  {t("edit")}
                </button>
              </td>
              <td>
                <button onClick={() => {}}>{t("delete")}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductAdmin;
