import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Subscribers.css";
import { toast } from "react-toastify";

const Subscribers = ({ url }) => {
  const [subscribers, setSubscribers] = useState([]);

  const fetchSubscribers = async () => {
    try {
      console.log("🔍 Fetching from:", `${url}/api/newsletter/list`);
      const response = await axios.get(`${url}/api/newsletter/list`);
      if (response.data.success) {
        setSubscribers(response.data.data);
      } else {
        toast.error("Failed to load subscribers");
      }
    } catch (error) {
      console.error("❌ Error fetching subscribers:", error);
      toast.error("Server Error: Could not fetch subscribers");
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="subscriber-page">
      <h2>All Subscribers</h2>

      <div className="subscriber-table">
        <div className="subscriber-header">
          <span>Name</span>
          <span>Email</span>
          <span>Subscribed On</span>
        </div>

        {subscribers.length > 0 ? (
          subscribers.map((item, index) => (
            <div key={index} className="subscriber-row">
              <span>{item.name || "N/A"}</span>
              <span>{item.email}</span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          ))
        ) : (
          <p className="no-data">No subscribers found</p>
        )}
      </div>
    </div>
  );
};

export default Subscribers;
