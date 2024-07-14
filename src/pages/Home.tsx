import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Header from "./home/header/Header";
import Footer from "./home/footer/Footer";
import "./Home.scss";
export default function Home() {
  // const { i18n } = useTranslation();
  // const [selectedLanguage, setSelectedLanguage] = useState("");
  //   useEffect(() => {
  //     const currentLanguage = localStorage.getItem("lng") || "vi";
  //     setSelectedLanguage(currentLanguage);
  //     i18n.changeLanguage(currentLanguage);
  //   }, [i18n]);
  //   const handleLanguageChange = (event:any) => {
  //     const newLanguage = event.target.value;
  //     localStorage.setItem("lng", newLanguage);
  //     i18n.changeLanguage(newLanguage);
  //     setSelectedLanguage(newLanguage);
  //   };

  return (
    <div className="home_page">
      <div className="content_wrapper">
        <Header />
        <div className="home_page_container">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer />
    </div>
  );
}
