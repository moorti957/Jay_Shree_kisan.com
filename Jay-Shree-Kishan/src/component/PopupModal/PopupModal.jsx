import React, { useState, useEffect } from "react";
import "./PopupModal.css";

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [dontShow, setDontShow] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); 

  const handleClose = () => {
    if (dontShow) {
      localStorage.setItem("hideNewsletterPopup", "true");
    }
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }), 
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
        localStorage.setItem("hideNewsletterPopup", "true"); 
        setIsOpen(false);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  useEffect(() => {
    const hidePopup = localStorage.getItem("hideNewsletterPopup");
    if (hidePopup === "true") {
      setIsOpen(false);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="close-btn" onClick={handleClose}>×</button>
        <h2>SIGN UP OUR NEWSLETTER</h2>
        <p>Subscribe our newsletters now and stay up-to-date with new collections</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="subscribe-btn">Subscribe</button>
        </form>

        <div className="checkbox-area">
          <input
            type="checkbox"
            checked={dontShow}
            onChange={() => setDontShow(!dontShow)}
          />
          <span>Close & Don’t show this again!!!</span>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
