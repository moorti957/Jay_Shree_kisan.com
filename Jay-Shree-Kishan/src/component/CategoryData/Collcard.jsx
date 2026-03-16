import React, { useState } from "react";
import "./Collcard.css";

const Collcard = () => {
  const [activeTab, setActiveTab] = useState("buyer"); 
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(3); // 🔹 Default 3 cards


  // ✅ Buyer data
  const buyers = [
    { name: "Ramesh Kumar", location: "Jaipur, Rajasthan", need: "Wheat Seeds", quantity: "50 kg", expectedPrice: "₹30 / kg", neededBy: "5 Sept 2025", paymentMode: "UPI / Bank Transfer", urgency: "Urgent", phone: "+919876556688" },
    { name: "Sita Devi", location: "Lucknow, Uttar Pradesh", need: "Fertilizers", quantity: "20 Bags", expectedPrice: "₹1000 / Bag", neededBy: "12 Sept 2025", paymentMode: "Cash / UPI", urgency: "Normal", phone: "+919812345678" },
    { name: "Prince Kumar", location: "Mumbai, Maharashtra", need: "Wheat", quantity: "5000 kg", expectedPrice: "₹27 / kg", neededBy: "20 Sept 2025", paymentMode: "Bank Transfer", urgency: "Urgent", phone: "+919876998877" },
    { name: "Amit Verma", location: "Bhopal, Madhya Pradesh", need: "Soybean Seeds", quantity: "100 kg", expectedPrice: "₹55 / kg", neededBy: "10 Sept 2025", paymentMode: "UPI", urgency: "Normal", phone: "+919876443322" },
    { name: "Kavita Sharma", location: "Patna, Bihar", need: "Organic Fertilizer", quantity: "15 Bags", expectedPrice: "₹900 / Bag", neededBy: "25 Sept 2025", paymentMode: "Cash / UPI", urgency: "Urgent", phone: "+919823456789" },
    { name: "Rajesh Gupta", location: "Delhi", need: "Pesticides", quantity: "12 Litres", expectedPrice: "₹300 / Litre", neededBy: "8 Sept 2025", paymentMode: "UPI", urgency: "Urgent", phone: "+919845612378" },
    { name: "Sunita Yadav", location: "Chandigarh", need: "Vegetable Seeds", quantity: "25 Packets", expectedPrice: "₹60 / Packet", neededBy: "18 Sept 2025", paymentMode: "Bank Transfer", urgency: "Normal", phone: "+919812367890" },
    { name: "Pooja Singh", location: "Ahmedabad, Gujarat", need: "Cotton Seeds", quantity: "80 kg", expectedPrice: "₹65 / kg", neededBy: "30 Sept 2025", paymentMode: "Cash", urgency: "Normal", phone: "+919867543210" },
    { name: "Mohit Kumar", location: "Kanpur, Uttar Pradesh", need: "Rice Seeds", quantity: "200 kg", expectedPrice: "₹40 / kg", neededBy: "15 Sept 2025", paymentMode: "UPI / Bank Transfer", urgency: "Urgent", phone: "+919876223344" },
    { name: "Neha Rani", location: "Hyderabad, Telangana", need: "Groundnut Seeds", quantity: "300 kg", expectedPrice: "₹70 / kg", neededBy: "22 Sept 2025", paymentMode: "UPI", urgency: "Normal", phone: "+919812345900" },
  ];

  // ✅ Seller data
  const sellers = [
    { name: "Mohan Lal", location: "Indore, Madhya Pradesh", product: "Tractor Rental", quantity: "5 Days", price: "₹2000 / Day", minOrder: "1 Day", availableTill: "20 Sept 2025", paymentMode: "Cash / UPI", delivery: "On-Site Service Only", rating: "4.6 ⭐", phone: "+919812345678" },
    { name: "Anita Sarma", location: "Patna, Bihar", product: "Organic Pesticides", quantity: "50 kg", price: "₹250 / kg", minOrder: "5 kg", availableTill: "15 Sept 2025", paymentMode: "UPI / Bank Transfer", delivery: "Home Delivery Available", rating: "4.8 ⭐", phone: "+919876112233" },
    { name: "Vikram Singh", location: "Nagpur, Maharashtra", product: "Wheat", quantity: "2000 kg", price: "₹28 / kg", minOrder: "100 kg", availableTill: "30 Sept 2025", paymentMode: "Cash / UPI", delivery: "Pickup & Delivery", rating: "4.5 ⭐", phone: "+919845612378" },
    { name: "Radha Devi", location: "Ahmedabad, Gujarat", product: "Cotton Seeds", quantity: "300 kg", price: "₹70 / kg", minOrder: "20 kg", availableTill: "18 Sept 2025", paymentMode: "UPI / Bank Transfer", delivery: "Delivery Available", rating: "4.7 ⭐", phone: "+919876998877" },
    { name: "Sunil Yadav", location: "Delhi", product: "Vegetable Seeds Packets", quantity: "200 Packets", price: "₹50 / Packet", minOrder: "10 Packets", availableTill: "22 Sept 2025", paymentMode: "Cash / UPI", delivery: "Pickup Only", rating: "4.4 ⭐", phone: "+919812367890" },
    { name: "Geeta Kumari", location: "Chandigarh", product: "Fertilizers", quantity: "120 Bags", price: "₹950 / Bag", minOrder: "5 Bags", availableTill: "28 Sept 2025", paymentMode: "UPI / Bank Transfer", delivery: "Home Delivery", rating: "4.6 ⭐", phone: "+919876443322" },
    { name: "Ravi Patel", location: "Surat, Gujarat", product: "Soybean Seeds", quantity: "400 kg", price: "₹52 / kg", minOrder: "50 kg", availableTill: "10 Oct 2025", paymentMode: "Cash / Bank Transfer", delivery: "Pickup & Delivery", rating: "4.9 ⭐", phone: "+919823456789" },
    { name: "Manoj Sharma", location: "Lucknow, Uttar Pradesh", product: "Groundnut Seeds", quantity: "250 kg", price: "₹72 / kg", minOrder: "25 kg", availableTill: "17 Sept 2025", paymentMode: "UPI", delivery: "Pickup Only", rating: "4.3 ⭐", phone: "+919812311122" },
    { name: "Poonam Devi", location: "Hyderabad, Telangana", product: "Pesticides", quantity: "15 Litres", price: "₹320 / Litre", minOrder: "2 Litres", availableTill: "12 Sept 2025", paymentMode: "Cash / UPI", delivery: "Home Delivery Available", rating: "4.5 ⭐", phone: "+919876778899" },
    { name: "Harish Mehta", location: "Bangalore, Karnataka", product: "Rice Seeds", quantity: "600 kg", price: "₹42 / kg", minOrder: "50 kg", availableTill: "5 Oct 2025", paymentMode: "UPI / Bank Transfer", delivery: "Pickup & Delivery", rating: "4.7 ⭐", phone: "+919812345001" },
  ];

  // Active data
  const dataToShow = activeTab === "buyer" ? buyers : sellers;

  // Location list (unique)
  const uniqueLocations = [...new Set(dataToShow.map((item) => item.location))];

  // Filter + Search
  const filteredData = dataToShow.filter((farmer) => {
    const searchText = search.toLowerCase();
    const inSearch =
      farmer.name.toLowerCase().includes(searchText) ||
      farmer.location.toLowerCase().includes(searchText) ||
      (activeTab === "buyer"
        ? farmer.need.toLowerCase().includes(searchText)
        : farmer.product.toLowerCase().includes(searchText)
      );

    const inLocation = locationFilter === "" || farmer.location === locationFilter;

    return inSearch && inLocation;
  });

  // Slice data for pagination
  const limitedData = filteredData.slice(0, visibleCount);

  return (
    <div className="Callcard">
      {/* 🔘 Toggle Buttons */}
      <div className="toggle-box">
        <button className={`tab-btn ${activeTab === "buyer" ? "active" : ""}`}
          onClick={() => { setActiveTab("buyer"); setSearch(""); setLocationFilter(""); setVisibleCount(3); }}
        >
        Buyer
        </button>

        <button className={`tab-btn ${activeTab === "seller" ? "active" : ""}`}
          onClick={() => { setActiveTab("seller"); setSearch(""); setLocationFilter(""); setVisibleCount(3);}}
        >
        Seller
        </button>
      </div>

      {/* 🔍 Search + Filter */}
      <div className="filter-box">
        <input type="text" placeholder={`Search ${activeTab}...`} value={search} onChange={(e) => setSearch(e.target.value)} />

        <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} >
          <option value="">All Locations</option>
          {uniqueLocations.map((loc, i) => (
            <option key={i} value={loc}>
              {loc}
            </option>
          ))}
        </select>

      </div>

      {/* 📦 Cards */}
      <div className="container">
        {limitedData.length > 0 ? (
          limitedData.map((farmer, index) => (
            <div className="card" key={index}>
              <div className="farmer-icon">👩‍🌾</div>
              <div className="farmer-name">{farmer.name}</div>

              <div className="info">

                <p><strong>Location :</strong> {farmer.location}</p>

                {activeTab === "buyer" ? (
                  <>
                    <p><strong>Need to Buy :</strong> {farmer.need}</p>
                    <p><strong>Quantity :</strong> {farmer.quantity}</p>
                    <p><strong>Expected Price :</strong> {farmer.expectedPrice}</p>
                    <p><strong>Needed By :</strong> {farmer.neededBy}</p>
                    <p><strong>Payment Mode :</strong> {farmer.paymentMode}</p>
                    <p><strong>Urgency :</strong> {farmer.urgency}</p>
                  </>
                ) : (
                  <>
                    <p><strong>Product to Sell :</strong> {farmer.product}</p>
                    <p><strong>Quantity :</strong> {farmer.quantity}</p>
                    <p><strong>Price :</strong> {farmer.price}</p>
                    <p><strong>Min Order :</strong> {farmer.minOrder}</p>
                    <p><strong>Available Till :</strong> {farmer.availableTill}</p>
                    <p><strong>Payment Mode :</strong> {farmer.paymentMode}</p>
                    <p><strong>Delivery :</strong> {farmer.delivery}</p>
                    <p><strong>Rating :</strong> {farmer.rating}</p>
                  </>
                )}

              </div>
              
              <a href={`tel:${farmer.phone}`} className="contact-btn">
                Contact Now
              </a>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No {activeTab === "buyer" ? "Buyers" : "Sellers"} Found
          </p>
        )}
      </div>

      {/* 🔽 View More / View Le/ss */}
      {filteredData.length > 3 && (
        <div className="view-btn-box">
          <button className="view-btn"
            onClick={() => visibleCount >= filteredData.length ? setVisibleCount(3) : setVisibleCount(visibleCount + 3) }
          >

          {visibleCount >= filteredData.length ? "View Less" : "View More"}

          </button>
        </div>
      )}
      
    </div>
  );
};

export default Collcard;
