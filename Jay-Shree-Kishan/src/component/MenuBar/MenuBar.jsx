import React, { useState, useEffect } from "react";
import "./MenuBar.css";
import {
  FaGift,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import FestivalGiftOffers from "../FestivalGiftOffers/FestivalGiftOffers";

// ✅ Import language tools
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations/translations";

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showMenuBar, setShowMenuBar] = useState(true);

  // ✅ Global language state
  const { language, setLanguage } = useLanguage();

  // ✅ Helper function — kisi bhi text ko translate karo
  const t = (section, key) => translations[section]?.[key]?.[language] || key;

  // Scroll Show/Hide
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowMenuBar(false);
      } else {
        setShowMenuBar(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  // ✅ Language change handler
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <>
      <nav className={`menu-bar ${showMenuBar ? "show" : "hide"}`}>
        {/* Left */}
        <div className="menu-left">
          {/* Hamburger */}
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Categories */}
          <div className="category-wrapper">
            <button
              className="category-btn1"
              onClick={() => setShowCategory(!showCategory)}
            >
              {t("menu", "allCategories")} <FaChevronDown />
            </button>

            {showCategory && (
              <div className="category-dropdown">
                <Link to="/productpage">
                  {t("categories", "vegFruits")}
                </Link>

                <Link to="/">
                  {t("categories", "breadBakery")}
                </Link>

                {/* Breakfast */}
                <div className="submenu-box">
                  <button onClick={() => toggleSubmenu("breakfast")}>
                    {t("categories", "breakfastDairy")}
                    <FaChevronRight />
                  </button>

                  {activeSubmenu === "breakfast" && (
                    <div className="submenu">
                      <Link to="/">{t("categories", "milk")}</Link>
                      <Link to="/">{t("categories", "butter")}</Link>
                      <Link to="/">{t("categories", "cheese")}</Link>
                    </div>
                  )}
                </div>

                {/* Juice */}
                <div className="submenu-box">
                  <button onClick={() => toggleSubmenu("juice")}>
                    {t("categories", "fruitsJuice")}
                    <FaChevronRight />
                  </button>

                  {activeSubmenu === "juice" && (
                    <div className="submenu">
                      <Link to="/">{t("categories", "appleJuice")}</Link>
                      <Link to="/">{t("categories", "mangoJuice")}</Link>
                      <Link to="/">{t("categories", "freshFruits")}</Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Nav Links */}
          <ul className={`menu-links ${isOpen ? "active" : ""}`}>
            <li><Link to="/">{t("menu", "home")}</Link></li>
            <li><Link to="/special">{t("menu", "specials")}</Link></li>
            <li><Link to="/contact">{t("menu", "contact")}</Link></li>
            <li><Link to="/siteMap">{t("menu", "sitemap")}</Link></li>
            <li><Link to="/brandPage">{t("menu", "brands")}</Link></li>
          </ul>
        </div>

        {/* Right */}
        <div className="menu-right">
          {/* Selects */}
          <div className="product-options">
            <select>
              <option>{t("menu", "buyers")}</option>
              <option>{t("menu", "sellers")}</option>
            </select>

            {/* ✅ Language Selector — ab kaam karega */}
            <select value={language} onChange={handleLanguageChange}>
              <option value="English">English</option>
              <option value="Hindi">हिंदी</option>
              <option value="Tamil">தமிழ்</option>
              <option value="Urdu">اردو</option>
            </select>
          </div>

          {/* Gift Button */}
          <button className="gift-btn" onClick={() => setIsPopupOpen(true)}>
            <FaGift className="gift-icon" />
            {t("menu", "festivalOffers")}
          </button>
        </div>
      </nav>

      {/* Popup */}
      <FestivalGiftOffers
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
};

export default MenuBar;