import React, { useEffect, useState } from "react";
import {
  FaPhoneAlt, FaCommentDots, FaEye, FaShareAlt,
  FaMapMarkerAlt, FaUserCircle, FaSearch, FaCrown,
  FaTimes, FaShieldAlt,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommentModal from "../CommentModal/CommentModal";

const ProductList = () => {
  const [activeTab, setActiveTab] = useState("buyers");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [hasPlan, setHasPlan] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showBuyButton, setShowBuyButton] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  const showAlert = (msg, showButton = false) => {
    setPopupMessage(msg);
    setShowBuyButton(showButton);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setPopupMessage("");
      setShowBuyButton(false);
    }, 5000);
  };

  useEffect(() => {
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
      .catch((err) => console.error("Error fetching products:", err));
  }, [activeTab, selectedCategory]);

  const handleCallClick = (phoneNumber) => {
    if (hasPlan) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
     showAlert("Premium Plan is required to make calls!", true);
    }
  };

  const handleShareClick = async (product) => {
    const productURL = `${window.location.origin}/products/${product._id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.commodity,
          text: `Check out this product: ${product.commodity}`,
          url: productURL,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(productURL)
        .then(() => showAlert("Link copied to clipboard!"))
        .catch((err) => console.error("Failed to copy:", err));
    }
  };

  const filteredProducts = products.filter((p) =>
    p.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>{`
        :root {
          --g-dark:  #1a4d2e;
          --g-mid:   #2d7a4f;
          --g-light: #4caf78;
          --gold:    #e8a020;
          --gold-l:  #f5c842;
          --cream:   #faf7f0;
          --txt:     #1c1c1c;
          --muted:   #6b7c6b;
          --border:  #e0ece0;
          --white:   #ffffff;
        }

        .pl-wrap {
          min-height: 100vh;
          background: linear-gradient(180deg, #f4faf6 0%, #ffffff 60%);
          padding: 0 0 60px;
        }

        /* ── HERO HEADER ── */
        .pl-hero {
          background: linear-gradient(135deg, var(--g-dark) 0%, var(--g-mid) 100%);
          padding: 40px 24px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .pl-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
        }
        .pl-hero-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: var(--gold-l);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 4px 14px; border-radius: 50px;
          margin-bottom: 12px;
        }
        .pl-hero-title {
          font-size: clamp(22px, 4vw, 34px);
          font-weight: 800; color: white;
          margin-bottom: 6px; line-height: 1.2;
        }
        .pl-hero-title span { color: var(--gold-l); }
        .pl-hero-sub {
          font-size: 14px; color: rgba(255,255,255,0.7);
          margin-bottom: 28px;
        }

        /* ── SEARCH ── */
        .pl-search-wrap {
          max-width: 560px; margin: 0 auto;
          display: flex; align-items: center;
          background: white; border-radius: 50px;
          padding: 4px 4px 4px 18px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.15);
        }
        .pl-search-wrap svg { color: var(--muted); font-size: 16px; flex-shrink: 0; }
        .pl-search-wrap input {
          flex: 1; border: none; outline: none; background: transparent;
          padding: 8px 12px;
          font-size: 14px; color: var(--txt);
        }
        .pl-search-wrap input::placeholder { color: var(--muted); }
        .pl-search-btn {
          background: var(--g-dark); color: white; border: none;
          padding: 10px 20px; border-radius: 50px;
          font-size: 13px; font-weight: 700; cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .pl-search-btn:hover { background: var(--g-mid); }

        /* ── TABS ── */
        .pl-body { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .pl-tabs-wrap {
          display: flex; justify-content: center;
          margin: -24px auto 32px;
          position: relative; z-index: 10;
        }
        .pl-tabs {
          display: inline-flex;
          background: white;
          border-radius: 50px;
          padding: 5px;
          box-shadow: 0 4px 20px rgba(26,77,46,0.12);
          border: 1.5px solid var(--border);
          gap: 4px;
        }
        .pl-tab {
          padding: 10px 28px; border-radius: 50px;
          border: none; background: transparent;
          font-size: 13px; font-weight: 600; cursor: pointer;
          color: var(--muted);
          transition: all 0.22s ease;
        }
        .pl-tab.active {
          background: var(--g-dark); color: white;
          box-shadow: 0 3px 14px rgba(26,77,46,0.28);
        }
        .pl-tab:not(.active):hover { background: #f0f7f0; color: var(--g-dark); }

        /* ── SECTION TITLE ── */
        .pl-section-title {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 24px; flex-wrap: wrap; gap: 10px;
        }
        .pl-section-title h2 {
          font-size: 20px; font-weight: 800; color: var(--g-dark);
        }
        .pl-section-title h2 span { color: var(--g-mid); }
        .pl-count {
          background: #e8f5ee; color: var(--g-mid);
          font-size: 12px; font-weight: 700;
          padding: 4px 12px; border-radius: 50px;
          border: 1px solid #c3e6d0;
        }

        /* ── GRID ── */
        .pl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 20px;
        }

        /* ── CARD ── */
        .pl-card {
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          display: flex; flex-direction: column;
          position: relative;
        }
        .pl-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 40px rgba(26,77,46,0.12);
          border-color: #b0d8b8;
        }

        /* Tag */
        .pl-tag {
          position: absolute; top: 12px; left: 12px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 3px 10px; border-radius: 50px;
          z-index: 2;
        }
        .pl-tag.req {
          background: rgba(26,77,46,0.9); color: var(--gold-l);
        }
        .pl-tag.promo {
          background: linear-gradient(135deg, var(--gold), var(--gold-l));
          color: #7a4800;
        }

        /* Image */
        .pl-img-wrap {
          width: 100%; height: 180px; overflow: hidden;
          background: #f0f7f0;
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .pl-img-wrap img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.35s ease;
        }
        .pl-card:hover .pl-img-wrap img { transform: scale(1.04); }
        .pl-img-placeholder {
          font-size: 48px; opacity: 0.2;
        }

        /* Body */
        .pl-card-body { padding: 16px 18px; flex: 1; display: flex; flex-direction: column; gap: 4px; }

        .pl-card-title {
          font-size: 15px; font-weight: 700; color: var(--txt);
          text-decoration: none; line-height: 1.3; margin-bottom: 8px;
          display: block;
        }
        .pl-card-title:hover { color: var(--g-mid); }

        /* Info pills */
        .pl-info-row {
          display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;
        }
        .pl-pill {
          background: #f4faf6; border: 1px solid var(--border);
          border-radius: 50px; padding: 3px 10px;
          font-size: 11px; color: var(--g-dark); font-weight: 600;
        }
        .pl-pill b { color: var(--g-mid); }

        /* User & location */
        .pl-meta {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: var(--muted); margin-bottom: 4px;
        }
        .pl-meta svg { color: var(--g-mid); font-size: 13px; flex-shrink: 0; }

        /* Divider */
        .pl-card-div { height: 1px; background: var(--border); margin: 12px 0; }

        /* Actions */
        .pl-actions { display: flex; align-items: center; gap: 8px; padding: 0 18px 16px; }
        .pl-call-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 7px;
          background: var(--g-dark); color: white;
          border: none; border-radius: 50px;
          padding: 10px 16px; font-size: 13px; font-weight: 700;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
        }
        .pl-call-btn:hover { background: var(--g-mid); transform: translateY(-1px); }
        .pl-call-btn svg { font-size: 13px; }

        .pl-icon-btns { display: flex; align-items: center; gap: 4px; }
        .pl-icon-btn {
          width: 36px; height: 36px; border-radius: 10px;
          border: 1.5px solid var(--border);
          background: white; color: var(--muted);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 14px;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          text-decoration: none;
        }
        .pl-icon-btn:hover { border-color: var(--g-mid); color: var(--g-mid); background: #f0f7f0; }

        /* Views */
        .pl-views {
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; color: var(--muted);
          margin-left: auto;
        }
        .pl-views svg { font-size: 12px; }

        /* ── EMPTY STATE ── */
        .pl-empty {
          text-align: center; padding: 60px 20px;
          color: var(--muted);
        }
        .pl-empty-icon { font-size: 48px; opacity: 0.2; margin-bottom: 12px; }
        .pl-empty h3 { font-size: 18px; color: var(--g-dark); margin-bottom: 6px; }
        .pl-empty p  { font-size: 14px; }

        /* ── POPUP ── */
        .pl-popup-ov {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.45); backdrop-filter: blur(4px);
          z-index: 9999; display: flex; align-items: center; justify-content: center;
          padding: 20px; animation: plFadeIn 0.2s ease;
        }
        @keyframes plFadeIn { from{opacity:0} to{opacity:1} }
        .pl-popup {
          background: white; border-radius: 20px;
          padding: 28px 24px; width: 100%; max-width: 340px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
          animation: plPopIn 0.22s cubic-bezier(.34,1.56,.64,1);
        }
        @keyframes plPopIn {
          from { transform: scale(0.85); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .pl-popup-ico {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, var(--gold), var(--gold-l));
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px; font-size: 24px; color: #7a4800;
        }
        .pl-popup h3 {
          font-size: 17px; font-weight: 800; color: var(--txt); margin-bottom: 8px;
        }
        .pl-popup p { font-size: 13px; color: var(--muted); line-height: 1.5; margin-bottom: 20px; }
        .pl-popup-btns { display: flex; gap: 10px; }
        .pl-popup-close {
          flex: 1; padding: 11px;
          background: #f0f4f0; color: var(--txt);
          border: none; border-radius: 50px;
          font-weight: 600; font-size: 14px; cursor: pointer;
          transition: background 0.2s;
        }
        .pl-popup-close:hover { background: #e4ece4; }
        .pl-popup-buy {
          flex: 1; padding: 11px;
          background: linear-gradient(135deg, var(--gold), var(--gold-l));
          color: #7a4800; border: none; border-radius: 50px;
          font-weight: 700; font-size: 14px; cursor: pointer;
          transition: opacity 0.2s; display: flex; align-items: center;
          justify-content: center; gap: 6px;
          box-shadow: 0 3px 14px rgba(232,160,32,0.35);
        }
        .pl-popup-buy:hover { opacity: 0.88; }

        /* RESPONSIVE */
        @media (max-width: 640px) {
          .pl-hero { padding: 32px 16px 52px; }
          .pl-body  { padding: 0 12px; }
          .pl-grid  { grid-template-columns: 1fr; }
          .pl-tab   { padding: 9px 20px; font-size: 12px; }
        }
        @media (max-width: 400px) {
          .pl-search-btn span { display: none; }
        }


        .pl-img-wrap {
  width: 100%;
  height: 220px; /* apne hisab se change kar sakte ho */
  overflow: hidden;
  border-radius: 14px;
  background: #f5f5f5;

  display: flex;
  align-items: center;
  justify-content: center;
}

.pl-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* image properly fit hogi */
  display: block;
}

/* Placeholder */

.pl-img-placeholder {
  font-size: 50px;
  color: #999;
}
      `}
      
      
      
      
      </style>

      <div className="pl-wrap">
        {/* Hero */}
        <div className="pl-hero">
          <div className="pl-hero-tag">🌾 Jay Shree Kisan Marketplace</div>
          <h1 className="pl-hero-title">
            {activeTab === "buyers" ? "Buyer" : "Seller"}{" "}
            <span>{selectedCategory ? selectedCategory : "Listings"}</span>
          </h1>
          <p className="pl-hero-sub">
            {activeTab === "buyers"
              ? "Verified buyers looking for fresh farm produce"
              : "Trusted sellers offering quality agricultural products"}
          </p>
          <div className="pl-search-wrap">
            <FaSearch />
            <input
              type="text"
              placeholder="Search product, district, state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="pl-search-btn">
              <span>Search</span>
            </button>
          </div>
        </div>

        <div className="pl-body">
          {/* Tabs */}
          <div className="pl-tabs-wrap">
            <div className="pl-tabs">
              <button
                className={`pl-tab${activeTab === "buyers" ? " active" : ""}`}
                onClick={() => setActiveTab("buyers")}
              >
                 Buyers
              </button>
              <button
                className={`pl-tab${activeTab === "sellers" ? " active" : ""}`}
                onClick={() => setActiveTab("sellers")}
              >
                 Sellers
              </button>
            </div>
          </div>

          {/* Section title */}
          <div className="pl-section-title">
            <h2>
              {activeTab === "buyers" ? "Buyer Requirements" : "Seller Listings"}
              {selectedCategory && <span> — {selectedCategory}</span>}
            </h2>
            <span className="pl-count">{filteredProducts.length} Results</span>
          </div>

          {/* Cards */}
          {filteredProducts.length === 0 ? (
            <div className="pl-empty">
              <div className="pl-empty-icon">🌾</div>
              <h3>Koi listing nahi mili</h3>
              <p>Try different search terms ya category badlo</p>
            </div>
          ) : (
            <div className="pl-grid">
              {filteredProducts.map((p) => (
                <div key={p._id} className="pl-card">
                  {/* Tag */}
                  <span className={`pl-tag ${activeTab === "buyers" ? "req" : "promo"}`}>
                    {activeTab === "buyers" ? "Requirement" : " Promoted"}
                  </span>

                  {/* Image */}
                  <Link to={`/products/${p._id}`}>
                    <div className="pl-img-wrap">
                      {p.image ? (
                        <img
                          src={`http://localhost:5000/uploads/${p.image}`}
                          alt={p.commodity}
                        />
                      ) : (
                        <span className="pl-img-placeholder">🌾</span>
                      )}
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="pl-card-body">
                    <Link to={`/products/${p._id}`} className="pl-card-title">
                      {p.commodity}{" "}
                      {activeTab === "buyers" ? "Required in" : "Available at"}{" "}
                      {p.district}
                    </Link>

                    {/* Info pills */}
                    <div className="pl-info-row">
                      <span className="pl-pill">₹ <b>{p.price}</b></span>
                      <span className="pl-pill">Qty: <b>{p.quantity}</b></span>
                      <span className="pl-pill">{p.type}</span>
                    </div>

                    {/* User */}
                    <div className="pl-meta">
                      <FaUserCircle />
                      <span>{p.name}</span>
                    </div>
                    {/* Location */}
                    <div className="pl-meta">
                      <FaMapMarkerAlt />
                      <span>{p.district}, {p.state}</span>
                    </div>
                  </div>

                  <div className="pl-card-div" />

                  {/* Actions */}
                  <div className="pl-actions">
                    <button
                      className="pl-call-btn"
                      onClick={() => handleCallClick(p.phone || "9999999999")}
                    >
                      <FaPhoneAlt /> Call Now
                    </button>

                    <div className="pl-icon-btns">
                      <span
  className="pl-icon-btn"
  onClick={() => {
    if (!hasPlan) {
     showAlert(
  "Premium Plan is required to comment!",
  true
);
    }
  }}
>
  {hasPlan ? (
    <CommentModal productId={p._id} />
  ) : (
    <FaCommentDots />
  )}
</span>
                      <span
                        className="pl-icon-btn"
                        onClick={() => handleShareClick(p)}
                        title="Share"
                      >
                        <FaShareAlt />
                      </span>
                    </div>

                    <div className="pl-views">
                      <FaEye /> 707
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="pl-popup-ov">
          <div className="pl-popup">
            <div className="pl-popup-ico">
              <FaCrown />
            </div>
            <h3>Premium Plan Required</h3>
            <p>{popupMessage}</p>
            <div className="pl-popup-btns">
              <button className="pl-popup-close" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
              {showBuyButton && (
                <button
                  className="pl-popup-buy"
                  onClick={() => { navigate("/trendingPrices"); setShowPopup(false); }}
                >
                  <FaShieldAlt /> Buy Plan
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;