import React from "react";
import "./AboutKisanDeals.css";
import { assets } from "../../assets/assets";

const AboutKisanDeals = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-text">
          <h2>About Jay Shree Kisan.</h2>
          <p>
            Jay Shree Kisan Deals is your premier online agricultural marketplace,
            seamlessly connecting farmers, agribusinesses, and buyers. Sellers
            can effortlessly showcase their produce, providing detailed listings
            with quantities and prices. On the other hand, buyers can easily
            explore a vast array of agricultural products and initiate deals
            with sellers to procure high-quality produce. Experience the future
            of agri-trade at your fingertips with KisanDeals!
          </p>
        </div>

        <div className="about-logo">
          <img
            src={assets.logo}
            alt="KisanDeals Logo"
            onError={(e) => {
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/8/8e/Placeholder_view_vector.svg";
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutKisanDeals;
