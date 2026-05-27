import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaCommentDots, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import blogData from "../assets/blogData";

const BlogSection = () => {
  const trackRef = useRef(null);
  const outerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(3);

  const total = blogData.length;

  const getPerView = () => {
    const w = outerRef.current?.offsetWidth || 900;
    if (w < 500) return 1;
    if (w < 760) return 2;
    return 3;
  };

  const getCardWidth = () => {
    const gap = 20;
    const pv = getPerView();
    return ((outerRef.current?.offsetWidth || 900) - gap * (pv - 1)) / pv;
  };

  const goTo = (idx) => {
    const pv = getPerView();
    const max = total - pv;
    const next = Math.max(0, Math.min(idx, max));
    setCurrent(next);
    const w = getCardWidth();
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(-${next * (w + 20)}px)`;
  };

  useEffect(() => {
    const handleResize = () => {
      setPerView(getPerView());
      goTo(current);
      if (trackRef.current) {
        trackRef.current.querySelectorAll(".bl-card").forEach(c => {
          c.style.minWidth = getCardWidth() + "px";
        });
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pages = Math.ceil(total / perView);
  const activePage = Math.floor(current / perView);

  return (
    <>
      <style>{`
        :root {
          --g-dark: #1a4d2e;
          --g-mid:  #2d7a4f;
          --gold:   #e8a020;
          --gold-l: #f5c842;
          --border: #e0ece0;
          --cream:  #f4faf6;
        }
        .bl-wrap {
          max-width: 1280px; margin: 0 auto;
          padding: 48px 28px 52px;
        }
        .bl-header {
          
          display: flex; align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 32px; flex-wrap: wrap; gap: 16px;
        }
        .bl-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          background: #e8f5ee; border: 1px solid #c3e6d0;
          color: var(--g-dark); font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 4px 14px; border-radius: 50px; margin-bottom: 10px;
        }
        .bl-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold); display: inline-block;
        }
        .bl-title {
          font-size: 28px; font-weight: 800; color: var(--g-dark);
          margin: 0 0 6px; line-height: 1.2;
        }
        .bl-title span { color: var(--g-mid); }
        .bl-sub { font-size: 13px; color: #6b7c6b; margin: 0; }
        .bl-nav { display: flex; gap: 10px; }
        .bl-nav-btn {
          width: 42px; height: 42px; border-radius: 50%;
          border: 1.5px solid var(--border);
          background: white; color: var(--g-dark);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 15px;
          transition: all 0.2s ease;
        }
        .bl-nav-btn:hover {
          background: var(--g-dark); color: white;
          border-color: var(--g-dark); transform: scale(1.05);
        }
        .bl-slider-outer { overflow: hidden; }
        .bl-slider-track {
          display: flex; gap: 20px;
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .bl-card {
          width: 42px;
          background: white; border: 1.5px solid var(--border);
          border-radius: 20px; overflow: hidden; flex-shrink: 0;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          display: flex; flex-direction: column;
        }
        .bl-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 40px rgba(26,77,46,0.12);
          border-color: #b0d8b8;
        }
        .bl-img-wrap {
          position: relative; height: 200px; overflow: hidden;
          background: #e8f5ee;
        }
        .bl-img-wrap img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.35s ease;
        }
        .bl-card:hover .bl-img-wrap img { transform: scale(1.05); }
        .bl-badge {
          position: absolute; top: 12px; left: 12px;
          background: linear-gradient(135deg, var(--gold), var(--gold-l));
          color: #7a4800; font-size: 10px; font-weight: 800;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 50px;
        }
        .bl-body {
          padding: 18px 20px 20px;
          display: flex; flex-direction: column; flex: 1; gap: 6px;
        }
        .bl-meta-pill {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; color: #6b7c6b;
          background: var(--cream); border: 1px solid var(--border);
          padding: 3px 10px; border-radius: 50px; width: fit-content;
        }
        .bl-card-title {
          font-size: 15px; font-weight: 800; color: #1c1c1c;
          line-height: 1.35; margin: 0;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .bl-divider { height: 1px; background: var(--border); margin: 4px 0; }
        .bl-footer {
          display: flex; align-items: center;
          justify-content: space-between;
        }
        .bl-date {
          font-size: 11px; color: #6b7c6b;
          display: flex; align-items: center; gap: 5px;
        }
        .bl-read-btn {
          display: inline-flex; align-items: center; gap: 5px;
          background: var(--g-dark); color: white;
          border: none; border-radius: 50px;
          padding: 7px 16px; font-size: 12px; font-weight: 700;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
        }
        .bl-read-btn:hover { background: var(--g-mid); transform: translateY(-1px); }
        .bl-dots { display: flex; justify-content: center; gap: 6px; margin-top: 24px; }
        .bl-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--border); cursor: pointer;
          border: none; padding: 0; transition: all 0.25s;
        }
        .bl-dot.active { background: var(--g-dark); width: 22px; border-radius: 4px; }
        @media (max-width: 640px) {
          .bl-wrap { padding: 32px 14px 40px; }
          .bl-title { font-size: 22px; }
        }
      `}</style>

      <div className="bl-wrap">
        <div className="bl-header">
          <div>
            <div className="bl-eyebrow">
              <span className="bl-eyebrow-dot" /> Jay Shree Kisan
            </div>
            <h2 className="bl-title">Latest <span>Blog</span></h2>
            <p className="bl-sub">Do not miss the current offers until the end of March.</p>
          </div>
          <div className="bl-nav">
            <button className="bl-nav-btn" onClick={() => goTo(current - 1)}>
              <FaChevronLeft />
            </button>
            <button className="bl-nav-btn" onClick={() => goTo(current + 1)}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="bl-slider-outer" ref={outerRef}>
          <div className="bl-slider-track" ref={trackRef}>
            {blogData.map((blog) => (
              <div className="bl-card" key={blog.id}>
                <div className="bl-img-wrap">
                  <img src={blog.img} alt={blog.title} />
                  <span className="bl-badge">{blog.category || "Blog"}</span>
                </div>
                <div className="bl-body">
                  <span className="bl-meta-pill">
                    <FaCommentDots /> {blog.comments}
                  </span>
                  <p className="bl-card-title">{blog.title}</p>
                  <div className="bl-divider" />
                  <div className="bl-footer">
                    <span className="bl-date">
                      <FaCalendarAlt /> {blog.date}
                    </span>
                    <button className="bl-read-btn">
                      Read More <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bl-dots">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              className={`bl-dot${i === activePage ? " active" : ""}`}
              onClick={() => goTo(i * perView)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogSection;