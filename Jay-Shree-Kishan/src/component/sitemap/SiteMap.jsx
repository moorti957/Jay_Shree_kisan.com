import React, { useEffect, useState } from "react";
import { FaHome, FaArrowUp } from "react-icons/fa";
import "./SiteMap.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SiteMap = () => {
  const [showScroll, setShowScroll] = useState(false);
  

  // Show button after scrolling
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 300) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 300) {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="sitemap-wrapper">
      <div className="sitemap-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to='/' ><FaHome  className="home-icon" /></Link>
          <span className="divider">|</span>
          <span className="active">Site Map</span>
        </div>

        {/* Page Title */}
        <h2 className="sitemap-title">Site Map</h2>

        {/* Main Content */}
        <div className="sitemap-content">
          {/* Left Side */}
          <div className="sitemap-left">
            <ol>
              <li>Meats & Sea Foods</li>
              <li>Breads & Bakery</li>
              <li>
                Breakfast & Dairy
                <ol>
                  <li>Apple
                    <ol>
                      <li>Banana</li>
                      <li>Food</li>
                    </ol>
                  </li>
                  <li>Fruits
                    <ol>
                      <li>Juice</li>
                      <li>Mango</li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                Fruits & Juice
                <ol>
                  <li>Lemon Juices
                    <ol>
                      <li>Garlic</li>
                      <li>Orange</li>
                    </ol>
                  </li>
                  <li>Mango Juices
                    <ol>
                      <li>Cherry</li>
                      <li>Pineapple</li>
                    </ol>
                  </li>
                  <li>Orange Juice
                    <ol>
                      <li>Apple</li>
                      <li>Mango</li>
                    </ol>
                  </li>
                  <li>Organic
                    <ol>
                      <li>Strawberry</li>
                      <li>Watermelon</li>
                    </ol>
                  </li>
                  <li>Apple Juices
                    <ol>
                      <li>Banana</li>
                      <li>Kiwi</li>
                    </ol>
                  </li>
                  <li>Fresh Fruits
                    <ol>
                      <li>Chiku</li>
                      <li>Fruits</li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>Grocery & Staples</li>
              <li>Fruits & Vegetables</li>
            </ol>
          </div>

          {/* Right Side */}
          <div className="sitemap-right">
            <ol>
              <li>Special Offers</li>
              <li>
                My Account
                <ol>
                  <li>Account Information</li>
                  <li>Password</li>
                  <li>Address Book</li>
                  <li>Order History</li>
                  <li>Downloads</li>
                </ol>
              </li>
              <li>Shopping Cart</li>
              <li>Checkout</li>
              <li>Search</li>
              <li>
                Information
                <ol>
                  <li>About Us</li>
                  <li>Delivery Information</li>
                  <li>Privacy Policy</li>
                  <li>Terms & Conditions</li>
                  <li>Contact Us</li>
                </ol>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button className="scrollTop" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default SiteMap;
