import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./ProductDetail.scss";
import { useTranslation } from "react-i18next";
import apis from "@/apis";
import {  useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/stores";
import { orderActions } from "@/stores/slices/order.slice";
import { showToast } from "@/util/toast";


const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  
  const [showProduct, setShowProduct] = useState<any>(false);
  const userStore = useSelector((store: StoreType) => {
    return store.userStore;
  });
  useEffect(() => {
    apis.product
      .getProductById(productId ?? "")
      .then((res) => {
        setShowProduct(res.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [productId]);
  
 

  // const handlePurchase = (id: any) => {
  //   const cart = {
  //     product: {
  //       id: productId,
  //     },
  //     user: userStore.data,

  //     quantity: 1,
  //     productVariant: { id: selectedImageId },
  //   };
  //   console.log(selectedImageId);
  //   apis.cart
  //     .addCart(cart)
  //     .then((res) => {
  //       console.log(res.data);
  //       navigate("/cart");
  //     })
  //     .catch((err) => {
  //       console.error("There was an error!", err);
  //     });
  //   console.log(id);
  //   selectedImageId;
  //   console.log(selectedImageId);
  // };

  const { t } = useTranslation();
  if (!showProduct) return <div>Loading...</div>;
  return (
    <>
      <div className="product-page">
        <div id="fui-toast"></div>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            color: "#ff3b30",
          }}
        >
          <HomeIcon />
          {t("home")}
        </Link>

        <h1>
          {showProduct.name}
          <span className="rating">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} sx={{ color: "#ffd700" }} />
            ))}
            184 đánh giá
          </span>
        </h1>

        <div className="line"></div>

        <div className="product-content">
          <div className="product-image-container">
            <FavoriteIcon className="heart-icon" sx={{ color: "#ff3b30" }} />
            <div className="product-image-slider">
              {showProduct.productImg.map((variantImg: any) => (
                <img
                  key={variantImg.id}
                  src={variantImg.images}
                  alt="Hình ảnh sản phẩm"
                />
              ))}
            </div>

            <div className="thumbnail-container">
              {showProduct.productImg.map((variantImg: any, index: any) => (
                <img
                  key={`thumb-${variantImg.id}`}
                  src={variantImg.images}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail"
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <p>{t("color")}</p>
            <div className="color-options">{showProduct.description}</div>
            <div className="price-section">
              <div className="current-price">
                {showProduct.price.toLocaleString()}đ
              </div>
              <div className="old-price">18.990.000đ</div>
            </div>

            <div className="button-grid">
              <button
                className="buy-now"
                onClick={() => {
                  // Kiểm tra token
                  const token = localStorage.getItem("token"); // Giả sử token được lưu trong localStorage
                  if (!token) {
                    alert("Vui lòng đăng nhập để tiếp tục!");
                    return; // Kết thúc hàm nếu không có token
                  }

                  const data = {
                    product: showProduct.id, // ID của sản phẩm chính
                    quantity: 1,
                    price: showProduct.price,
                  };
                  apis.order
                    .addToCart(data)
                    .then((res) => {
                      console.log(res.data);
                      dispatch(orderActions.loadDataThunk() as any);
                      window.location.href = "/cart";
                    })
                    .catch((err) => {
                      console.error("There was an error!", err);
                    });
                }}
              >
                Buy Now
              </button>

              <button
                className="add-to-cart"
                onClick={() => {
                  const token = localStorage.getItem("token"); // Giả sử token được lưu trong localStorage
                  if (!token) {
                    showToast.error("Vui lòng đăng nhập để tiếp tục!");
                    return; // Kết thúc hàm nếu không có token
                  }
                  const data = {
                    product: showProduct.id, // ID của sản phẩm chính
                    quantity: 1,
                    price: showProduct.price,
                  };
                  apis.order
                    .addToCart(data)
                    .then((res) => {
                      console.log(res.data);
                      dispatch(orderActions.loadDataThunk() as any);

                      showToast.success("Thêm vào giỏ hàng thành công");
                    })
                    .catch((err) => {
                      console.error("There was an error!", err);
                    });
                }}
                style={{ textDecoration: "none", color: "red" }}
              >
                <ShoppingCartIcon /> {t("addcart")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* detail --------------------------------------------------------------------------*/}
      {/* <div className="product-details">
        <div className="features">
          <h2>{t("about")}</h2>
          <ul>
            {features
              .slice(0, showMoreFeatures ? features.length : 1)
              .map((feature, index) => (
                <li key={index}>
                  <img
                    src={feature.image}
                    style={{
                      width: "750px",
                    }}
                  ></img>
                  <p>{feature.text}</p>
                </li>
              ))}
          </ul>
          <Button
            style={{
              border: "1px solid #ff3b30",
              color: "#ff3b30",
            }}
            variant="outlined"
            onClick={() => setShowMoreFeatures(!showMoreFeatures)}
            endIcon={
              showMoreFeatures ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )
            }
          >
            {showMoreFeatures ? t("less") : t("seemore")}
          </Button>
        </div>

        <div className="specs">
          <h2>{t("detail")}</h2>
          <table>
            <tbody>
              {specs
                .slice(0, showMoreSpecs ? specs.length : 4)
                .map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.label}</td>
                    <td>{spec.value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Button
            style={{
              border: "1px solid #ff3b30",
              color: "#ff3b30",
            }}
            variant="outlined"
            onClick={() => setShowMoreSpecs(!showMoreSpecs)}
            endIcon={
              showMoreSpecs ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )
            }
          >
            {showMoreSpecs ? t("less") : t("seemore")}
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default ProductDetail;
