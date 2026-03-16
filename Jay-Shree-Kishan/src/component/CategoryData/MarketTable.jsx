import React from "react";
import "./MarketTable.css";
import Features from "../category/Category";
import Search from "../Searchbar/Search";

const MarketTable = () => {
  const markets = [
    {
      commodity: "Egg",
      variety: "egg",
      state: "Madhya Pradesh",
      district: "Bhopal",
      mandi: "Bhopal",
      minPrice: "₹ 530",
      modalPrice: "₹ 530",
      maxPrice: "₹ 530",
      date: "28/08/2025",
      trend: "Price Trend",
    },
    {
      commodity: "Egg",
      variety: "egg",
      state: "Maharashtra",
      district: "Pune",
      mandi: "Pune",
      minPrice: "₹ 555",
      modalPrice: "₹ 555",
      maxPrice: "₹ 555",
      date: "28/08/2025",
      trend: "Price Trend",
    },
    {
      commodity: "Egg",
      variety: "egg",
      state: "Uttar Pradesh",
      district: "Varanasi",
      mandi: "Varanasi",
      minPrice: "₹ 573",
      modalPrice: "₹ 573",
      maxPrice: "₹ 573",
      date: "28/08/2025",
      trend: "Price Trend",
    },
    {
      commodity: "Egg",
      variety: "egg",
      state: "Karnataka",
      district: "Mysuru",
      mandi: "Mysuru",
      minPrice: "₹ 553",
      modalPrice: "₹ 553",
      maxPrice: "₹ 553",
      date: "28/08/2025",
      trend: "Price Trend",
    },
  ];

  const similarMarkets = [
    "Egg mandi rate today in Jabalpur",
    "Egg mandi rate today in Chittoor",
    "Egg mandi rate today in Ranchi",
    "Egg mandi rate today in Hyderabad",
    "Egg mandi rate today in Varanasi",
    "Egg mandi rate today in Bhopal",
    "Egg mandi rate today in Kolkata",
    "Egg mandi rate today in Warangal",
    "Egg mandi rate today in Pune",
    "Egg mandi rate today in Mysuru",
  ];

  return (
    <>
    <Features/>
    <Search/>
    <div className="market-container">
      {/* Export Buttons */}
      <div className="export-btns">
        <button className="btn green">Export To Excel</button>
        <button className="btn green">Export To WhatsApp</button>
      </div>

      {/* Market Table */}
      <div className="table-container">
        <table className="market-table">
          <thead>
            <tr>
              <th>Commodity</th>
              <th>Variety</th>
              <th>State</th>
              <th>District</th>
              <th>Mandi / Market</th>
              <th>Min Price</th>
              <th>Modal Price</th>
              <th>Max Price</th>
              <th>Arrival Date</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((item, index) => (
              <tr key={index}>
                <td>{item.commodity}</td>
                <td>{item.variety}</td>
                <td>{item.state}</td>
                <td>{item.district}</td>
                <td>{item.mandi}</td>
                <td>{item.minPrice}</td>
                <td>{item.modalPrice}</td>
                <td>{item.maxPrice}</td>
                <td>{item.date}</td>
                <td className="trend-link">{item.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More */}
      <div className="load-more">
        <button className="btn green">Load More Markets ▼</button>
      </div>

      {/* Similar Markets */}
      <div className="similar-section">
        <h2>Similar Markets</h2>
        <div className="tags">
          {similarMarkets.map((market, index) => (
            <span key={index} className="tag">
              {market}
            </span>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default MarketTable;
