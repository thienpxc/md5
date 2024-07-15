import { StoreType } from "@/stores/slices";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form, Select } from "antd";
import apis from "@/apis";

export default function OrderHistory() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const dispatch = useDispatch();
  const [orderStore, setOrderStore] = useState([]);

  const showModal = (details) => {
    setOrderDetails(details); // Lưu thông tin chi tiết đơn hàng vào state
    setIsModalVisible(true); // Hiển thị modal
  };
 useEffect(() => {
   apis.order.findAll().then((res) => {
     console.log(res.data);
     setOrderStore(res.data);
   });
 }, []); 


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
  console.log(orderStore);
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
           
          </tbody>
        </table>

       

       
      </div>
    </>
  );
}
