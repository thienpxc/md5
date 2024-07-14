import React, { useEffect, useState } from "react";
import "./ProductCategory.scss";

import apis from "@/apis";
import ProductDetail from "@/pages/home/ProductDetail/ProductDetail";
import { useNavigate, useParams } from "react-router-dom";
import { Category } from "@/stores/slices/category.slices";
export default function Product() {

  const navigate = useNavigate();
  const [products, setProducts] = useState<Category[]>([]);
  const [detail, setDetail] = useState(false);

  useEffect(() => {
    apis.product
      .findAllCategoryTrue()
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);
  const handleDetail = (id) => {
    setDetail(id);
    navigate(`/category/product/${id}`);
  };
  

  return (
    <div>
      <div className="products-grid">
        {products.map((product) => (
            <button onClick={() => handleDetail(product.id)
            }>
          <div className="product-card" key={product.id}>
            <div
              className="price-info"
              style={{
                
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                
              }}
            >
              <img
                src={product.image}
                alt=""
                className="product-image"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>

            <h3>{product.name}</h3>

            <div className="rating">★★★★★</div>
            <span className="like-button">♡</span>
          </div>
            </button>
        ))}
      </div>
      {detail && <ProductDetail productId={detail} />}
    </div>
  );
}
