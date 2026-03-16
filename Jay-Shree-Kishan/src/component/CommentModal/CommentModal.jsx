import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommentModal.css";

const CommentModal = ({ productId }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);

  // ✅ Fetch comment count when component loads
  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/count/${productId}`);
      setCount(res.data.count);
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      // ✅ Send data to backend with productId
      const res = await axios.post("http://localhost:5000/api/comments", {
        productId,
        name,
        comment,
      });

      if (res.status === 201) {
        setSuccess(true);
        fetchCount(); // ✅ Update count immediately

        setTimeout(() => {
          setSuccess(false);
          setShowModal(false);
          setName("");
          setComment("");
        }, 2000);
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError("❌ Failed to submit comment. Please try again.");
    }
  };

  return (
    <div className="comment-section">
      {/* ✅ Button with count */}
      <button className="comment-btn" onClick={() => setShowModal(true)}>
        <span className="comment-count">{count}</span> Comments 
      </button>

      {/* Popup Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Comments</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>

            {success ? (
              <div className="success-message">✅ Comment Submitted Successfully!</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              <form onSubmit={handleSubmit} className="modal-form">
                <label>Your Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <label>Add a new comment:</label>
                <textarea
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>

                <button type="submit" className="submit-btn">
                  Submit Comment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentModal;
