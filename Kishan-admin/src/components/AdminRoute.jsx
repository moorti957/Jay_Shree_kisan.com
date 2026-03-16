import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  // localStorage में token check करें
  const token = localStorage.getItem("adminToken");

  // अगर token नहीं है → redirect login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // अगर token है → child routes render होंगे
  return children;
};

export default AdminRoute;
