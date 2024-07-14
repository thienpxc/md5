import apis from '@/apis';
import ProductDetail from '@/pages/home/ProductDetail/ProductDetail';
import { Product } from '@/stores/slices/product.slices';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProductNew() {
   const navigate = useNavigate();
  const [newProduct, setNewProduct] = React.useState<Product[]>([]);
    const [detail, setDetail] = useState(false);
   useEffect(() => {
     apis.product.newProduct().then((res) => {
       setNewProduct(res.data);
       console.log("category", res.data);
     });
   }, []);

    const handleDetail = (id) => {
      setDetail(id);
      navigate(`/detail/${id}`);
    };
  return (
    <>
      <div className="products-grid">
        {newProduct.map((product) => (
          <div className="product-card" key={product.id}>
            {product.productImg && product.productImg[0] && (
              <button onClick={() => handleDetail(product.id)}>
                <img
                  key={product.productImg[0].id}
                  src={product.productImg[0].images}
                  alt="Hình ảnh sản phẩm"
                />
              </button>
            )}
            <h3>{product.name}</h3>
            <div className="price-info">
              <>
                <span className="current-price" key={product.id}>
                  {product.price ? product.price.toLocaleString() : "0"} đ
                </span>
                <span className="old-price">18,990,000đ</span>
              </>
            </div>
            <div className="discount-badge">Giảm 20%</div>
            <div className="installment-badge">Trả góp 0%</div>
            <p className="product-pay">
              Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...
            </p>

            <div className="rating">★★★★★</div>
            <span className="like-button">♡</span>
          </div>
        ))}
      </div>
      {detail && <ProductDetail productId={detail} />}
    </>
  );
}
