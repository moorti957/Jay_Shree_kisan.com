import React, { useState } from "react";
import "./Special.css";
import special from "../../assets/Jay Shree Kisan-1.png"
import special_1 from "../../assets/Jay Shree Kisan-2.png"
import special_2 from "../../assets/Jay Shree Kisan-3.png"
import special_3 from "../../assets/Jay Shree Kisan-4.png"
import special_4 from "../../assets/Jay Shree Kisan.png"


import {
  FaThLarge,
  FaList,
  FaShoppingCart,
  FaHeart,
  FaBalanceScale,
  FaEye,
} from "react-icons/fa";

const Special = () => {
  const [view, setView] = useState("grid"); // grid or list

  // 🔥 Dummy Special Products (Static Data)
  const products = [
    {
      _id: 1,
      commodity: "Chakki Fresh Wheat Atta - Fortified",
      description:
        "Premium quality wheat atta, ultra-soft, rich in nutrients and fortified for better health.",
      price: 50,
      oldPrice: 120,
      discount: 96,
      image:  special,
    },
    {
      _id: 2,
      commodity: "Coriander Leaves - Organically Grown",
      description:
        "Organically grown fresh coriander leaves, rich aroma and natural taste.",
      price: 110,
      oldPrice: 240,
      discount: 55,
      image: special_1,
    },
    {
      _id: 3,
      commodity: "Organic Cold Pressed Sunflower Oil",
      description:
        "Pure and organic cold-pressed sunflower oil, ideal for healthy cooking.",
      price: 180,
      oldPrice: 300,
      discount: 40,
      image: special_2,
    },
     {
      _id: 3,
      commodity: "Organic Cold Pressed Sunflower Oil",
      description:
        "Pure and organic cold-pressed sunflower oil, ideal for healthy cooking.",
      price: 180,
      oldPrice: 300,
      discount: 40,
      image: special_3,
    },
     {
      _id: 3,
      commodity: "Organic Cold Pressed Sunflower Oil",
      description:
        "Pure and organic cold-pressed sunflower oil, ideal for healthy cooking.",
      price: 180,
      oldPrice: 300,
      discount: 40,
      image: special_4,
    },
     {
      _id: 3,
      commodity: "Organic Cold Pressed Sunflower Oil",
      description:
        "Pure and organic cold-pressed sunflower oil, ideal for healthy cooking.",
      price: 180,
      oldPrice: 300,
      discount: 40,
      image: special_2,
    },
  ];

  return (
    <div className="special-offers">
      <h2 className="title">Special Offers</h2>

      {/* Header Controls */}
      <div className="offers-header">
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

        <div className="options">
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
      <div className={`offers-list ${view}`}>
        {products.length === 0 ? (
          <p>No special offers available</p>
        ) : (
          products.map((p) => (
            <div key={p._id} className="offer-card">
              {/* Discount Badge */}
              {p.discount && <span className="discount">{p.discount}%</span>}

              {/* Product Image */}
              <img src={p.image} alt={p.commodity} className="product-img" />

              {/* Product Info */}
              <div className="offer-info">
                <h3>{p.commodity}</h3>
                <p className="desc">{p.description}</p>

                <div className="price-section">
                  <span className="new-price">₹{p.price}</span>
                  {p.oldPrice && (
                    <span className="old-price">₹{p.oldPrice}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="actions">
                  <button>
                    <FaShoppingCart />
                  </button>
                  <button>
                    <FaHeart />
                  </button>
                  <button>
                    <FaBalanceScale />
                  </button>
                  <button>
                    <FaEye />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Special;
