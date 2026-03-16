import React, { useEffect, useState } from "react";
import "./Add.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();
        if (data.success) {
          setUsers(data.users);
        } else {
          alert("Error fetching users");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Server Error!");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="add">
      <h2> All Registered Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th> Name</th>
              <th>Phone</th>
              <th> Joined Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>{u.mobile || ""}</td> {/* ✅ mobile field */}
                <td>{u.createdAt ? new Date(u.createdAt).toLocaleString() : ""}</td> {/* ✅ Date + Time */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default User;
