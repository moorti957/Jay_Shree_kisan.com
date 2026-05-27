import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaUsers, FaHandshake, FaBell, FaMobileAlt, FaCrown } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import { GiEggClutch } from "react-icons/gi";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <FaPlus />,
    title: "Buy / Sell",
    desc: "Post your product or requirement instantly",
    link: "/buySellForm",
    color: "#02933c",
  },
  {
    icon: <FiTrendingUp />,
    title: "View Mandi Prices",
    desc: "Live wholesale prices from all mandis",
    link: "/marketTable",
    color: "#02933c",
  },
  {
    icon: <FaUsers />,
    title: "View Buyers",
    desc: "Connect with verified buyers near you",
    link: "/categoryPage",
    color: "#02933c",
  },
  {
    icon: <FaHandshake />,
    title: "View Sellers",
    desc: "Find trusted sellers for your needs",
    link: "/categoryPage",
    color: "#02933c",
  },
  {
    icon: <GiEggClutch />,
    title: "Egg Prices",
    desc: "Daily egg rates across all regions",
    link: "/eggRateTable",
    color: "#02933c",
  },
  {
    icon: <HiOutlineChartBar />,
    title: "Mandi Price Trends",
    desc: "Historical charts & price forecasting",
    link: "/trendingPrices",
    color: "#02933c",
    premium: true,
  },
  {
    icon: <FaBell />,
    title: "Daily Price Alerts",
    desc: "Get notified when prices change",
    link: "/trendingPrices",
    color: "#02933c",
    premium: true,
  },
  {
    icon: <FaMobileAlt />,
    title: "KisanDeals Mobile App",
    desc: "Trade on the go, anytime anywhere",
    link: "/download-app",
    color: "#02933c",
  },
];

const FeatureCard = ({ f, index, visible }) => (
  <Link
    to={f.link}
    style={{
      textDecoration: "none",
      display: "block",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.45s ease ${index * 0.07}s, transform 0.45s ease ${index * 0.07}s`,
    }}
  >
    <div className="feat-card">
      {f.premium && (
        <div className="feat-premium-badge">
          <FaCrown style={{ fontSize: 9, marginRight: 3 }} /> Premium
        </div>
      )}
      <div
        className="feat-icon-wrap"
        style={{ background: `linear-gradient(135deg, ${f.color}18, ${f.color}30)` }}
      >
        <span style={{ color: f.color, fontSize: 26, display: "flex" }}>{f.icon}</span>
      </div>
      <div className="feat-title">{f.title}</div>
      <div className="feat-desc">{f.desc}</div>
      <div className="feat-arrow" style={{ color: f.color }}>
        Explore →
      </div>
    </div>
  </Link>
);

const Features = () => {
  const [showMore, setShowMore] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false);
  const contentRef = useRef(null);
  const sectionRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  // Intersection observer for entrance animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCardsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Smooth height transition
  useEffect(() => {
    if (showMore) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
      setTimeout(() => setMoreVisible(true), 50);
    } else {
      setMoreVisible(false);
      setTimeout(() => setMaxHeight("0px"), 50);
    }
  }, [showMore]);

  return (
    <>
      <style>{`
        .feat-section {
          padding: 64px 24px 48px;
          background: linear-gradient(180deg, #f4faf6 0%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }

        /* Subtle background dots */
        .feat-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #2d7a4f1a 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          opacity: 0.5;
        }

        .feat-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .feat-header {
          text-align: center;
          margin-bottom: 52px;
        }
        .feat-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: #e8f5ee;
          color: #2d7a4f;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 50px;
          margin-bottom: 14px;
          border: 1px solid #c3e6d0;
        }
        .feat-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #018e3e;
          animation: featPulse 1.8s ease-in-out infinite;
        }
        @keyframes featPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
        .feat-title {
          font-size: clamp(26px, 4vw, 38px);
          color: #1a4d2e;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .feat-title em {
          font-style: normal;
          color: #2d7a4f;
          position: relative;
          font 
        }
       
        .feat-subtitle {
          font-size: 15px; color: #6b7c6b;
          max-width: 480px; margin: 0 auto; line-height: 1.6;
        }

        /* Grid */
        .feat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        /* Card */
        .feat-card {
          background: #ffffff;
          border: 1.5px solid #e0ece0;
          border-radius: 16px;
          padding: 24px 20px 20px;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          position: relative;
          overflow: hidden;
        }
       
        .feat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(26,77,46,0.13);
          border-color: #b0d8b8;
        }
        .feat-card:hover::before { opacity: 1; }

        /* Premium badge */
        .feat-premium-badge {
          position: absolute; top: 12px; right: 12px;
          background: linear-gradient(135deg, #e8a020, #f5c842);
          color: #7a4800;
          font-size: 9px; font-weight: 700;
          padding: 3px 8px; border-radius: 50px;
          display: flex; align-items: center;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* Icon */
        .feat-icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
          transition: transform 0.25s ease;
        }
        .feat-card:hover .feat-icon-wrap { transform: scale(1.08) rotate(-3deg); }

        .feat-title {
          font-size: 18px; font-weight: 700;
          color: #1c1c1c; margin-bottom: 6px; line-height: 1.3;
        }
        .feat-desc {
          font-size: 12px; color: #6b7c6b;
          line-height: 1.5; margin-bottom: 14px;
        }
        .feat-arrow {
          font-size: 12px; font-weight: 600;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s, transform 0.2s;
        }
        .feat-card:hover .feat-arrow { opacity: 1; transform: translateX(0); }

        /* Collapse wrapper */
        .feat-collapse {
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Toggle button */
        .feat-toggle {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin: 32px auto 0;
          background: none; border: 2px solid #2d7a4f;
          color: #2d7a4f; padding: 11px 28px; border-radius: 50px;
          font-weight: 700; font-size: 14px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .feat-toggle:hover {
          background: #2d7a4f; color: white;
          transform: translateY(-2px);
        }
        .feat-toggle-icon {
          font-size: 18px; font-weight: 900;
          transition: transform 0.3s ease;
          display: inline-block;
          line-height: 1;
        }
        .feat-toggle-icon.open { transform: rotate(180deg); }

        /* Divider */
        .feat-divider {
          display: flex; align-items: center; gap: 14px;
          margin: 12px 0 20px;
        }
        .feat-divider-line { flex: 1; height: 1px; background: #e0ece0; }
        .feat-divider-label {
          font-size: 11px; color: #6b7c6b; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .feat-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .feat-section { padding: 48px 16px 40px; }
          .feat-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (max-width: 480px) {
          .feat-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .feat-card { padding: 18px 14px 16px; }
          .feat-icon-wrap { width: 44px; height: 44px; }
          .feat-title { font-size: 13px; }
          .feat-desc  { font-size: 11px; display: none; }
        }
      `}</style>

      <section className="feat-section" ref={sectionRef}>
        <div className="feat-inner">

          {/* Header */}
          <div className="feat-header">
            <div className="feat-eyebrow">
              <span className="feat-eyebrow-dot" />
              Jay Shree Kisan Platform
            </div>
            <h2 className="feat-title">
              Explore Our <em>Features</em>
            </h2>
            
          </div>

          {/* First 4 cards */}
          <div className="feat-grid">
            {features.slice(0, 4).map((f, i) => (
              <FeatureCard key={i} f={f} index={i} visible={cardsVisible} />
            ))}
          </div>

          {/* Collapsible more cards */}
          <div
            className="feat-collapse"
            style={{ maxHeight }}
            ref={contentRef}
          >
            <div className="feat-divider">
              <div className="feat-divider-line" />
              <span className="feat-divider-label">More Features</span>
              <div className="feat-divider-line" />
            </div>
            <div className="feat-grid">
              {features.slice(4).map((f, i) => (
                <FeatureCard key={i} f={f} index={i} visible={moreVisible} />
              ))}
            </div>
          </div>

          {/* Toggle */}
          <div style={{ textAlign: "center" }}>
            <button className="feat-toggle" onClick={() => setShowMore(!showMore)}>
              {showMore ? "See Less" : "See More Features"}
              <span className={`feat-toggle-icon${showMore ? " open" : ""}`}>▼</span>
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default Features;