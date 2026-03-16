import React from "react";
import { FaGooglePlay, FaApple, FaMobileAlt } from "react-icons/fa";
import "./DownloadAppSection.css";

const DownloadAppSection = () => {
  return (
    <section className="download-section">
      <h2 className="download-title">Download Jay Shree Kisan Mobile App</h2>
      <p className="download-subtitle">
        Get all KisanDeals features on your phone — check mandi prices, buy or sell directly, and stay updated anytime, anywhere!
      </p>

      <div className="download-content">
        <div className="icon-bo1">
          <FaMobileAlt className="phone-icon" />
        </div>

        <div className="button-group">
          <button className="playstore-btn">
            <FaGooglePlay /> Download on Play Store
          </button>
          <button className="appstore-btn">
            <FaApple /> Download on App Store
          </button>
        </div>

        <ul className="feature-list">
          <li>🌾 Live mandi price updates</li>
          <li>💰 Buy or sell products online</li>
          <li>📊 Get alerts for price changes</li>
          <li>🧑‍🌾 Connect directly with farmers & traders</li>
        </ul>
      </div>
    </section>
  );
};

export default DownloadAppSection;
