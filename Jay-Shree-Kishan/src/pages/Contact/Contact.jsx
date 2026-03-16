import React, { useState } from "react";
import "./Contact.css";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ import SweetAlert2

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enquiry: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);

      // ✅ success popup
      Swal.fire({
        title: "Success!",
        text: "Your enquiry has been sent successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      setFormData({ name: "", email: "", enquiry: "" });
      console.log("Server response:", res.data);
    } catch (error) {
      console.error("Error submitting form:", error);

      // ❌ error popup
      Swal.fire({
        title: "Error!",
        text: "Failed to submit your enquiry. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="contact-container">
      <div className="contact">
        <span>
          <Link to="/">
            <FaHome className="home-icon" />
          </Link>
        </span>{" "}
        | Contact Us
      </div>

      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-grid">
        <div className="location">
          <h2>Our Location</h2>
          <p>🏠 Address 1</p>
          <p>📞 123456789</p>
        </div>

        <div className="contact-form">
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <span className="required">*</span> Your Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span className="required">*</span> E-Mail Address
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span className="required">*</span> Enquiry
              <textarea
                name="enquiry"
                value={formData.enquiry}
                onChange={handleChange}
                required
              ></textarea>
            </label>

            <div className="button-wrapper">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
