import React, { useEffect, useState } from "react";
import "./subscription.css";

const Subscription = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/payment/all");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="orders-loading">Loading orders...</div>;

  return (
    <div className="orders-container">
      <h2 className="orders-title">All Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Payment ID</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>User</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.orderId}</td>
                <td>{order.paymentId || "—"}</td>
                <td>{(order.amount / 100).toFixed(2)}</td>
                <td
                  className={
                    order.status === "paid"
                      ? "status-paid"
                      : order.status === "failed"
                      ? "status-failed"
                      : "status-created"
                  }
                >
                  {order.status}
                </td>
                <td>
                  {order.user
                    ? `${order.user.firstName || ""} ${order.user.lastName || ""}`
                    : "Guest"}
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Subscription;
