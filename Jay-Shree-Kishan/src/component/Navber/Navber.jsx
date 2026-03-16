import React, { useState, useContext, useEffect, useRef } from "react";
import "./Navber.css";
import { FaHeart, FaUser, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../../component/UserContext";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { user, logout } = useContext(UserContext);
  const menuRef = useRef();

  const handleSearch = () => {
    if (query.trim() === "") {
      alert("Please type something to search.");
      return;
    }
    console.log("Searching for:", query);
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const confirmLogout = () => {
    logout(); // actual logout
    setShowLogoutPopup(false);
    setShowUserMenu(false);
  };

  return (
    <div className="navbar">
      {/* Left Logo */}
      <div className="navbar-left">
        <h2 className="logo">
          <Link to="/">
            <span className="logo-green">Jay</span> Shree Kisan
            <span className="dot">.</span>
          </Link>
        </h2>
      </div>

      {/* Search Box */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Right Icons */}
      <div className="navbar-right">
        {/* Wishlist */}
        <div className="icon-box">
          <FaHeart className="icon" />
          <span className="count">0</span>
        </div>

        {/* User / Account */}
        <div className="account" ref={menuRef}>
          {user ? (
            <>
              <FaUser
                className="icon user-icon"
                onClick={() => setShowUserMenu(!showUserMenu)}
              />
              {showUserMenu && (
                <div className="user-menu">
                  <p className="username">Hi, {user.username}</p>

                  <Link to="/my-products" className="menu-item">
                    My Products
                  </Link>
                  <Link to="/buySellForm" className="menu-item">
                    List Your Product
                  </Link>
                  <Link to="/my-requirements" className="menu-item">
                    My Requirements
                  </Link>
                  <Link to="/post-requirement" className="menu-item">
                    Post Your Buy Requirement
                  </Link>
                  <Link to="/account" className="menu-item">
                    My Account
                  </Link>
                  <Link to="/my-activity" className="menu-item">
                    My Activity
                  </Link>

                  <button
                    className="menu-item logout-btn"
                    onClick={() => setShowLogoutPopup(true)}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/signIn" className="menu-item sign-btn">
              Sign In
            </Link>
          )}
        </div>

        {/* Cart */}
        <div className="icon-box">
          <FaShoppingCart className="icon" />
          <span className="count">0</span>
          <span className="cart-text">
            My Cart <br />
            <span className="highlight">$0.00</span>
          </span>
        </div>
      </div>

      
      {showLogoutPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Logout Confirmation</h3>
            <p>Are you sure you want to logout?</p>
            <div className="popup-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowLogoutPopup(false)}
              >
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
