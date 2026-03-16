import React from "react";
import "./EggRates.css";

const todayRates = [
  { market: "Andhra Pradesh", price: "₹5.42", tray: "₹162.6" },
  { market: "Bihar", price: "₹5.7", tray: "₹178.5" },
  { market: "Chhattisgarh", price: "₹5.4", tray: "₹162.0" },
  { market: "Delhi", price: "₹5.45", tray: "₹163.5" },
  { market: "Jharkhand", price: "₹5.9", tray: "₹177.0" },
  { market: "Karnataka", price: "₹5.28", tray: "₹158.4" },
  { market: "Madhya Pradesh", price: "₹5.3", tray: "₹159.0" },
  { market: "Maharashtra", price: "₹5.7", tray: "₹171.0" },
  { market: "Odisha", price: "₹5.7", tray: "₹171.0" },
  { market: "Punjab", price: "₹5.29", tray: "₹158.7" },
  { market: "Rajasthan", price: "₹5.3", tray: "₹159.0" },
  { market: "Tamil Nadu", price: "₹5.4", tray: "₹162.0" },
  { market: "Telangana", price: "₹5.6", tray: "₹168.0" },
  { market: "Uttar Pradesh", price: "₹5.65", tray: "₹169.5" },
  { market: "West Bengal", price: "₹6.2", tray: "₹186.0" },
];

const dailyRates = [
  { date: "28/08/2025", price: "₹5.5", tray: "₹165.0", pcs: "₹550.0" },
  { date: "27/08/2025", price: "₹5.45", tray: "₹163.5", pcs: "₹545.0" },
  { date: "26/08/2025", price: "₹5.36", tray: "₹160.8", pcs: "₹536.0" },
  { date: "25/08/2025", price: "₹5.32", tray: "₹159.6", pcs: "₹532.0" },
];

const marketRates = [
  { market: "NECC Egg Rate", price: "₹5.5", tray: "₹165.01" },
  { market: "Wholesale Egg Rate", price: "₹5.5", tray: "₹165.01" },
  { market: "Retail Egg Rate", price: "₹5.7", tray: "₹171.01" },
  { market: "Super Market Rate", price: "₹6.0", tray: "₹180.01" },
];

const EggRates = () => {
  return (
    <div className="egg-page">
      {/* Section 1 */}
      <div className="table-card">
        <h2>NECC Egg Rate Today in India.</h2>
        <table>
          <thead>
            <tr>
              <th>Market</th>
              <th>Price</th>
              <th>1 Tray</th>
            </tr>
          </thead>
          <tbody>
            {todayRates.map((row, i) => (
              <tr key={i}>
                <td>{row.market}</td>
                <td>{row.price}</td>
                <td>{row.tray}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 2 */}
      <div className="table-card">
        <h2>Daily NECC Egg Rates in India.</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Price</th>
              <th>1 Tray</th>
              <th>100 Pcs</th>
            </tr>
          </thead>
          <tbody>
            {dailyRates.map((row, i) => (
              <tr key={i}>
                <td>{row.date}</td>
                <td>{row.price}</td>
                <td>{row.tray}</td>
                <td>{row.pcs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3 */}
      <div className="table-card">
        <h2>NECC Egg Rate Today in India</h2>
        <table>
          <thead>
            <tr>
              <th>Market</th>
              <th>Price</th>
              <th>1 Tray</th>
            </tr>
          </thead>
          <tbody>
            {marketRates.map((row, i) => (
              <tr key={i}>
                <td>{row.market}</td>
                <td>{row.price}</td>
                <td>{row.tray}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Description */}
      <p className="note">
        Discover the current egg market rates in India, where NECC and wholesale prices remain steady at ₹5.5 per piece or ₹165.01 per tray. However, as eggs reach the retail market, prices witness a surge. Retail egg rates stand at ₹5.7 per piece or ₹171.01 per tray, while supermarkets offer eggs at ₹6.0 per piece or ₹180.01 per tray.
      </p>
    </div>
  );
};

export default EggRates;
