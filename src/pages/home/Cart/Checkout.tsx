import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/stores"; // Giả sử đường dẫn này là đúng

import "./Cart.scss";
// import { showToast } from "@/util/toast";
// import apis from "@/apis";
import { useNavigate } from "react-router-dom";
// import { orderActions } from "@/stores/slices/order.slice";
import { getShippingFee } from "@/apis/modules/apighn";
import {
  Address,
  AddressCreate,
  District,
  Provine,
  Ward,
} from "@/stores/slices/user.slices";
import apis from "@/apis";

export default function Checkout() {
  const userStore = useSelector((store: StoreType) => store.userStore.data);

  const orderStore = useSelector((store: StoreType) => store.orderStore);

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adddressId, setAddressId] = React.useState<number>(
    undefined ?? 0
  );
  const [provineList, setProvineList] = React.useState<Provine[]>([]);
  const [provine, setProvine] = React.useState<Provine | null>(null);

  useEffect(() => {
    apis.address.findProvine().then((res) => {
      setProvineList(res.data.data);
    });
  }, []);

  const [districtList, setDistrictList] = React.useState<District[]>([]);
  const [district, setDistrict] = React.useState<District | null>(null);
  useEffect(() => {
    if (provine) {
      apis.address.findDistrict(provine.ProvinceID).then((res) => {
        setDistrictList(res.data.data);
      });
    }
  }, [provine]);

  const [wardList, setWardList] = React.useState<Ward[]>([]);
  const [ward, setWard] = React.useState<Ward | null>(null);

  useEffect(() => {
    console.log("district", district);
    if (district) {
      apis.address.findWard(district.DistrictID).then((res) => {
        console.log("res", res);
        setWardList(res.data.data);
      });
    }
  }, [district]);

  const [addresses, setAddresses] = React.useState<Address[]>([]);
  const [reload, setReload] = React.useState(false);
  useEffect(() => {
    apis.address.findByUser().then((res) => {
      setAddresses(res.data);
    });
  }, [reload]);
  return (
    <div className="checkout-container">
      <div id="fui-toast"></div>
      <h2 className="checkout-title">Checkout</h2>
      <div className="user-info">
        <h3>Thông tin khách hàng</h3>
        <p>Tên: {userStore?.userName}</p>
        <p>Email: {userStore?.email}</p>
        <p>Số điện thoại: {userStore?.phone}</p>
      </div>
      <select
        onChange={(e) => {
          setAddressId(+e.target.value);
        }}
        value={adddressId}
      >
        <option value={undefined}>Chọn đỉa chỉ</option>
        {addresses?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title} - {item.detail} - {item.ProvinceName} -{" "}
            {item.DistrictName} - {item.WardName}
          </option>
        ))}
      </select>
      <div className="shipping-info">
        <h3>Thông tin nhận hàng</h3>

        {/* Tỉnh / Thành */}
        <select
          onChange={(e) => {
            setProvine(
              provineList.find((item) => item.ProvinceID === +e.target.value) ||
                null
            );
          }}
        >
          <option value={undefined}>Chọn Tỉnh/Thành Phố</option>
          {provineList.map((item) => (
            <option key={item.ProvinceID} value={item.ProvinceID}>
              {item.ProvinceName}
            </option>
          ))}
        </select>
        {/* Quận / Huyện */}
        <select
          onChange={(e) => {
            setDistrict(
              districtList.find(
                (item) => item.DistrictID === +e.target.value
              ) || null
            );
          }}
        >
          <option value={undefined}>Chọn Quận / Huyện</option>
          {districtList.map((item) => (
            <option key={item.DistrictID} value={item.DistrictID}>
              {item.DistrictName}
            </option>
          ))}
        </select>
        {/* Xã Phường */}
        <select
          onChange={(e) => {
            setWard(
              wardList.find((item) => item.WardCode === e.target.value) || null
            );
          }}
        >
          <option value={undefined}>Chọn Xã / Phường</option>
          {wardList.map((item) => (
            <option key={item.WardCode} value={item.WardCode}>
              {item.WardName}
            </option>
          ))}
        </select>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nhập tên người nhận"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          id="detail"
          name="detail"
          placeholder="Nhập địa chỉ cụ thể"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        <input
          type="number"
          id="phone"
          name="phone"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Nhập tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <button
        onClick={() => {
          if (provine === null || district === null || ward === null) return;
          const newAddress: AddressCreate = {
            detail: detail,
            phone: phone,
            name: name,
            title: title,
            provinceID: provine?.ProvinceID || 0,
            provinceName: provine?.ProvinceName || "",
            districtID: district?.DistrictID || 0,
            districtName: district?.DistrictName || "",
            wardCode: ward?.WardCode || "",
            wardName: ward?.WardName || "",
          };
          console.log("newAddress", newAddress);

          apis.address.create(newAddress).then((res) => {
            console.log(res);
            setReload(!reload);
          });
        }}
      >
        Thêm Địa Chỉ
      </button>

      {orderStore.cart && (
        <div className="cart-info">
          <h3>Giỏ hàng</h3>
          <ul>
            {orderStore.cart.details.map((item) => (
              <li key={item.id}>
                {item.productmodel.name} - <br />
                Số lượng: {item.quantity}
                <br />
                {item.productmodel.productImg &&
                  item.productmodel.productImg.length > 0 && (
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
          <p className="total-price">
            Tổng cộng: {orderStore.cart.totalPrices.toLocaleString()}đ
          </p>
        </div>
      )}
      <button
        className="checkout-button"
        onClick={() => {
          apis.order
            .checkOut({
              addressId: adddressId,
              id: orderStore.cart?.id || 0,
              total:
                orderStore.cart?.details?.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                ) || 0,
            })
            .then((res) => {
              console.log(res);
              window.location.href = "/";
            }).catch((err) => {
              console.error("There was an error!", err);
            });
        }}
      >
        Đặt Hàng
      </button>
    </div>
  );
}
