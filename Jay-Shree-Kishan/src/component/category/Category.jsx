import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaUsers, FaHandshake, FaBell, FaMobileAlt } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import { GiEggClutch } from "react-icons/gi";
import "./Category.css";
import { Link } from "react-router-dom";

const Features = () => {
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null); 
  const [height, setHeight] = useState("0");

  // ✅ Yaha har feature ka alag link diya hai
  const features = [

    // { icon: <FaPlus />, title: "Buy / Sell" },
    // { icon:   <FiTrendingUp /> , title: "View Mandi Prices" },
    // { icon: <FaUsers />, title: "View Buyers" },
    // { icon: <FaHandshake />, title: "View Sellers" },
    // { icon: <Link to='/mandiprice'><GiEggClutch /></Link>, title: "Egg Prices" },
    // { icon: <Link to='/trendingPrices'><HiOutlineChartBar /></Link>, title: "Explore Mandi Price Trends", premium: true },
    // { icon: <FaBell />, title: "Alerts for Daily Price Changes", premium: true },
    // { icon: <FaMobileAlt />, title: "Download KisanDeals Mobile App" },

    { icon: <FaPlus />, title: "Buy / Sell", link: "/buySellForm" },
    { icon: <FiTrendingUp />, title: "View Mandi Prices", link: "/marketTable" },
    { icon: <FaUsers />, title: "View Buyers", link: "/categoryPage" },
    { icon: <FaHandshake />, title: "View Sellers", link: "/categoryPage" },
    { icon: <GiEggClutch />, title: "Egg Prices", link: "/eggRateTable" },
    { icon: <HiOutlineChartBar />, title: "Explore Mandi Price Trends", premium: true, link: "/trendingPrices" },
    { icon: <FaBell />, title: "Alerts for Daily Price Changes", premium: true, link: "/trendingPrices" },
    { icon: <FaMobileAlt />, title: "Download KisanDeals Mobile App", link: "/download-app" },

  ];

  useEffect(() => {
    if (showMore) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [showMore]);

  return (
    <div className="container">
      <div className="features-section">
        <h2>Explore Our Features</h2>

        {/* First 4 Features */}
        <div className="features-grid">
          {features.slice(0, 4).map((f, i) => (
            <Link to={f.link} key={i} className="feature-card">
              <div className="feature-icon">
                {f.icon}
                {f.premium && <span className="crown">★</span>}
              </div>
              <p>{f.title}</p>
            </Link>
          ))}
        </div>

        {/* Collapsible Section */}
        <div
          className="slide-wrapper"
          style={{ maxHeight: height }}
          ref={contentRef}
        >
          <div className="m-features-grid">
            {features.slice(4).map((f, i) => (
              <Link to={f.link} key={i} className="m-feature-card">
                <div className="feature-icon">
                  {f.icon}
                  {f.premium && <span className="crown">★</span>}
                </div>
                <p>{f.title}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Toggle Button */}
        <p 
          className="toggle-text" 
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "See Less Features ▲" : "See More Features ▼"}
        </p>
      </div>
    </div>
  );
};

export default Features;
