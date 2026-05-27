import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const Banner = () => {
  return (
    <>
      <style>{`
        :root {
          --g-dark: #1a4d2e;
          --g-mid:  #2d7a4f;
          --gold:   #e8a020;
          --gold-l: #f5c842;
          --border: #e0ece0;
        }

        /* TOP STRIP — unchanged */
        .bn-strip {
          background: linear-gradient(135deg, var(--g-dark) 0%, var(--g-mid) 100%);
          padding: 14px 28px;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 12px;
          position: relative; overflow: hidden;
          border-radius: 1px; margin-bottom: 20px;
        }
        .bn-strip::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 22px 22px; pointer-events: none;
        }
        .bn-strip-left { display: flex; align-items: center; gap: 10px; }
        .bn-strip-icon {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.12);
          border: 1.5px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .bn-strip-text .tag {
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--gold-l);
          display: block; margin-bottom: 2px;
        }
        .bn-strip-text .msg { font-size: 15px; font-weight: 700; color: white; }
        .bn-strip-code {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px dashed rgba(255,255,255,0.3);
          border-radius: 50px; padding: 6px 18px;
        }
        .bn-strip-code .code { color: var(--gold-l); font-size: 14px; font-weight: 800; letter-spacing: 0.08em; }
        .bn-strip-code .label { color: rgba(255,255,255,0.7); font-size: 12px; }
        .bn-strip-btn {
          background: linear-gradient(135deg, var(--gold), var(--gold-l));
          color: #7a4800; border: none; border-radius: 50px;
          padding: 10px 22px; font-size: 13px; font-weight: 800;
          cursor: pointer; white-space: nowrap;
          box-shadow: 0 3px 14px rgba(232,160,32,0.4);
          transition: opacity 0.2s, transform 0.15s;
        }
        .bn-strip-btn:hover { opacity: 0.88; transform: translateY(-1px); }

        /* ── CARDS SECTION ── */
        .bn-section {
          position: relative;
          padding: 0 28px 36px;
          max-width: 1200px;
          margin: 0 auto;
        }
        /* Corner glow effects */
        .bn-section::before {
          content: '';
          position: absolute;
          top: -30px; left: 0;
          width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(76,175,120,0.13) 0%, transparent 70%);
          pointer-events: none; z-index: 0; border-radius: 50%;
        }
        .bn-section::after {
          content: '';
          position: absolute;
          bottom: 0; right: 10px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(232,160,32,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0; border-radius: 50%;
        }

        /* Asymmetric grid */
        .bn-cards-new {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 14px;
          height: 420px;
          position: relative; z-index: 1;
        }
        .bn-card-big     { grid-column: 1; grid-row: 1 / 3; }
        .bn-card-sm-top  { grid-column: 2; grid-row: 1; }
        .bn-card-sm-bot  { grid-column: 2; grid-row: 2; }

        /* Shared card */
        .bn-c {
          border-radius: 20px; overflow: hidden;
          position: relative; display: flex; align-items: flex-end;
          border: 1.5px solid var(--border);
          text-decoration: none; width: 100%; height: 100%;
          transition: transform 0.28s ease, box-shadow 0.28s ease;
        }
        .bn-c:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 44px rgba(26,77,46,0.16);
        }
        .bn-c-img { position: absolute; inset: 0; overflow: hidden; z-index: 0; }
        .bn-c-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.38s ease;
        }
        .bn-c:hover .bn-c-img img { transform: scale(1.06); }

        .bn-card-big .bn-c-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to top,
            rgba(20,60,35,0.92) 0%,
            rgba(26,77,46,0.3) 55%,
            transparent 100%);
        }
        .bn-card-sm-top .bn-c-overlay,
        .bn-card-sm-bot .bn-c-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to top,
            rgba(20,60,35,0.88) 0%,
            rgba(26,77,46,0.15) 60%,
            transparent 100%);
        }

        /* Glassy top-left glow on big card */
        .bn-card-big .bn-c::before {
          content: '';
          position: absolute; top: -40px; left: -40px;
          width: 160px; height: 160px;
          background: radial-gradient(circle, rgba(76,175,120,0.18) 0%, transparent 70%);
          z-index: 1; pointer-events: none; border-radius: 50%;
        }

        .bn-c-body { position: relative; z-index: 2; padding: 16px 20px; width: 100%; }
        .bn-c-tag {
          display: inline-block;
          background: linear-gradient(135deg, var(--gold), var(--gold-l));
          color: #7a4800; font-size: 9px; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 50px; margin-bottom: 8px;
        }
        .bn-card-big .bn-c-title    { font-size: 17px; }
        .bn-card-sm-top .bn-c-title,
        .bn-card-sm-bot .bn-c-title { font-size: 14px; }
        .bn-c-title { color: white; font-weight: 800; line-height: 1.3; margin-bottom: 3px; }

        .bn-card-big .bn-c-sub    { font-size: 12px; margin-bottom: 12px; }
        .bn-card-sm-top .bn-c-sub,
        .bn-card-sm-bot .bn-c-sub { font-size: 11px; margin-bottom: 10px; }
        .bn-c-sub { color: rgba(255,255,255,0.65); }

        .bn-c-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: white; color: var(--g-dark);
          border: none; border-radius: 50px;
          font-weight: 700; cursor: pointer; transition: background 0.2s;
        }
        .bn-card-big .bn-c-btn    { padding: 9px 18px; font-size: 12px; }
        .bn-card-sm-top .bn-c-btn,
        .bn-card-sm-bot .bn-c-btn { padding: 7px 14px; font-size: 11px; }
        .bn-c-btn:hover { background: var(--gold-l); }

        @media (max-width: 680px) {
          .bn-cards-new {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            height: auto;
          }
          .bn-card-big    { grid-column: 1; grid-row: auto; min-height: 220px; }
          .bn-card-sm-top { grid-column: 1; grid-row: auto; min-height: 170px; }
          .bn-card-sm-bot { grid-column: 1; grid-row: auto; min-height: 170px; }
          .bn-section { padding: 0 14px 24px; }
        }
        @media (max-width: 480px) {
          .bn-strip { flex-direction: column; text-align: center; padding: 14px 16px; }
        }
      `}</style>

      {/* TOP STRIP — unchanged */}
      <div className="bn-strip">
        <div className="bn-strip-left">
          <div className="bn-strip-icon">🎁</div>
          <div className="bn-strip-text">
            <span className="tag">Limited Offer</span>
            <span className="msg">Super Discount For Your First Purchase!</span>
          </div>
        </div>
        <div className="bn-strip-code">
          <span className="label">Use Code:</span>
          <span className="code">KISAN40</span>
        </div>
        <button className="bn-strip-btn">Claim Free Offer</button>
      </div>

      {/* REDESIGNED CARDS */}
      <div className="bn-section">
        <div className="bn-cards-new">

          {/* Big left card */}
          <div className="bn-card-big">
            <Link to="/products?category=grains" className="bn-c">
              <div className="bn-c-img">
                <img src={assets.banner1} alt="Grains" />
              </div>
              <div className="bn-c-overlay" />
              <div className="bn-c-body">
                <span className="bn-c-tag">Weekend 40% Off</span>
                <div className="bn-c-title">Fresh Grains &amp;<br />Pulses Direct</div>
                <div className="bn-c-sub">From farm to your door</div>
                <button className="bn-c-btn">Shop Now →</button>
              </div>
            </Link>
          </div>

          {/* Small top right */}
          <div className="bn-card-sm-top">
            <Link to="/products?category=vegetables" className="bn-c">
              <div className="bn-c-img">
                <img src={assets.banner2} alt="Vegetables" />
              </div>
              <div className="bn-c-overlay" />
              <div className="bn-c-body">
                <span className="bn-c-tag">Weekend 40% Off</span>
                <div className="bn-c-title">Everything So Fresh &amp; Delicious</div>
                <div className="bn-c-sub">Eat fresh every day</div>
                <button className="bn-c-btn">Shop Now →</button>
              </div>
            </Link>
          </div>

          {/* Small bottom right */}
          <div className="bn-card-sm-bot">
            <Link to="/products?category=fruits" className="bn-c">
              <div className="bn-c-img">
                <img src={assets.banner3} alt="Fruits" />
              </div>
              <div className="bn-c-overlay" />
              <div className="bn-c-body">
                <span className="bn-c-tag">Weekend 40% Off</span>
                <div className="bn-c-title">Seasonal Veggies &amp; Fruits</div>
                <div className="bn-c-sub">Handpicked quality</div>
                <button className="bn-c-btn">Shop Now →</button>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Banner;