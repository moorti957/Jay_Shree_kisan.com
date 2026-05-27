import React from "react";
import { assets } from "../../assets/assets";

const AboutKisanDeals = () => {
  return (
    <>
      <style>{`
        :root {
          --g-dark: #1a4d2e; --g-mid: #2d7a4f; --g-light: #4caf78;
          --gold: #e8a020; --gold-l: #f5c842;
          --border: #e0ece0; --cream: #f4faf6;
        }
        .ab-section {
          background: linear-gradient(160deg, #f4faf6 0%, #ffffff 100%);
          padding: 64px 28px; position: relative; overflow: hidden;
        }
        .ab-section::before {
          content: ''; position: absolute; top: -60px; right: -60px;
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(76,175,120,0.10) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
        }
        .ab-section::after {
          content: ''; position: absolute; bottom: -40px; left: -40px;
          width: 240px; height: 240px;
          background: radial-gradient(circle, rgba(232,160,32,0.07) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
        }
        .ab-container {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 420px;
          gap: 60px; align-items: center; position: relative; z-index: 1;
        }
        .ab-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          background: #e8f5ee; border: 1px solid #c3e6d0;
          color: var(--g-dark); font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 4px 14px; border-radius: 50px; margin-bottom: 16px;
        }
        .ab-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold); display: inline-block;
        }
        .ab-title {
          font-size: 36px; font-weight: 800; color: var(--g-dark);
          line-height: 1.2; margin: 0 0 6px;
        }
        .ab-title span { color: var(--g-mid); }
        .ab-title-line {
          width: 52px; height: 4px; border-radius: 2px;
          background: linear-gradient(90deg, var(--gold), var(--gold-l));
          margin: 14px 0 20px;
        }
        .ab-desc {
          font-size: 15px; color: #4a5e4a;
          line-height: 1.8; margin-bottom: 28px; max-width: 520px;
        }
        .ab-stats { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 32px; }
        .ab-stat {
          background: white; border: 1.5px solid var(--border);
          border-radius: 16px; padding: 14px 22px; text-align: center;
          min-width: 90px; transition: transform 0.2s, box-shadow 0.2s;
        }
        .ab-stat:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(26,77,46,0.10);
        }
        .ab-stat-num { font-size: 22px; font-weight: 800; color: var(--g-dark); display: block; }
        .ab-stat-num span { color: var(--gold); }
        .ab-stat-lbl { font-size: 11px; color: #6b7c6b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
        .ab-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .ab-btn-primary {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--g-dark); color: white; border: none;
          border-radius: 50px; padding: 12px 26px; font-size: 13px;
          font-weight: 700; cursor: pointer; transition: background 0.2s, transform 0.15s;
        }
        .ab-btn-primary:hover { background: var(--g-mid); transform: translateY(-2px); }
        .ab-btn-secondary {
          display: inline-flex; align-items: center; gap: 7px;
          background: white; color: var(--g-dark);
          border: 1.5px solid var(--border); border-radius: 50px;
          padding: 12px 26px; font-size: 13px; font-weight: 700;
          cursor: pointer; transition: border-color 0.2s, transform 0.15s;
        }
        .ab-btn-secondary:hover { border-color: var(--g-mid); transform: translateY(-2px); }

        /* Visual side */
        .ab-visual {
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .ab-ring {
          width: 340px; height: 340px; border-radius: 50%;
          border: 2px dashed #c3e6d0;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          animation: abSpin 18s linear infinite;
        }
        @keyframes abSpin {
          from { transform: rotate(0deg); } to { transform: rotate(360deg); }
        }
        .ab-ring-dot {
          position: absolute; width: 10px; height: 10px;
          border-radius: 50%; background: var(--gold-l); border: 2px solid white;
        }
        .ab-ring-dot:nth-child(1) { top: -5px; left: 50%; transform: translateX(-50%); }
        .ab-ring-dot:nth-child(2) { bottom: -5px; left: 50%; transform: translateX(-50%); }
        .ab-ring-dot:nth-child(3) { left: -5px; top: 50%; transform: translateY(-50%); }
        .ab-ring-dot:nth-child(4) { right: -5px; top: 50%; transform: translateY(-50%); }
        .ab-logo-card {
          width: 220px; height: 220px; border-radius: 50%;
          background: white; border: 2px solid var(--border);
          box-shadow: 0 8px 32px rgba(26,77,46,0.10);
          display: flex; align-items: center; justify-content: center;
          animation: abSpin 18s linear infinite reverse;
          overflow: hidden; padding: 24px;
        }
        .ab-logo-card img { width: 100%; height: 100%; object-fit: contain; }
        .ab-chip {
          position: absolute; background: white;
          border: 1.5px solid var(--border); border-radius: 50px;
          padding: 7px 14px; display: flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 700; color: var(--g-dark);
          box-shadow: 0 4px 16px rgba(26,77,46,0.08); white-space: nowrap;
        }
        .ab-chip-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--g-light); }
        .ab-chip-1 { top: 10px; left: -10px; }
        .ab-chip-2 { bottom: 20px; left: -20px; }
        .ab-chip-3 { top: 50%; right: -20px; transform: translateY(-50%); }

        @media (max-width: 820px) {
          .ab-container { grid-template-columns: 1fr; gap: 40px; }
          .ab-visual { order: -1; }
          .ab-ring { width: 260px; height: 260px; }
          .ab-logo-card { width: 160px; height: 160px; }
          .ab-title { font-size: 26px; }
        }
        @media (max-width: 480px) {
          .ab-section { padding: 40px 16px; }
          .ab-stats { gap: 12px; }
        }
      `}</style>

      <section className="ab-section">
        <div className="ab-container">

          {/* Left: Text */}
          <div className="ab-text">
            <div className="ab-eyebrow">
              <span className="ab-eyebrow-dot" /> Our Story
            </div>
            <h2 className="ab-title">
              About Jay Shree<br /><span>Kisan Deals</span>
            </h2>
            <div className="ab-title-line" />
            <p className="ab-desc">
              Jay Shree Kisan Deals is your premier online agricultural marketplace,
              seamlessly connecting farmers, agribusinesses, and buyers. Sellers can
              effortlessly showcase their produce with detailed listings. Buyers can
              explore a vast array of agricultural products and initiate deals with
              sellers to procure high-quality produce. Experience the future of
              agri-trade at your fingertips!
            </p>

            <div className="ab-stats">
              <div className="ab-stat">
                <span className="ab-stat-num">10K<span>+</span></span>
                <span className="ab-stat-lbl">Farmers</span>
              </div>
              <div className="ab-stat">
                <span className="ab-stat-num">50K<span>+</span></span>
                <span className="ab-stat-lbl">Products</span>
              </div>
              <div className="ab-stat">
                <span className="ab-stat-num">25<span>+</span></span>
                <span className="ab-stat-lbl">States</span>
              </div>
              <div className="ab-stat">
                <span className="ab-stat-num">5<span>★</span></span>
                <span className="ab-stat-lbl">Rating</span>
              </div>
            </div>

            <div className="ab-btns">
              <button className="ab-btn-primary"> Start Buying</button>
              <button className="ab-btn-secondary"> Sell Produce</button>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="ab-visual">
            <div className="ab-ring">
              <div className="ab-ring-dot" />
              <div className="ab-ring-dot" />
              <div className="ab-ring-dot" />
              <div className="ab-ring-dot" />
              <div className="ab-logo-card">
                <img
                  src={assets.logo}
                  alt="KisanDeals Logo"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = "<span style='font-size:64px'>🌾</span>";
                  }}
                />
              </div>
            </div>
            <div className="ab-chip ab-chip-1">
              <span className="ab-chip-dot" /> Verified Sellers
            </div>
            <div className="ab-chip ab-chip-2"> Trusted Platform</div>
            <div className="ab-chip ab-chip-3"> Fast Delivery</div>
          </div>

        </div>
      </section>
    </>
  );
};

export default AboutKisanDeals;