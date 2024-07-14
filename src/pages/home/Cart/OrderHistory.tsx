import { StoreType } from '@/stores/slices';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from "antd";

export default function OrderHistory() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const dispatch = useDispatch();
  const orderStore = useSelector((store: StoreType) => store.orderStore);

  const showModal = (details) => {

    setOrderDetails(details); // Lưu thông tin chi tiết đơn hàng vào state
    setIsModalVisible(true); // Hiển thị modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Ẩn modal
  };
console.log(orderDetails);
  return (
    <>
      <div>
        <h2>Your OrderHistory</h2>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Status</th>
              <th>note</th>
              <th>createDate</th>
              <th>updateDate</th>
              <th>totalPrices</th>
              <th>details</th>
            </tr>
          </thead>
          <tbody>
            {orderStore.orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.status}</td>
                <td>{order.note}</td>
                <td>{order.createDate}</td>
                <td>{order.updateDate}</td>
                <td>{order.totalPrices}</td>
                <td>
                  <button
                    onClick={() => {
                      showModal(order.details);
                    }}
                  >
                    show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          title="Thông tin chi tiết đơn hàng"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Đóng
            </Button>,
          ]}
        >
            {orderDetails?.map((item, index) => (
                <div key={index}>
                    <p>ID: {item.id}</p>
                    <p>Giá: {item.price}</p>
                    <p>Màu sắc: {item.productvariant.color}</p>
                    <p>Mô tả: {item.productvariant.description}</p>
                    <p>Số lượng: {item.quantity}</p>
                    <img
                        src={item.productvariant.image}
                        alt="Hình ảnh sản phẩm"
                    />
                </div>
            ))}
        </Modal>
      </div>
    </>
  );
}
