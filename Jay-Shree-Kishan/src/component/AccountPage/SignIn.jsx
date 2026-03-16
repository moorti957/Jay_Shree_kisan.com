import React, { useState, useContext } from "react";
import { generateOtp, signInWithOtp, signInWithUsername } from "../../api";
import './Auth.css';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../component/UserContext";
import Swal from "sweetalert2";   // ✅ Import Popup

const SignIn = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  // OTP Send
  const handleGenerateOtp = async () => {
    if (!mobile) {
      return Swal.fire("Error", "Enter your mobile number!", "error");
    }
    try {
      const res = await generateOtp({ mobile });
      Swal.fire("Success", res.data.message, "success");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Error sending OTP", "error");
    }
  };

  // OTP Login
  const handleOtpLogin = async () => {
    if (!otp) {
      return Swal.fire("Error", "Enter OTP!", "error");
    }
    try {
      const res = await signInWithOtp({ mobile, otp });
      Swal.fire("Success", res.data.message, "success");

      // ✅ Context login
      login(mobile, res.data.token);
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Login failed", "error");
    }
  };

  // Username + Password Login
  const handlePasswordLogin = async () => {
    if (!username || !password) {
      return Swal.fire("Error", "Enter username and password!", "error");
    }
    try {
      const res = await signInWithUsername({ username, password });
      Swal.fire("Success", res.data.message, "success");

      // ✅ Context login
      login(username, res.data.token);
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div className="auth-box">
      <h2 className="auth-title">Sign In</h2>

      <div className="login-section">
        <h3>Login with OTP</h3>
        <div className="input-group">
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="auth-input"
          />
          <button className="auth-button" onClick={handleGenerateOtp}>
            Send OTP
          </button>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="auth-input"
          />
          <button className="auth-button" onClick={handleOtpLogin}>
            Login
          </button>
        </div>
      </div>

      <hr className="divider" />

      <div className="login-section">
        <h3>OR</h3>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
        </div>
        <button className="auth-button" onClick={handlePasswordLogin}>
          Login
        </button>

        <Link to='/signUp'>
          <h5 className="Sign-5">
            Don't have an account? <span className="span-tag"> Sign up</span>
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
