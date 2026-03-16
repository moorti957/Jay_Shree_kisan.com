import React, { useState } from "react";
import Swal from "sweetalert2";
import "./BuySellForm.css";

const stateDistricts = {
  "UP": ["Agra", "Lucknow", "Varanasi", "Kanpur", "Noida", "Prayagraj", "Ghaziabad", "Aligarh", "Meerut", "Bareilly", "Gorakhpur", "Moradabad", "Saharanpur"],
  "MH": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Kolhapur", "Solapur", "Amravati", "Satara"],
  "RJ": ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer", "Bikaner", "Alwar", "Sikar", "Bharatpur"],
  "DL": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi", "Shahdara"],
  "GJ": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Junagadh", "Kutch"],
  "MP": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Satna", "Rewa"],
  "BR": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", "Ara", "Begusarai"],
  "WB": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", "Murshidabad"],
  "TN": ["Chennai", "Madurai", "Coimbatore", "Tiruchirappalli", "Salem", "Erode", "Tirunelveli"],
  "KA": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Davangere", "Shivamogga"],
  "KL": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kannur", "Alappuzha", "Kollam"],
  "PB": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Gurdaspur"],
  "HR": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Hisar", "Sonipat", "Rohtak"],
  "AS": ["Guwahati", "Dibrugarh", "Silchar", "Tezpur", "Jorhat", "Nagaon", "Bongaigaon"],
  "JK": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Kupwara", "Pulwama"],
  "UK": ["Dehradun", "Haridwar", "Nainital", "Almora", "Pauri Garhwal", "Tehri Garhwal"],
  "OD": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Balasore", "Sambalpur"],
  "CH": ["Chandigarh"],
  "AN": ["Port Blair"],
  "PY": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  "LA": ["Leh", "Kargil"],
  "LD": ["Kavaratti"],
  "DH": ["Daman", "Diu", "Silvassa"]
};

const BuySellForm = () => {
  const [formData, setFormData] = useState({
    type: "SELL",
    commodity: "",
    quantity: "",
    state: "",
    district: "",
    quality: "Good",
    availableFrom: "",
    language: "English",
    comments: "",
    isOrganic: false,
    isProcessed: false,
    isGraded: false,
    isPacked: false,
    isStoredAC: false,
    image: null,
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire({
          title: " Success!",
          text: "Form submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload(); 
        });
        console.log("Saved Product:", data.product);
      } else {
        Swal.fire({
          title: " Error!",
          text: data.error,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: " Failed!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="form-container">
      <h3>List Your Product For Sale</h3>
      <form onSubmit={handleSubmit}>
        {/* Buy / Sell */}
        <label>Do you want to Buy / Sell</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="SELL">SELL</option>
          <option value="BUY">BUY</option>
        </select>

        {/* Commodity */}
        <label>Commodity</label>
        <input
          className="commodity"
          type="text"
          name="commodity"
          placeholder="Ex: Tomato, Potato, Onions"
          value={formData.commodity}
          onChange={handleChange}
        />

        {/* Quantity */}
        <label>Available Quantity</label>
        <input
          className="commodity"
          type="text"
          name="quantity"
          placeholder="100 KG, 10 TON..."
          value={formData.quantity}
          onChange={handleChange}
        />

        {/* State & District */}
        <label>State</label>
        <select name="state" value={formData.state} onChange={handleChange}>
          <option value="">-- Select Your State --</option>
          <option value="AP">Andhra Pradesh</option>
          <option value="AR">Arunachal Pradesh</option>
          <option value="AS">Assam</option>
          <option value="BR">Bihar</option>
          <option value="CG">Chhattisgarh</option>
          <option value="GA">Goa</option>
          <option value="GJ">Gujarat</option>
          <option value="HR">Haryana</option>
          <option value="HP">Himachal Pradesh</option>
          <option value="JH">Jharkhand</option>
          <option value="KA">Karnataka</option>
          <option value="KL">Kerala</option>
          <option value="MP">Madhya Pradesh</option>
          <option value="MH">Maharashtra</option>
          <option value="MN">Manipur</option>
          <option value="ML">Meghalaya</option>
          <option value="MZ">Mizoram</option>
          <option value="NL">Nagaland</option>
          <option value="OD">Odisha</option>
          <option value="PB">Punjab</option>
          <option value="RJ">Rajasthan</option>
          <option value="SK">Sikkim</option>
          <option value="TN">Tamil Nadu</option>
          <option value="TS">Telangana</option>
          <option value="TR">Tripura</option>
          <option value="UP">Uttar Pradesh</option>
          <option value="UK">Uttarakhand</option>
          <option value="WB">West Bengal</option>
          <option value="AN">Andaman and Nicobar Islands</option>
          <option value="CH">Chandigarh</option>
          <option value="DH">Dadra and Nagar Haveli and Daman and Diu</option>
          <option value="DL">Delhi</option>
          <option value="JK">Jammu and Kashmir</option>
          <option value="LA">Ladakh</option>
          <option value="LD">Lakshadweep</option>
          <option value="PY">Puducherry</option>
        </select>

        <label>District</label>
        <select name="district" value={formData.district} onChange={handleChange}>
          <option value="">-- Select Your District --</option>
          {formData.state &&
            stateDistricts[formData.state]?.map((district, idx) => (
              <option key={idx} value={district}>
                {district}
              </option>
            ))}
        </select>

        {/* Quality */}
        <label>Quality</label>
        <select name="quality" value={formData.quality} onChange={handleChange}>
          <option value="Good">Good</option>
          <option value="Average">Average</option>
          <option value="Best">Best</option>
        </select>

        {/* Date */}
        <label>Available From</label>
        <input
          className="commodity"
          type="date"
          name="availableFrom"
          value={formData.availableFrom}
          onChange={handleChange}
        />

        {/* Language */}
        <label>Language Preference</label>
        <select name="language" value={formData.language} onChange={handleChange}>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>

        {/* Comments */}
        <label>Comments</label>
        <textarea
          name="comments"
          placeholder="I want to sell my product."
          value={formData.comments}
          onChange={handleChange}
        ></textarea>

        {/* Checkboxes */}
        <div className="checkbox-group">
          <label>
            <input

              type="checkbox"
              name="isOrganic"
              checked={formData.isOrganic}
              onChange={handleChange}
            />
            Is It Organic Product?
          </label>
          <label>
            <input
              type="checkbox"
              name="isProcessed"
              checked={formData.isProcessed}
              onChange={handleChange}
            />
            Is Product Processed?
          </label>
          <label>
            <input
              className="commodity"
              type="checkbox"
              name="isGraded"
              checked={formData.isGraded}
              onChange={handleChange}
            />
            Is Product Graded?
          </label>
          <label>
            <input
              className="commodity"
              type="checkbox"
              name="isPacked"
              checked={formData.isPacked}
              onChange={handleChange}
            />
            Is Product Packed in Bags?
          </label>
          <label>
            <input
              className="commodity"
              type="checkbox"
              name="isStoredAC"
              checked={formData.isStoredAC}
              onChange={handleChange}
            />
            Is Product Stored in A.C?
          </label>
        </div>

        {/* File Upload */}
        <label>Images</label>
        <input type="file" name="image" onChange={handleChange} />

        {/* Contact Details */}
        <h4 className="Your">Your Contact Details</h4>
        <input
          type="text"
          name="name"
          className="name"
          placeholder="Please Enter Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          className="name"
          placeholder="Please Enter Your Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Terms */}
        <label className="terms">
          I am agree with Terms And Conditions <input type="checkbox" required />
        </label>

        {/* Submit */}
        <button className="Submit_1" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BuySellForm;
