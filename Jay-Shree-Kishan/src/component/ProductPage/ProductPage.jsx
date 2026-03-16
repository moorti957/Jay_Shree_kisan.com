import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import {
  FaList,
  FaThLarge,
  FaShoppingCart,
  FaHeart,
  FaBalanceScale,
} from "react-icons/fa";

const ProductPage = () => {
  const [view, setView] = useState("grid"); // grid or list
  const [selectedFilters, setSelectedFilters] = useState({
    size: [],
    color: [],
  });
  const [products, setProducts] = useState([]);

  // ✅ Backend se products fetch karo
  useEffect(() => {
    fetch("http://localhost:5000/api/products") // yaha pe apna API endpoint dalna
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, []);

  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => {
      const alreadySelected = prev[type].includes(value);
      return {
        ...prev,
        [type]: alreadySelected
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      };
    });
  };

  return (
    <div className="product-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3 className="sidebar-title">CATEGORY</h3>
        <ul className="category-list">
          <li className="active">vegetables and fruits (9)</li>
          <li>Breads & Bakery (4)</li>
          <li>Breakfast & Dairy (7)</li>
          <li>Fruits & Juice (9)</li>
          <li>Grocery & Staples (0)</li>
          <li>Fruits & Vegetables (4)</li>
        </ul>

        <h3 className="sidebar-title">REFINE SEARCH</h3>
        <div className="filter-group">
          <p>Size</p>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleFilter("size", "Small")}
              checked={selectedFilters.size.includes("Small")}
            />{" "}
            Small
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleFilter("size", "Medium")}
              checked={selectedFilters.size.includes("Medium")}
            />{" "}
            Medium
          </label>
        </div>

        <div className="filter-group">
          <p>Color</p>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleFilter("color", "blue")}
              checked={selectedFilters.color.includes("blue")}
            />{" "}
            Blue
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleFilter("color", "red")}
              checked={selectedFilters.color.includes("red")}
            />{" "}
            Red
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleFilter("color", "yellow")}
              checked={selectedFilters.color.includes("yellow")}
            />{" "}
            Yellow
          </label>
        </div>

        <button className="refine-btn">Refine Search</button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="product-header">
          <div className="view-toggle">
            <FaThLarge
              className={`icon ${view === "grid" ? "active" : ""}`}
              onClick={() => setView("grid")}
            />
            <FaList
              className={`icon ${view === "list" ? "active" : ""}`}
              onClick={() => setView("list")}
            />
          </div>

          <div className="product-options">
            <select>
              <option>Sort By: Default</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <select>
              <option>Show: 15</option>
              <option>30</option>
              <option>50</option>
            </select>
          </div>
        </div>

        {/* Products */}
        <div className={`product-list ${view}`}>
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className="product-card">
                {product.image && (
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.commodity}
                  />
                )}
                <div className="product-info">
                  <h4>{product.commodity}</h4>
                  <p className="price">INR {product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Category: {product.category}</p>
                  <div className="product-actions">
                    <button>
                      <FaShoppingCart />
                    </button>
                    <button>
                      <FaHeart />
                    </button>
                    <button>
                      <FaBalanceScale />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
