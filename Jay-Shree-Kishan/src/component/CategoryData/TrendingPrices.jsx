import React from "react";
import "./TrendingPrices.css";
import Features from "../category/Category";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "1 Month Plan",
    price: "₹99",
    tag: "Starter Plan",
    highlight: true,
    features: [
      "✔ Experience the Power – Test all premium features for one month.",
      "✔ See the Difference – Understand how data can transform your trading.",
      "✔ No Long-Term Commitment!"
    ],
    buttonText: "Subscribe to the 1-Month Plan",
  },
  {
    name: "3 Months Package",
    price: "₹299",
    tag: "Popular",
    highlight: true,
    features: [
      "✔ Real-time Price Alerts – Get instant notifications for your desired crops.",
      "✔ Advanced Trend Analysis – View historical Mandi prices to predict future movements.",
      "✔ Data Export – Download Mandi data for your own deep analysis."
    ],
    buttonText: "Buy 3-Month Plan",
  },
  {
    name: "6 Months Package",
    price: "₹499",
    tag: "",
    highlight: false,
    features: [
      "✔ Continuous Insights – Stay informed across multiple harvesting seasons.",
      "✔ Strategic Planning – Use long-term data for better crop and market decisions.",
      "✔ All features of the 3-Month Plan."
    ],
    buttonText: "Buy 6-Month Plan",
  },
  {
    name: "1 Year Package",
    price: "₹799",
    tag: "Best Value",
    highlight: true,
    features: [
      "✔ Year-Round Dominance – Be the most informed trader in your region.",
      "✔ Maximum Savings – Lock in your rate and save up to 40%.",
      "✔ Uninterrupted insights for a full year!"
    ],
    buttonText: "Buy 1-Year Plan",
  },
];

const TrendingPrices = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleBuy = (plan) => {
  const token = localStorage.getItem("token"); // check if user logged in
  if (!token) {
    // user not logged in → signup page
    navigate("/signUp", { state: { plan } });
  } else {
    // user logged in → payment page
    navigate("/payment", { state: { plan } });
  }
};


  return (
    <>
      <Features />
      <div className="pricing-container">
        <h2 className="title">Trade Smarter with Premium Mandi Data</h2>
        <p className="subtitle">
          Stop guessing and start profiting. Our premium plans give you the tools to make data-driven decisions. 
          Set real-time price alerts, analyze historical trends, and export data for your own analysis. 
          This is how smart traders stay ahead of the market.
        </p>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`plan-card ${plan.highlight ? "highlight" : ""}`}
            >
              {plan.tag && <div className="tag">{plan.tag}</div>}
              <h3>{plan.name}</h3>
              <h2 className="price">{plan.price}</h2>
              <ul>
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button
                className="bton"
                onClick={() => handleBuy(plan)}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrendingPrices;
