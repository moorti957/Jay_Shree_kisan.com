import React, { useState } from "react";
import { registerUser } from "../../api";
import "./Auth.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    username: "",
    password: "",
    repeatPassword: "",
    role: "Farmer",
    agree: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { plan } = location.state || {}; 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) return alert("Please agree to Terms and Conditions");
    if (form.password !== form.repeatPassword) return alert("Passwords do not match");

    try {
      const res = await registerUser(form);
      alert(res.data.message);

      // ✅ Save token and username in localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", form.username);
      }

      if (plan) {
      navigate("/payment", { state: { plan } });
    } else {
      navigate("/"); // normal homepage
    }

      // Navbar अपडेट करने के लिए reload या navigate
      window.location.reload(); // simple तरीका
      // या navigate('/') करके homepage पर भेज सकते हैं
      // navigate("/");

      // Clear form
      setForm({
        firstName: "",
        lastName: "",
        mobile: "",
        username: "",
        password: "",
        repeatPassword: "",
        role: "Farmer",
        agree: false,
      });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="signup-box">
      <h2 className="signup-title">Sign up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* First & Last Name */}
        <div className="input-row">
          <div className="input-col">
            <label>First name *</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          <div className="input-col">
            <label>Last name *</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        {/* Mobile */}
        <label>Mobile Number *</label>
        <div className="mobile-input">
          <span>+91</span>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
          />
        </div>
        <small>We'll never share your mobile number with anyone else.</small>

        {/* Username */}
        <label>User Name *</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />

        {/* Password */}
        <div className="input-row">
          <div className="input-col">
            <label>Create password *</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="input-col">
            <label>Repeat password *</label>
            <input
              type="password"
              name="repeatPassword"
              value={form.repeatPassword}
              onChange={handleChange}
              placeholder="Repeat Password"
              required
            />
          </div>
        </div>

        {/* Role */}
        <label>I am *</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option>Farmer</option>
          <option>Trader</option>
          <option>Admin</option>
        </select>

        {/* Agree */}
        <div className="checkbox-container">
          <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
          <span>I agree with <a href="#">Terms And Conditions</a></span>
        </div>

        <button type="submit" className="signup-button">Register</button>
      </form>

      <p className="footer-text">
        Have an account? <Link to="/signIn" style={{ color: "#2ca881" }}>Log In</Link>
      </p>
    </div>
  );
};

export default SignUp;
