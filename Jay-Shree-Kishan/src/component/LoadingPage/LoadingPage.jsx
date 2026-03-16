import React from "react";
import "./LoadingPage.css";

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <h2 className="loading-logo">
        <span className="green">Jay</span> Shree Kisan<span className="dot">.</span>
      </h2>
      <div className="spinner"></div>
      <p className="loading-text">Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;
