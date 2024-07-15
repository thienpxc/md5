import React, { useState } from "react";
import "./PasswordChange.scss";
import apis from "@/apis";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreType } from "@/stores";

const PasswordChange: React.FC = () => {
  const userStor = useSelector((store: StoreType) => store.userStore);
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Gửi mật khẩu cũ và mới đến server để thay đổi
      const res = await apis.user.changePassword({
        oldPassword: currentPassword, // Mật khẩu cũ
        newPassword: newPassword, // Mật khẩu mới
        id: userStor.data?.id // ID người dùng, giả sử bạn đã có nó
      });
      
      console.log("da vao day", res.data);
      console.log("Update success", res.data);
      alert("Password changed successfully");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };
  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="newPassword">Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
          />
        </div>
        <button type="submit" className="submit-btn">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
