import React, { useState } from "react";
import "./Categories.css";
import Features from "../category/Category";
import { categories } from "../../assets/assets";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredCategories = categories.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Features />
      <div className="srch">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch className="icn" />
      </div>
      <div className="category-container">
        {[...filteredCategories].sort((a, b) => a.localeCompare(b)).map((item, index) => (
          <button
            key={index}
            className="category-btn"
            onClick={() => navigate(`/products/category/${item}`)}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
};

export default CategoryPage;
