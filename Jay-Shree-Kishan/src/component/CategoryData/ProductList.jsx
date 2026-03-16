import React, { useEffect, useState } from "react";
import "./ProductList.css";
import {
  FaPhoneAlt,
  FaCommentDots,
  FaEye,
  FaShareAlt,
  FaMapMarkerAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommentModal from "../CommentModal/CommentModal";

const ProductList = () => {
  const [activeTab, setActiveTab] = useState("buyers");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Premium Plan state
  const [hasPlan, setHasPlan] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showBuyButton, setShowBuyButton] = useState(false); // ✅ Buy Plan button state

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  // ✅ Popup function with optional Buy Plan button
  const showAlert = (msg, showButton = false) => {
    setPopupMessage(msg);
    setShowBuyButton(showButton);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setPopupMessage("");
      setShowBuyButton(false);
    }, 5000); // 5 seconds popup
  };

  useEffect(() => {
    // Example: Check premium plan from localStorage or API
    const premiumStatus = localStorage.getItem("hasPremiumPlan");
    setHasPlan(premiumStatus === "true");

    let url = `http://localhost:5000/api/products?type=${activeTab}`;
    if (selectedCategory) url += `&category=${selectedCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.products);
        else setProducts([]);
      })
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, [activeTab, selectedCategory]);

  // ✅ Call button handler
  const handleCallClick = (phoneNumber) => {
    if (hasPlan) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      showAlert(" You need a Premium Plan to make calls!", true);
    }
  };

  // ✅ Share product function
  const handleShareClick = async (product) => {
    const productURL = `${window.location.origin}/products/${product._id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.commodity,
          text: `Check out this product: ${product.commodity}`,
          url: productURL,
        });
        console.log("Product shared successfully!");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(productURL)
        .then(() => showAlert("Product link copied to clipboard!"))
        .catch((err) => console.error("Failed to copy:", err));
    }
  };

  const filteredProducts = products.filter((p) =>
    p.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search product or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="tabs">
        <button
          className={activeTab === "buyers" ? "tab active" : "tab"}
          onClick={() => setActiveTab("buyers")}
        >
          Buyers
        </button>
        <button
          className={activeTab === "sellers" ? "tab active" : "tab"}
          onClick={() => setActiveTab("sellers")}
        >
          Sellers
        </button>
      </div>

      <h2>
        {activeTab === "buyers" ? "Buyer Requirements" : "Seller Listings"}{" "}
        {selectedCategory && `for ${selectedCategory}`}
      </h2>

      {filteredProducts.length === 0 ? (
        <p>No {activeTab} available</p>
      ) : (
        <div className="cards">
          {filteredProducts.map((p) => (
            <div key={p._id} className="product-card">
              <span className="tag">
                {activeTab === "buyers" ? "Requirement" : "Promoted"}
              </span>

              <Link to={`/products/${p._id}`}>
                {p.image && (
                  <img
                    src={`http://localhost:5000/uploads/${p.image}`}
                    alt={p.commodity}
                    className="product-img"
                  />
                )}
              </Link>

              <Link to={`/products/${p._id}`}>
                <h3>
                  {p.commodity}{" "}
                  {activeTab === "buyers" ? "Required in" : "Available at"}{" "}
                  {p.district}
                </h3>
              </Link>

              <p>Price: <b>INR {p.price}</b></p>
              <p>Quantity: <b>{p.quantity}</b></p>
              <p>Type: <b>{p.type}</b></p>
              <p>Category: <b>{p.commodity}</b></p>

              <div className="user-info">
                <FaUserCircle className="icon" />
                <span className="name">{p.name}</span>
              </div>

              <div className="location">
                <FaMapMarkerAlt className="icon" />
                <span>{p.district}, {p.state}</span>
              </div>

              <div className="actions">
                <button
                  className="call-btn"
                  onClick={() => handleCallClick(p.phone || "9999999999")}
                >
                  <FaPhoneAlt /> CALL
                </button>

                <div className="meta">
                  <span>
                    <FaCommentDots /> <CommentModal productId={p._id} />
                  </span>
                  <span>
                    <FaEye /> 707 Views
                  </span>
                  <span
                    className="share-icon"
                    onClick={() => handleShareClick(p)}
                    style={{ cursor: "pointer" }}
                  >
                    <FaShareAlt className="share-img" /> 
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-message">
            {popupMessage}
            {showBuyButton && (
              <button
                className="buy-plan-btn"
                onClick={() => navigate("/trendingPrices")}
              >
                 Buy Premium Plan
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
