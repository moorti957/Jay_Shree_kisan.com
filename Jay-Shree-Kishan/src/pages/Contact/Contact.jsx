import React, { useState } from "react";
import "./Contact.css";
import {
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enquiry: "",
  });
  const API = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/contact`, formData);

      Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully.",
        icon: "success",
        confirmButtonColor: "#1a4d2e",
        confirmButtonText: "OK",
      });

      setFormData({ name: "", email: "", enquiry: "" });
      console.log("Server response:", res.data);
    } catch (error) {
      console.error("Error submitting form:", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to send your message. Please try again.",
        icon: "error",
        confirmButtonColor: "#c0392b",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="ct-wrap">

      {/* Breadcrumb */}
      <div className="ct-bread">
        <Link to="/" className="ct-bread-home">
          <FaHome className="ct-bread-icon" /> Home
        </Link>
        <span className="ct-bread-sep">|</span>
        <span className="ct-bread-current">Contact Us</span>
      </div>

      {/* Hero Header */}
      <div className="ct-top">
        <div className="ct-pill">
          <span className="ct-dot"></span>
          We Are Here For You
        </div>
        <h1 className="ct-title">
          Get In <span>Touch</span> With Us
        </h1>
        <p className="ct-sub">
          Have any questions? We are always here — straight from the farm to you!
        </p>
      </div>

      {/* Main Grid */}
      <div className="ct-grid">

        {/* Info Panel */}
        <div className="ct-info">
          <div className="ct-info-header">
            <h2 className="ct-info-title">Our Information</h2>
            <p className="ct-info-desc">Reach us through any of the options below</p>
          </div>

          <div className="ct-info-item">
            <div className="ct-info-icon">
              <FaMapMarkerAlt />
            </div>
            <div className="ct-info-text">
              <p className="ct-info-label">Our Address</p>
              <span className="ct-info-val">Address 1, Village, District</span>
            </div>
          </div>

          <div className="ct-divider"></div>

          <div className="ct-info-item">
            <div className="ct-info-icon">
              <FaPhone />
            </div>
            <div className="ct-info-text">
              <p className="ct-info-label">Phone Number</p>
              <span className="ct-info-val">+91 123456789</span>
            </div>
          </div>

          <div className="ct-divider"></div>

          <div className="ct-info-item">
            <div className="ct-info-icon">
              <FaEnvelope />
            </div>
            <div className="ct-info-text">
              <p className="ct-info-label">Email Address</p>
              <span className="ct-info-val">info@jaysreekisan.com</span>
            </div>
          </div>

          <div className="ct-divider"></div>

          <div className="ct-info-item">
            <div className="ct-info-icon">
              <FaClock />
            </div>
            <div className="ct-info-text">
              <p className="ct-info-label">Working Hours</p>
              <span className="ct-info-val">Mon – Sat: 9 AM – 6 PM</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="ct-form-card">
          <h2 className="ct-form-title">Send Us a Message</h2>

          <form onSubmit={handleSubmit}>
            <div className="ct-field">
              <label>
                <span className="ct-req">*</span> Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ramesh Kumar"
                required
              />
            </div>

            <div className="ct-field">
              <label>
                <span className="ct-req">*</span> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. ramesh@example.com"
                required
              />
            </div>

            <div className="ct-field">
              <label>
                <span className="ct-req">*</span> Your Enquiry
              </label>
              <textarea
                name="enquiry"
                value={formData.enquiry}
                onChange={handleChange}
                placeholder="Write your question or message here..."
                required
              ></textarea>
            </div>

            <button type="submit" className="ct-btn">
              <FaPaperPlane className="ct-btn-icon" />
              Submit
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;