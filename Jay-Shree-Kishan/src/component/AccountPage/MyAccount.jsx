// MyAccount.jsx
import React, { useState, useContext, useEffect } from "react";
import "./MyAccount.css";
import { UserContext } from "../../component/UserContext";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    username: "",
    role: "",
  });

  // 🟢 Load logged-in user data from context
  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        mobileNumber: user.mobileNumber || "",
        username: user.username || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdate = () => {
    alert("Profile updated successfully!");
    // 🟢 (You can add API call here to update on backend)
  };

  const handleSignOut = () => {
    logout(); // 🟢 Use same logout function from context
    navigate("/signIn"); // Redirect to login page
  };

  if (!user) {
    return (
      <div className="account-container">
        <div className="account-card">
          <h2>You are not logged in</h2>
          <button onClick={() => navigate("/signIn")} className="update-btn">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-card">
        <h2>My Account</h2>
        <div className="profile-img">
          <span>{profile.firstName?.charAt(0) || "U"}</span>
        </div>

        <form>
          <label>
            First Name
            <input
            className="input-accunt"
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
            />
          </label>

          <label>
            Last Name
            <input
             className="input-accunt"
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
            />
          </label>

          <label>
            Mobile Number
            <input
             className="input-accunt"
              type="text"
              name="mobileNumber"
              value={profile.mobileNumber}
              onChange={handleChange}
            />
          </label>

          <label>
            Username
            <input
             className="input-accunt"
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
            />
          </label>

          <label>
            I am
            <select name="role" value={profile.role} onChange={handleChange}>
              <option>Farmer</option>
              <option>Buyer</option>
              <option>Seller</option>
            </select>
          </label>

          <button type="button" className="update-btn" onClick={handleUpdate}>
            Update Profile
          </button>
          <button type="button" className="signout-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
