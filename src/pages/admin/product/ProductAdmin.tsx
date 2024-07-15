import React, { useEffect, useState } from "react";
import "../category/category.scss";
import "./product.scss";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import { StoreType, useAppDispatch } from "@/stores";
import { productActions } from "@/stores/slices/product.slices";

import { showToast } from "@/util/toast";

import { Pagination } from "@mui/material";
import apis from "@/apis";
import { debounce } from "lodash";


const ProductAdmin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const productStore = useSelector((store: StoreType) => store.productsStore);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);
  const limit = 3;

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    apis.product.paginationProduct(offset, limit).then((response) => {
      console.log("Category data:", response.data);
      const newData = productStore.data?.slice(offset, offset + limit) ?? [];
      setCurrentPageData(newData);
    });
  }, [currentPage, productStore.data]);

  const totalPage = Math.ceil((productStore.data?.length ?? 0) / limit);
  const handlePageChange = (event: any, page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  //search category (su dung debounce cua lodash)
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // Kiểm tra xem có kết quả tìm kiếm không, nếu có thì hiển thị kết quả tìm kiếm, nếu không thì hiển thị dữ liệu trang hiện tại
  const dataToShow = searchResult.length > 0 ? searchResult : currentPageData;

  const performSearch = () => {
    debouncedSearch(search);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const debouncedSearch = debounce((value: string) => {
    console.log("Debounced search called with value:", value);
    if (value === "") {
      setSearchResult([]);
    } else {
      apis.product
        .searchProduct(value)
        .then((response) => {
          console.log("Search API response:", response);
          setSearchResult(response.data);
        })
        .catch((error) => {
          console.error("Error searching category:", error);
        });
    }
  }, 300);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

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

      <div id="fui-toast"></div>

      <div className="search-bar">
        <h1>{t("category")}</h1>
        <div>
          <input
            type="text"
            placeholder="Search for category"
            value={search}
            onChange={handleInputChange}
          />
          <button
            onClick={performSearch}
            style={{
              marginLeft: "10px",
              padding: "5px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              height: "40px",
            }}
          >
            Tìm kiếm
          </button>
        </div>
      </div>

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
          {dataToShow.map((product) => (
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
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
              <td>{product.quantity}</td>
              <td>{product.status ? "Active" : "Inactive"}</td>
              <button
                onClick={() => {
                  apis.product
                    .updateProductIsFeatured(product.id, {
                      isFeatured: !product.isFeatured,
                    })
                    .then(() => {
                      // Gọi lại dữ liệu sau khi cập nhật thành công
                      dispatch(productActions.findDataThunk());
                      // Hiển thị thông báo thành công cho người dùng
                      showToast.success(
                        "Cập nhật trạng thái sản phẩm thành công"
                      );
                    })
                    .catch((error) => {
                      // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi
                      showToast.error(
                        "Có lỗi xảy ra khi cập nhật trạng thái sản phẩm"
                      );
                    });
                }}
              >
                <td> {product.isFeatured ? "Mở" : "Không"}</td>
              </button>
              <td>
                <button onClick={() => navigate(`edit/${product.id}`)}>
                  {t("edit")}
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    apis.product
                      .updateProductStatus(product.id, {
                        status: !product.status,
                      })
                      .then(() => {
                        dispatch(productActions.findDataThunk());
                      });
                  }}
                >
                  {t("delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        count={totalPage} // Use the calculated total pages
        page={currentPage} // Current page
        onChange={handlePageChange} // Handle page change
        shape="rounded"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};

export default ProductAdmin;
