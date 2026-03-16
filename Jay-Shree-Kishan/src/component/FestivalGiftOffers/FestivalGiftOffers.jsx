import React, { useEffect, useState } from "react";
import "./FestivalGiftOffers.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const images = [
  assets.banner_image4,
  assets.banner_image5,
  assets.banner_image6,
  
];

const FestivalGiftOffers = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-box">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2> Festival Gift Offers </h2>

        {/* Slider */}
        <div className="slider-container">
          {images.map((img, index) => (
            <div
              className={`slide ${index === currentIndex ? "active" : ""}`}
              key={index}
            >
              <img src={img} alt={`Offer ${index + 1}`} />
            </div>
          ))}

          <div className="dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dote ${index === currentIndex ? "active-dot" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>

        <Link to="/products"><button className="shop-btn" onClick={onClose}>Shop Now</button></Link>
      </div>
    </div>
  );
};

export default FestivalGiftOffers;
