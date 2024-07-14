import { StoreType } from "@/stores/slices";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form, Select } from "antd";

export default function OrderHistory() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const dispatch = useDispatch();
  const orderStore = useSelector((store: StoreType) => store.orderStore);

  const showModal = (details) => {
    setOrderDetails(details); // Lưu thông tin chi tiết đơn hàng vào state
    setIsModalVisible(true); // Hiển thị modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Ẩn modal
  };

  const showUpdateModal = (id) => {
    console.log(id);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const handleSubmit = () => {
    updateOrderStatus(selectedStatus); // Giả sử bạn có một hàm để cập nhật trạng thái đơn hàng
    setIsUpdateModalVisible(false);
  };
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
              <th>Update</th>
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
                <td>
                  <button
                    onClick={() => {
                      showUpdateModal(order.id);
                    }}
                  >
                    Update
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
              <img src={item.productvariant.image} alt="Hình ảnh sản phẩm" />
            </div>
          ))}
        </Modal>

        <Modal
          title="Thay đổi trạng thái đơn hàng"
          visible={isUpdateModalVisible}
          onCancel={handleUpdateCancel}
          footer={[
            <Button key="back" onClick={handleUpdateCancel}>
              Đóng
            </Button>,
            <Button key="submit" type="primary" onClick={handleSubmit}>
              Lưu thay đổi
            </Button>,
          ]}
        >
          <Form>
            <Form.Item label="Trạng thái mới">
              <Select
                defaultValue={selectedStatus}
                onChange={handleStatusChange}
              >
                <Select.Option value="processing">CONFIRMED</Select.Option>
                <Select.Option value="shipped">DELIVERED</Select.Option>
                <Select.Option value="delivered">SUCCESS</Select.Option>
                <Select.Option value="cancelled">CANCEL</Select.Option>
                <Select.Option value="cancelled">DELETED</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
