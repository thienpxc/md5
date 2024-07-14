import React, { useEffect } from "react";

import "./ProductList.scss";
import ProductLayout from "@components/Product-layout/ProductLayout";
import { useTranslation } from "react-i18next";
// import apis from "@/apis";
import { useNavigate } from "react-router-dom";
import apis from "@/apis";
import { Category } from "@/stores/slices/category.slices";
import ProductNew from "@/components/productNew'/ProductNew";

function ProductList() {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState<Category[]>([]);
  
  useEffect(() => {
    apis.product.findAllCategoryTrue().then((res) => {
      setCategory(res.data);
      console.log("category", res.data);
    });
  }, []);

 

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCategory = (id: any) => {
   navigate(`/category/product/${id}`);
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="product-list">
        <h2>{t("telephone")}</h2>
        <div className="brand-filters">
          {category.map((category) => (
            <button
              key={category.id}
              className="brand-button"
              onClick={() => handleCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <ProductLayout></ProductLayout>
      </div>
      <div>
        <h2>Điện Thoại Mới </h2>

       <ProductNew></ProductNew>
      </div>
    </>
  );
}

export default ProductList;
