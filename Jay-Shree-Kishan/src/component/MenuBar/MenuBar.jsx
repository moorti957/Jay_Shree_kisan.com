import React, { useState } from "react";
import "./MenuBar.css";
import { FaGift, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import FestivalGiftOffers from "../FestivalGiftOffers/FestivalGiftOffers"; // ✅ import here

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // ✅ popup state

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  return (
    <nav className="menu-bar">
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`menu-links ${isOpen ? "active" : ""}`}>
        <li className="dropdown">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            All Categories ▾
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li><Link to='/productpage'>Vegetables and Fruits</Link></li>
              <li>Breads & Bakery</li>

              <li className="sub-dropdown">
                <button onClick={() => toggleSubmenu("breakfast")}>
                  Breakfast & Dairy ▸
                </button>
                {activeSubmenu === "breakfast" && (
                  <ul className="sub-menu">
                    <li>Milk</li>
                    <li>Butter</li>
                    <li>Cheese</li>
                  </ul>
                )}
              </li>

              <li className="sub-dropdown">
                <button onClick={() => toggleSubmenu("fruits")}>
                  Fruits & Juice ▸
                </button>
                {activeSubmenu === "fruits" && (
                  <ul className="sub-menu">
                    <li>Apple Juice</li>
                    <li>Mango Juice</li>
                    <li>Fresh Fruits</li>
                  </ul>
                )}
              </li>

              <li>Fruits & Vegetables</li>
            </ul>
          )}
        </li>

        <li><Link to="/">Home</Link></li>
        <li><Link to='/special'>Specials</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to='/siteMap'>Sitemap</Link></li> 
        <li><Link to='/brandPage'>Brand</Link></li> 
      </ul>

      <div className="product-header">
        <div className="product-options">
          <select>
            <option>Buyers</option>
            <option>Sellers</option>
          </select>
          <select>
            <option>Language</option>
            <option>English</option>
            <option>Hindi</option>
            <option>Gujarati</option>
          </select>
        </div>
      </div>

      {/* 🎁 Gift Button — this opens popup */}
      <button className="gift-btn" onClick={() => setIsPopupOpen(true)}>
        <FaGift className="gift-icon" /> Festival Gift Offers
      </button>

      {/* 🎉 Popup Component */}
      <FestivalGiftOffers
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </nav>
  );
};

export default MenuBar;
