import React from "react";
import "./BrandPage.css";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const BrandPage = () => {
  return (
    <div className="containers">
     <div className="breadcrumb">
      <span className="breadcrumb-item">
        <Link to="/"><FaHome className="home-icon" /></Link>
        
      </span>
      <span className="breadcrumb-separator">|</span>
      <span className="breadcrumb-item active">Brand</span>
    </div>
    <div className="brand">
      {/* Sidebar */}
        
      <aside className="sidebar">
        <h3 className="sidebar-title">👤 ACCOUNT SETTINGS</h3>
        <ul className="sidebar-list">
          <li>Login</li>
          <li>Register</li>
          <li>Forgotten Password</li>
          <li>My Account</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="brand-main">
        <h1 className="brand-heading">Find Your Favorite Brand</h1>

        <div className="brand-index">
          <strong>Brand Index:</strong>{" "}
          <a href="#A">A</a> <a href="#C">C</a> <a href="#H">H</a>{" "}
          <a href="#P">P</a> <a href="#S">S</a>
        </div>

        <div className="brand-list">
          <div className="brand-box" id="A">
            <h4>A</h4>
            <p>Apple</p>
          </div>

          <div className="brand-box" id="C">
            <h4>C</h4>
            <p>Canon</p>
          </div>

          <div className="brand-box" id="H">
            <h4>H</h4>
            <p>Hewlett-Packard</p>
            <span>HTC</span>
          </div>

          <div className="brand-box" id="P">
            <h4>P</h4>
            <p>Palm</p>
          </div>

          <div className="brand-box" id="S">
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
