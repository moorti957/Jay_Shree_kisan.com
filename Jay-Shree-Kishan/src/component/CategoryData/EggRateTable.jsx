import React from "react";
import "./EggRateTable.css";
import Features from "../category/Category";
import Search from "../Searchbar/Search";
import EggRates from "./EggRates";

const EggRateTable = () => {
  const data = [
    { label: "Single Egg Rate", value: "₹ 2.45" },
    { label: "Dozen Eggs Rate", value: "₹ 29.39" },
    { label: "100 Eggs Rate", value: "₹ 245.96" },
    { label: "Average Market Price", value: "₹ 541 / 100 Eggs" },
    { label: "Best Market Price", value: "₹ 615 / 100 Eggs" },
    { label: "Lowest Market Price", value: "₹ 480 / 100 Eggs" },
    { label: "Best Price Market", value: "Kolkata" },
    { label: "Lowest Price Market", value: "Hospet" },
  ];

  return (
    <>
    <Features/>
    <Search/>
    <div className="egg-container">
      

      <table className="egg-table">
        <h3>NECC Egg Rate Today In India</h3>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.label}</td>
              <td><strong>{item.value}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="note-class">
        <p className="notes">
        Stay updated on NECC's latest egg rates in India: ₹5.45 per piece or
        ₹544.96 per 100 eggs. 1 tray (approx. 30 eggs) is priced at ₹163.49,
        while 1 peti costs ₹1144.41. Crucial for industry professionals and
        consumers alike, knowing these rates helps plan operations effectively
        and make informed purchases. Stay ahead in the market with these current
        prices for optimal decision-making.
      </p>
      </div>
    </div>
    <EggRates/>
    </>
  );
};

export default EggRateTable;
