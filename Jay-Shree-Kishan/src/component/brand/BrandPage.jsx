import React from "react";
import "./BrandPage.css";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const BrandPage = () => {
  return (
    <div className="brand-page-container">
      {/* Breadcrumb */}
      <div className="brand-page-breadcrumb">
        <span className="brand-page-breadcrumb-item">
          <Link to="/">
            <FaHome className="brand-page-home-icon" />
          </Link>
        </span>
        <span className="brand-page-breadcrumb-separator">|</span>
        <span className="brand-page-breadcrumb-item brand-page-active">
          Brand
        </span>
      </div>

      {/* Main Layout */}
      <div className="brand-page-layout">
        {/* Sidebar */}
        <aside className="brand-page-sidebar">
          <h3 className="brand-page-sidebar-title">👤 ACCOUNT SETTINGS</h3>
          <ul className="brand-page-sidebar-list">
            <li>Login</li>
            <li>Register</li>
            <li>Forgotten Password</li>
            <li>My Account</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="brand-page-main">
          <h1 className="brand-page-heading">Find Your Favorite Brand</h1>

          <div className="brand-page-index">
            <strong>Brand Index:</strong>{" "}
            <a href="#A">A</a> <a href="#C">C</a> <a href="#H">H</a>{" "}
            <a href="#P">P</a> <a href="#S">S</a>
          </div>

          <div className="brand-page-list">
            <div className="brand-page-box" id="A">
              <h4>A</h4>
              <p>Apple</p>
            </div>

            <div className="brand-page-box" id="C">
              <h4>C</h4>
              <p>Canon</p>
            </div>

            <div className="brand-page-box" id="H">
              <h4>H</h4>
              <p>Hewlett-Packard</p>
              <span>HTC</span>
            </div>

            <div className="brand-page-box" id="P">
              <h4>P</h4>
              <p>Palm</p>
            </div>

            <div className="brand-page-box" id="S">
              <h4>S</h4>
              <p>Sony</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrandPage;