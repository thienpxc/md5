import React, { useState } from "react";
import "./register.scss";
import { useTranslation } from "react-i18next";


import { showToast } from "../../util/toast.ts";
import apis from "@/apis/index.ts";
import {  useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [touched, setTouched] = useState({
    userName: false,
    password: false,
    email: false,
    phone: false,
    confirmPassword: false,
  });
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    phone: "",
    confirmPassword: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    phone: "",
    email: "",
    userName: "",
    password: "",
    // Thêm state cho các lỗi khác nếu cần
  });

  // Cập nhật state dựa trên input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(t("confirmPassword"));
      return;
    }
    setIsSubmitting(true);
    try {
      //neu login k dc thi hay chech lai cai nay

      const response = await apis.register.registerUser(formData);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      console.log(response);
      showToast.success(response.data);
      

      

      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log(err);
        // Cập nhật state lỗi dựa trên phản hồi
        setErrorMessages({
          ...errorMessages,
          phone: err.response.data.phone,
          email: err.response.data.email,
          userName: err.response.data.userName,
          password: err.response.data.password,
        });
      }
      
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target; // Sửa đổi ở đây để lấy tên của trường input
    setTouched({ ...touched, [name]: true });
  };
 

  return (
    <div className="wrapper">
      <div id="fui-toast"></div>
      <div className="signup-container">
        <div className="image-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYlBwq5FHNWjCV-FMm807LHT3qPNEuzGAD0g&s"
            alt="Workspace"
          />
        </div>
        <div className="form-container">
          <h2>{t("Register")}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder={t("name")}
                value={formData.userName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errorMessages.userName ? (
                <span className="error-message" style={{ color: "red" }}>
                  {errorMessages.userName}
                </span>
              ) : touched.userName && !formData.userName ? (
                <span className="error-message" style={{ color: "red" }}>
                  {t("Please")}
                </span>
              ) : null}
            </div>
            <div className="form-group">
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder={t("number")}
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errorMessages.phone ? (
                <span className="error-message" style={{ color: "red" }}>
                  {errorMessages.phone}
                </span>
              ) : touched.phone && !formData.phone ? (
                <span className="error-message" style={{ color: "red" }}>
                  {t("Please")}
                </span>
              ) : null}
            </div>
            <div className="form-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder={t("emailenter")}
                value={formData.email}
                onChange={handleChange}
              />
              {errorMessages.email ? (
                <span className="error-message" style={{ color: "red" }}>
                  {errorMessages.email}
                </span>
              ) : touched.email && !formData.email ? (
                <span className="error-message" style={{ color: "red" }}>
                  {t("Please")}
                </span>
              ) : null}
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder={t("password")}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errorMessages.password ? (
                <span className="error-message" style={{ color: "red" }}>
                  {errorMessages.password}
                </span>
              ) : touched.password && !formData.password ? (
                <span className="error-message" style={{ color: "red" }}>
                  {t("Please")}
                </span>
              ) : null}
            </div>
            <div className="form-group">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder={t("confirm_password")}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {error && (
                <span className="error-message" style={{ color: "red" }}>
                  {error}
                </span>
              )}
              {touched.confirmPassword && !formData.confirmPassword && (
                <span className="error-message" style={{ color: "red" }}>
                  {t("Please")}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("helloo") : t("Register")}
            </button>
          </form>
          <div className="social-signup">
            <button className="social-btn github">
              <i className="fab fa-github"></i> Google
            </button>
            <button className="social-btn twitter">
              <i className="fab fa-twitter"></i> Zalo
            </button>
          </div>

          <p className="login-link">
            {t("already")}
            <a href="/login">{t("Login")}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
