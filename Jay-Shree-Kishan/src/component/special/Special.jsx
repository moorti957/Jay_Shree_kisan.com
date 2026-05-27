import React, { useState } from "react";
import "./Special.css";
import special from "../../assets/Jay Shree Kisan-1.png";
import special_1 from "../../assets/Jay Shree Kisan-2.png";
import special_2 from "../../assets/Jay Shree Kisan-3.png";
import special_3 from "../../assets/Jay Shree Kisan-4.png";
import special_4 from "../../assets/Jay Shree Kisan.png";

import {
  FaThLarge,
  FaList,
  FaShoppingCart,
  FaHeart,
  FaBalanceScale,
  FaEye,
} from "react-icons/fa";

const Special = () => {
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("default");

  const products = [
    {
      _id: 1,
      commodity: "Chakki Fresh Wheat Atta — Fortified",
      category: "Anaaj",
      description:
        "Premium quality wheat atta, ultra-soft, rich in nutrients and fortified for better health.",
      price: 50,
      oldPrice: 120,
      discount: 96,
      rating: 5,
      reviews: 128,
      image: special,
    },
    {
      _id: 2,
      commodity: "Coriander Leaves — Organically Grown",
      category: "Herbs",
      description:
        "Organically grown fresh coriander leaves, rich aroma and natural taste.",
      price: 110,
      oldPrice: 240,
      discount: 55,
      rating: 4,
      reviews: 84,
      image: special_1,
    },
    {
      _id: 3,
      commodity: "Organic Cold Pressed Sunflower Oil",
      category: "Tels",
      description:
        "Pure and organic cold-pressed sunflower oil, ideal for healthy cooking.",
      price: 180,
      oldPrice: 300,
      discount: 40,
      rating: 5,
      reviews: 201,
      image: special_2,
    },
    {
      _id: 4,
      commodity: "Fresh Organic Corn — Direct from Farm",
      category: "Sabzi",
      description:
        "Juicy and sweet organic corn harvested fresh from verified farms.",
      price: 180,
      oldPrice: 300,
      discount: 40,
      rating: 4,
      reviews: 67,
      image: special_3,
    },
    {
      _id: 5,
      commodity: "Premium Toor Dal — Sun Dried Natural",
      category: "Daalein",
      description:
        "High protein sun-dried toor dal, directly sourced from Maharashtra farms.",
      price: 180,
      oldPrice: 300,
      discount: 40,
      rating: 5,
      reviews: 143,
      image: special_4,
    },
    {
      _id: 6,
      commodity: "Organic Cold Pressed Mustard Oil",
      category: "Tels",
      description:
        "Traditional cold-pressed mustard oil, 100% natural with no additives.",
      price: 180,
      oldPrice: 300,
      discount: 40,
      rating: 4,
      reviews: 95,
      image: special_2,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? "★" : "☆"
    ).join("");
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "lh") return a.price - b.price;
    if (sort === "hl") return b.price - a.price;
    return 0;
  });

  return (
    <div className="sp-wrap">

      {/* Hero Header */}
      <div className="sp-head">
        <div className="sp-pill">
          <span className="sp-pill-dot"></span>
          Sirf Aaj Ke Liye
        </div>
        <h2 className="sp-title">
          Special <span>Offers</span>
        </h2>
        <p className="sp-sub">Taaze khet ke utpaadon par bemisaal chhuut — sirf aaj!</p>
      </div>

      {/* Controls Bar */}
      <div className="sp-bar">
        <div className="sp-bar-left">
          <span className="sp-count-chip">{products.length} Products Mile</span>
        </div>
        <div className="sp-bar-right">
          <select
            className="sp-sel"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="lh">Price: Kam se Zyada</option>
            <option value="hl">Price: Zyada se Kam</option>
          </select>
          <select className="sp-sel">
            <option>Show: 15</option>
            <option>30</option>
            <option>50</option>
          </select>
          <div className="sp-vbtns">
            <button
              className={`sp-vbtn ${view === "grid" ? "on" : ""}`}
              onClick={() => setView("grid")}
              title="Grid view"
            >
              <FaThLarge />
            </button>
            <button
              className={`sp-vbtn ${view === "list" ? "on" : ""}`}
              onClick={() => setView("list")}
              title="List view"
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid / List */}
      <div className={`sp-container ${view}`}>
        {sortedProducts.length === 0 ? (
          <p className="sp-empty">Koi special offer uplabdh nahi hai.</p>
        ) : (
          sortedProducts.map((p, index) => (
            <div
              key={p._id}
              className="sp-card"
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              {/* Discount Badge */}
              {p.discount && (
                <span className="sp-badge">{p.discount}% OFF</span>
              )}

              {/* Image */}
              <div className="sp-img-box">
                <img src={p.image} alt={p.commodity} className="sp-img" />
                <div className="sp-overlay-strip"></div>
              </div>

              {/* Body */}
              <div className="sp-body">
                <span className="sp-cat">{p.category}</span>
                <h3 className="sp-name">{p.commodity}</h3>
                <div className="sp-stars">
                  {renderStars(p.rating)}
                  <span>({p.reviews} reviews)</span>
                </div>
                <p className="sp-desc">{p.description}</p>
                <div className="sp-pr">
                  <span className="sp-new-p">₹{p.price}</span>
                  {p.oldPrice && (
                    <span className="sp-old-p">₹{p.oldPrice}</span>
                  )}
                </div>
                <div className="sp-div"></div>
                <div className="sp-acts">
                  <button className="sp-cart">
                    <FaShoppingCart /> Cart Mein Dalo
                  </button>
                  <button className="sp-ico sp-heart" title="Wishlist">
                    <FaHeart />
                  </button>
                  <button className="sp-ico" title="Compare">
                    <FaBalanceScale />
                  </button>
                  <button className="sp-ico" title="Quick View">
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