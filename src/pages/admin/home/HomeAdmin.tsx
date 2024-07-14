import React, { useEffect, useState } from "react";
import "./home.scss"; // Đảm bảo bạn tạo file CSS riêng
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormControl, MenuItem, Select } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useSelector } from "react-redux";
import { StoreType } from "@/stores";
import { Role } from "@/stores/slices/user.slices";

interface Menu {
  title: string;
  url: string;
}

const HomeAdmin: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("admin");
  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter)};
  //translate
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  useEffect(() => {
    const currentLanguage = localStorage.getItem("lng") || "vi";
    setSelectedLanguage(currentLanguage);
    i18n.changeLanguage(currentLanguage);
  }, [i18n]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLanguageChange = (event: any) => {
    const newLanguage = event.target.value;
    localStorage.setItem("lng", newLanguage);
    i18n.changeLanguage(newLanguage);
    setSelectedLanguage(newLanguage);
  };

  //goi store de lay thong tin user
  const userStore = useSelector((store: StoreType) => {
    return store.userStore;
  });

  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {

    const menuTemp: Menu[] = [];

    if (userStore.data?.permission?.includes("admin")) {
      menuTemp.push({
        title: "Admin Manager",
        url: "admin",
      });
    }

     if (userStore.data?.permission?.includes("category")) {
       menuTemp.push({
         title: "Category Manager",
         url: "category",
       });
     }
     if (userStore.data?.permission?.includes("product")) {
       menuTemp.push({
         title: "product Manager",
         url: "product",
       });
     }

     if (userStore.data?.permission?.includes("order")) {
       menuTemp.push({
         title: "order Manager",
         url: "order/all",
       });
     }

     if (userStore.data?.permission?.includes("user")) {
       menuTemp.push({
         title: "User Manager",
         url: "user",
       });
     }

     setMenus(menuTemp);
    
  }, [userStore.data]);

  useEffect(() => {
    if (!userStore.loading) {
      if (userStore.data?.role != Role.ADMIN) {
        window.location.href = "/";
      }
    }
  }, [userStore.data, userStore.loading]);

  return (
    <>
      {userStore.data?.role == Role.ADMIN && (
        <div className="admin-home">
          <aside className="sidebar">
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                size="small"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "70px",
                  margin: "10px",
                }}
              >
                <MenuItem value="lng" defaultChecked>
                  <LanguageIcon />
                </MenuItem>
                <MenuItem value="vi">Vietnamese</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
            </FormControl>
            <div className="admin">
              <h2>{t("hello")}:</h2>
              <h3>{userStore.data?.userName}</h3>
            </div>
            <nav>
              <ul>
                {menus.map((menu, index) => (
                  <li
                    key={index} // Thêm key để cải thiện hiệu suất và tránh cảnh báo trong React
                    className={selectedFilter === menu.url ? "selected" : ""}
                    onClick={() => handleFilterClick(menu.url)} // Di chuyển onClick vào đây
                  >
                    <Link to={`/admin/${menu.url}`}>{t(menu.title)}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="main-content">
            <header className="admin-header">
              <div className="header-icons">
                <span className="theme-toggle">🌙</span>
                <span className="notifications">🔔</span>
                <span className="user-avatar">👤</span>
              </div>
            </header>

            <div className="home_page_container">
              <Outlet></Outlet>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default HomeAdmin;
