// src/Container/BlogSection.jsx
import React, { useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import blogData from "../assets/blogData";
import "./BlogSection.css";

const BlogSection = () => {
  const carouselRef = useRef(null);

  // Generate blog cards
  const items = blogData.map((blog) => (
    <div className="blog-card" key={blog.id}>
      <img src={blog.img} className="blog-img" alt={blog.title} />
      <div className="blog-content">
        <p className="comments">{blog.comments}</p>
        <h3 className="blog-heading">{blog.title}</h3>
        <p className="date">📅 {blog.date}</p>
        <button className="read-btn">Read More</button>
      </div>
    </div>
  ));

  return (
    <>
      <div className="blog-container">
        <h2 className="blog-title">Latest Blog</h2>
        <p className="blog-subtitle">
          Do Not Miss The Current Offers Until The End Of March.
        </p>

        <div className="nav-btn-wrapper">
          <button
            className="nav-btn-1"
            onClick={() => carouselRef.current?.slidePrev()}
          >
            <FaChevronLeft />
          </button>
          <button
            className="nav-btn-2"
            onClick={() => carouselRef.current?.slideNext()}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="slider-wrapper">
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={{
            0: { items: 1 },     // Mobile → 1 card
            576: { items: 2 },   // Tablet → 2 cards
            1024: { items: 3 },  // Desktop → 3 cards
          }}
          disableDotsControls
          disableButtonsControls
          ref={carouselRef}
        />
      </div>
    </>
  );
};

export default BlogSection;
