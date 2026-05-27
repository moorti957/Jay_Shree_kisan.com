import React, { useState } from "react";
import { FaLeaf, FaTrash, FaPlus, FaMinus, FaShoppingCart, FaTruck, FaTag, FaArrowLeft, FaCheckCircle, FaSeedling } from "react-icons/fa";

const initialItems = [
  { id: 1, name: "Organic Tomatoes", category: "Vegetables", farmer: "Ramesh Patel, Pune", price: 45, unit: "kg", qty: 3, img: "🍅", badge: "Organic", badgeColor: "#2d7a4f" },
  { id: 2, name: "Basmati Rice", category: "Grains", farmer: "Sukhdev Singh, Punjab", price: 120, unit: "kg", qty: 5, img: "🌾", badge: "Premium", badgeColor: "#b07d2b" },
  { id: 3, name: "Fresh Spinach", category: "Leafy Greens", farmer: "Kavitha Reddy, Nashik", price: 30, unit: "bunch", qty: 2, img: "🥬", badge: "Seasonal", badgeColor: "#1a6b4a" },
  { id: 4, name: "A2 Desi Ghee", category: "Dairy", farmer: "Yadav Dairy Farm, Jaipur", price: 680, unit: "500g", qty: 1, img: "🫙", badge: "Pure", badgeColor: "#c47a2b" },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [removed, setRemoved] = useState(null);

  const updateQty = (id, delta) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const removeItem = (id) => {
    const item = items.find(i => i.id === id);
    setRemoved(item?.name);
    setItems(prev => prev.filter(i => i.id !== id));
    setTimeout(() => setRemoved(null), 2500);
  };

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal >= 500 ? 0 : 60;
  const total = subtotal - discount + delivery;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Noto+Serif:ital,wght@0,700;1,700&display=swap');

        :root {
          --g1: #006b2e;
          --g2: #2d7a4f;
          --g3: #e8f5ee;
          --gold: #c47a2b;
          --gold-l: #f5c842;
          --cream: #fdf9f3;
          --paper: #f6f2eb;
          --txt: #1a1a1a;
          --muted: #6b7060;
          --border: #dde8d8;
          --red: #c0392b;
          --white: #ffffff;
          --shadow: 0 4px 24px rgba(0,80,30,0.10);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cart-page {
          min-height: 100vh;
          background: var(--cream);
          font-family: 'Sora', sans-serif;
          padding-bottom: 48px;
        }

        /* ── HERO HEADER ── */
        .cart-hero {
          background: linear-gradient(135deg, var(--g1) 0%, var(--g2) 60%, #1a5e36 100%);
          padding: 32px 24px 28px;
          position: relative;
          overflow: hidden;
        }
        .cart-hero::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
        }
        .cart-hero::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -30px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(232,160,32,0.10);
        }
        .cart-hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }
        .cart-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          font-weight: 500;
          background: none; border: none;
          cursor: pointer;
          padding: 0;
          margin-bottom: 16px;
          transition: color 0.2s;
        }
        .cart-back:hover { color: #fff; }
        .cart-hero h1 {
          font-family: 'Noto Serif', serif;
          font-size: clamp(22px, 4vw, 32px);
          color: #fff;
          font-weight: 700;
          display: flex; align-items: center; gap: 12px;
        }
        .cart-hero h1 svg { color: var(--gold-l); }
        .cart-hero-sub {
          color: rgba(255,255,255,0.65);
          font-size: 13px;
          margin-top: 6px;
          font-weight: 400;
        }
        .cart-hero-chips {
          display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap;
        }
        .cart-chip {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.85);
          font-size: 12px;
          font-weight: 500;
          padding: 5px 14px;
          border-radius: 30px;
          display: flex; align-items: center; gap: 6px;
        }
        .cart-chip svg { color: var(--gold-l); font-size: 11px; }

        /* ── TOAST ── */
        .cart-toast {
          position: fixed;
          top: 20px; left: 50%;
          transform: translateX(-50%);
          background: #c0392b;
          color: white;
          padding: 10px 20px;
          border-radius: 40px;
          font-size: 13px;
          font-weight: 600;
          z-index: 9999;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
          animation: toastin 0.3s ease;
          white-space: nowrap;
        }
        @keyframes toastin {
          from { opacity:0; transform: translateX(-50%) translateY(-12px); }
          to   { opacity:1; transform: translateX(-50%) translateY(0); }
        }

        /* ── LAYOUT ── */
        .cart-layout {
          max-width: 1100px;
          margin: 0 auto;
          padding: 28px 20px 0;
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 24px;
          align-items: start;
        }

        /* ── EMPTY STATE ── */
        .cart-empty {
          grid-column: 1/-1;
          text-align: center;
          padding: 64px 24px;
          background: white;
          border-radius: 24px;
          border: 2px dashed var(--border);
        }
        .cart-empty-icon {
          font-size: 64px; margin-bottom: 20px;
        }
        .cart-empty h2 {
          font-family: 'Noto Serif', serif;
          font-size: 22px; color: var(--txt); margin-bottom: 8px;
        }
        .cart-empty p { color: var(--muted); font-size: 14px; }

        /* ── ITEMS PANEL ── */
        .cart-items-panel {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cart-section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 4px;
        }

        /* ── CARD ── */
        .cart-card {
          background: white;
          border-radius: 20px;
          padding: 18px 20px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          overflow: hidden;
        }
        .cart-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(var(--g1), var(--g2));
          border-radius: 4px 0 0 4px;
        }
        .cart-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,80,30,0.14);
        }

        .cart-card-emoji {
          width: 64px; height: 64px;
          background: var(--g3);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 32px;
          flex-shrink: 0;
          border: 2px solid var(--border);
          position: relative;
        }
        .cart-badge {
          position: absolute;
          top: -6px; right: -6px;
          font-size: 8px;
          font-weight: 700;
          padding: 3px 6px;
          border-radius: 8px;
          color: white;
          white-space: nowrap;
          letter-spacing: 0.04em;
        }

        .cart-card-body {
          flex: 1;
          min-width: 0;
        }
        .cart-card-cat {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--g2);
          margin-bottom: 3px;
        }
        .cart-card-name {
          font-size: 16px;
          font-weight: 700;
          color: var(--txt);
          margin-bottom: 4px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .cart-card-farmer {
          font-size: 11px;
          color: var(--muted);
          display: flex; align-items: center; gap: 5px;
          margin-bottom: 12px;
        }
        .cart-card-farmer svg { color: var(--g2); font-size: 10px; }

        .cart-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        /* Qty stepper */
        .cart-qty {
          display: flex;
          align-items: center;
          gap: 0;
          background: var(--g3);
          border-radius: 40px;
          overflow: hidden;
          border: 1.5px solid var(--border);
        }
        .cart-qty button {
          background: none; border: none;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: var(--g1);
          font-size: 12px;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .cart-qty button:hover { background: rgba(0,107,46,0.10); }
        .cart-qty span {
          font-size: 14px;
          font-weight: 700;
          min-width: 32px;
          text-align: center;
          color: var(--txt);
        }

        .cart-price-block {
          text-align: right;
        }
        .cart-unit-price {
          font-size: 11px;
          color: var(--muted);
        }
        .cart-item-total {
          font-size: 18px;
          font-weight: 800;
          color: var(--g1);
        }

        .cart-remove {
          background: #fff0ee;
          border: none;
          width: 34px; height: 34px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: var(--red);
          font-size: 13px;
          transition: background 0.2s, transform 0.15s;
          flex-shrink: 0;
        }
        .cart-remove:hover { background: #fde0dc; transform: scale(1.1); }

        /* ── SUMMARY PANEL ── */
        .cart-summary {
          position: sticky;
          top: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-summary-card {
          background: white;
          border-radius: 24px;
          padding: 22px 20px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
        }

        .cart-summary-title {
          font-family: 'Noto Serif', serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--txt);
          margin-bottom: 18px;
          padding-bottom: 14px;
          border-bottom: 2px dashed var(--border);
          display: flex; align-items: center; gap: 10px;
        }
        .cart-summary-title svg { color: var(--g2); }

        .cart-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .cart-row .label { color: var(--muted); }
        .cart-row .value { font-weight: 600; color: var(--txt); }
        .cart-row .value.green { color: var(--g1); }
        .cart-row .value.red { color: var(--red); }
        .cart-row .value.gold { color: var(--gold); }

        .cart-sep { height: 1px; background: var(--border); margin: 14px 0; }

        .cart-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 4px;
        }
        .cart-total-label {
          font-size: 15px;
          font-weight: 700;
          color: var(--txt);
        }
        .cart-total-amt {
          font-size: 26px;
          font-weight: 800;
          color: var(--g1);
          font-family: 'Noto Serif', serif;
        }

        /* Coupon */
        .cart-coupon {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }
        .cart-coupon input {
          flex: 1;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 10px 14px;
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          outline: none;
          background: var(--cream);
          color: var(--txt);
          transition: border-color 0.2s;
        }
        .cart-coupon input:focus { border-color: var(--g2); }
        .cart-coupon button {
          background: var(--g1);
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 12px;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .cart-coupon button:hover { background: var(--g2); }
        .coupon-success {
          margin-top: 8px;
          font-size: 12px;
          color: var(--g2);
          font-weight: 600;
          display: flex; align-items: center; gap: 6px;
        }

        /* Checkout btn */
        .cart-checkout {
          width: 100%;
          background: linear-gradient(135deg, var(--g1), var(--g2));
          color: white;
          border: none;
          padding: 16px;
          border-radius: 60px;
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 18px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          box-shadow: 0 6px 20px rgba(0,107,46,0.30);
          transition: transform 0.15s, box-shadow 0.15s;
          letter-spacing: 0.02em;
        }
        .cart-checkout:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0,107,46,0.38);
        }
        .cart-checkout svg { font-size: 18px; }

        /* Delivery card */
        .cart-delivery-card {
          background: linear-gradient(135deg, var(--g3), #e0f2e8);
          border: 1.5px solid var(--border);
          border-radius: 18px;
          padding: 16px 18px;
          display: flex; gap: 14px; align-items: flex-start;
        }
        .cart-del-icon {
          width: 44px; height: 44px; flex-shrink: 0;
          background: var(--g2);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
        }
        .cart-del-icon svg { color: white; font-size: 18px; }
        .cart-del-info h4 { font-size: 13px; font-weight: 700; color: var(--g1); margin-bottom: 3px; }
        .cart-del-info p { font-size: 12px; color: var(--muted); line-height: 1.5; }
        .cart-del-info b { color: var(--gold); }

        /* Farmer trust strip */
        .cart-trust {
          background: white;
          border-radius: 18px;
          padding: 16px 18px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
        }
        .cart-trust-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 12px;
        }
        .cart-trust-list { display: flex; flex-direction: column; gap: 8px; }
        .cart-trust-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 12px; color: var(--muted); font-weight: 500;
        }
        .cart-trust-item svg { color: var(--g2); flex-shrink: 0; }

        /* ── RESPONSIVE ── */
        @media (max-width: 860px) {
          .cart-layout {
            grid-template-columns: 1fr;
          }
          .cart-summary { position: static; }
        }
        @media (max-width: 520px) {
          .cart-card { padding: 14px 14px 14px 18px; gap: 12px; }
          .cart-card-emoji { width: 52px; height: 52px; font-size: 26px; }
          .cart-card-name { font-size: 14px; }
          .cart-item-total { font-size: 15px; }
          .cart-hero { padding: 24px 16px 22px; }
          .cart-layout { padding: 18px 14px 0; }
        }
      `}</style>

      <div className="cart-page">

        {/* Toast */}
        {removed && <div className="cart-toast">🗑 "{removed}" removed</div>}

        {/* Hero */}
        <div className="cart-hero">
          <div className="cart-hero-inner">
            <button className="cart-back"><FaArrowLeft /> Shopping jaari rakhen</button>
            <h1><FaShoppingCart /> Mera Cart</h1>
            <p className="cart-hero-sub">{items.length} items • Directly from Indian farmers</p>
            <div className="cart-hero-chips">
              <span className="cart-chip"><FaLeaf /> 100% Farm Fresh</span>
              <span className="cart-chip"><FaTruck /> Free delivery ₹500+</span>
              <span className="cart-chip"><FaCheckCircle /> Verified Farmers</span>
            </div>
          </div>
        </div>

        <div className="cart-layout">

          {/* Left: Items */}
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h2>Aapka cart khali hai</h2>
              <p>Kuch fresh products add karein aur seedha kisan se kharidein!</p>
            </div>
          ) : (
            <div className="cart-items-panel">
              <p className="cart-section-label">Cart Items ({items.length})</p>
              {items.map(item => (
                <div className="cart-card" key={item.id}>
                  <div className="cart-card-emoji">
                    {item.img}
                    <span className="cart-badge" style={{ background: item.badgeColor }}>{item.badge}</span>
                  </div>
                  <div className="cart-card-body">
                    <div className="cart-card-cat">{item.category}</div>
                    <div className="cart-card-name">{item.name}</div>
                    <div className="cart-card-farmer">
                      <FaSeedling /> {item.farmer}
                    </div>
                    <div className="cart-card-footer">
                      <div className="cart-qty">
                        <button onClick={() => updateQty(item.id, -1)}><FaMinus /></button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, +1)}><FaPlus /></button>
                      </div>
                      <div className="cart-price-block">
                        <div className="cart-unit-price">₹{item.price}/{item.unit}</div>
                        <div className="cart-item-total">₹{item.price * item.qty}</div>
                      </div>
                    </div>
                  </div>
                  <button className="cart-remove" onClick={() => removeItem(item.id)} title="Remove"><FaTrash /></button>
                </div>
              ))}
            </div>
          )}

          {/* Right: Summary */}
          <div className="cart-summary">

            {/* Delivery info */}
            <div className="cart-delivery-card">
              <div className="cart-del-icon"><FaTruck /></div>
              <div className="cart-del-info">
                <h4>{delivery === 0 ? "🎉 Free Delivery Unlocked!" : `₹${500 - subtotal} aur add karen`}</h4>
                <p>
                  {delivery === 0
                    ? "Aapka order free deliver hoga ghar tak."
                    : <>₹500 se upar order pe <b>Free Delivery</b> milti hai!</>}
                </p>
              </div>
            </div>

            {/* Order summary */}
            <div className="cart-summary-card">
              <div className="cart-summary-title"><FaTag /> Order Summary</div>

              <div className="cart-row">
                <span className="label">Subtotal ({items.reduce((s,i)=>s+i.qty,0)} items)</span>
                <span className="value">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {couponApplied && (
                <div className="cart-row">
                  <span className="label">Coupon Discount (10%)</span>
                  <span className="value red">– ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="cart-row">
                <span className="label">Delivery Charges</span>
                <span className={`value ${delivery===0?"green":""}`}>
                  {delivery === 0 ? "FREE" : `₹${delivery}`}
                </span>
              </div>

              <div className="cart-sep" />

              <div className="cart-total-row">
                <span className="cart-total-label">Total Payable</span>
                <span className="cart-total-amt">₹{total.toLocaleString('en-IN')}</span>
              </div>

              {/* Coupon */}
              <div className="cart-coupon">
                <input
                  placeholder="Coupon code..."
                  value={coupon}
                  onChange={e => setCoupon(e.target.value.toUpperCase())}
                  disabled={couponApplied}
                />
                <button onClick={() => { if (coupon.trim()) setCouponApplied(true); }}>
                  <FaTag /> Apply
                </button>
              </div>
              {couponApplied && (
                <div className="coupon-success">
                  <FaCheckCircle /> "{coupon}" coupon applied — 10% off!
                </div>
              )}

              <button className="cart-checkout">
                <FaShoppingCart /> Checkout Karo
              </button>
            </div>

            {/* Trust badges */}
            <div className="cart-trust">
              <div className="cart-trust-title">Aap Kyun Trust Kar Sakte Hain</div>
              <div className="cart-trust-list">
                <div className="cart-trust-item"><FaCheckCircle /> Verified kisan se seedha maal</div>
                <div className="cart-trust-item"><FaCheckCircle /> 100% natural & fresh guarantee</div>
                <div className="cart-trust-item"><FaCheckCircle /> Secure payments, easy returns</div>
                <div className="cart-trust-item"><FaLeaf /> Chemical-free, organic options</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}