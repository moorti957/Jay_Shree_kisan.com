import React, { useEffect, useState } from "react";
import "./SiteMap.css";
import { FaHome, FaArrowUp, FaDrumstickBite, FaTint, FaUser, FaTag, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const sitemapData = [
  {
    id: 1,
    icon: <FaDrumstickBite />,
    title: "Shop Categories",
    items: [
      { label: "Meats & Sea Foods" },
      { label: "Breads & Bakery" },
      {
        label: "Breakfast & Dairy",
        children: ["Apple", "Banana", "Fruits", "Food"],
      },
      { label: "Grocery & Staples" },
      { label: "Fruits & Vegetables" },
    ],
  },
  {
    id: 2,
    icon: <FaTint />,
    title: "Fruits & Juice",
    items: [
      { label: "Lemon Juices", children: ["Garlic", "Orange"] },
      { label: "Mango Juices", children: ["Cherry", "Pineapple"] },
      { label: "Orange Juice", children: ["Apple", "Mango"] },
      { label: "Organic", children: ["Strawberry", "Watermelon"] },
      { label: "Apple Juices", children: ["Banana", "Kiwi"] },
      { label: "Fresh Fruits", children: ["Chiku", "Fruits"] },
    ],
  },
  {
    id: 3,
    icon: <FaUser />,
    title: "My Account",
    items: [
      { label: "Account Information" },
      { label: "Password" },
      { label: "Address Book" },
      { label: "Order History" },
      { label: "Downloads" },
    ],
  },
  {
    id: 4,
    icon: <FaTag />,
    title: "Quick Links",
    items: [
      { label: "Special Offers" },
      { label: "Shopping Cart" },
      { label: "Checkout" },
      { label: "Search" },
    ],
  },
  {
    id: 5,
    icon: <FaInfoCircle />,
    title: "Information",
    items: [
      { label: "About Us" },
      { label: "Delivery Information" },
      { label: "Privacy Policy" },
      { label: "Terms & Conditions" },
      { label: "Contact Us" },
    ],
  },
];

const SiteMap = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="sm-wrap">

      {/* Breadcrumb */}
      <div className="sm-bread">
        <Link to="/" className="sm-bread-home">
          <FaHome className="sm-bread-icon" /> Home
        </Link>
        <span className="sm-bread-sep">|</span>
        <span className="sm-bread-current">Site Map</span>
      </div>

      {/* Hero Header */}
      <div className="sm-top">
        <div className="sm-pill">
          <span className="sm-dot"></span>
          Navigation Guide
        </div>
        <h1 className="sm-title">
          Site <span>Map</span>
        </h1>
        <p className="sm-sub">
          A complete overview of all pages and categories on our website
        </p>
      </div>

      {/* Cards Grid */}
      <div className="sm-grid">
        {sitemapData.map((section) => (
          <div key={section.id} className="sm-card">
            <div className="sm-card-head">
              <div className="sm-card-icon">{section.icon}</div>
              <span className="sm-card-title">{section.title}</span>
            </div>
            <ul className="sm-list">
              {section.items.map((item, idx) => (
                <li key={idx} className="sm-list-item">
                  {item.label}
                  {item.children && (
                    <ul className="sm-sublist">
                      {item.children.map((child, cidx) => (
                        <li key={cidx}>{child}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Scroll to Top */}
      {showScroll && (
        <button className="sm-scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default SiteMap;