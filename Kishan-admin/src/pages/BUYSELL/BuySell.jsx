import React, { useEffect, useState } from "react";
import "./buysell.css";
import Swal from "sweetalert2";

const BuySell = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
      } else {
        Swal.fire("Error!", "Failed to fetch products", "error");
      }
    } catch (err) {
      console.error("Error:", err);
      Swal.fire("Server Error!", "Unable to connect to server", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete function
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (data.success) {
          Swal.fire("Deleted!", "Product has been deleted.", "success");
          setProducts(products.filter((p) => p._id !== id)); // remove from UI
        } else {
          Swal.fire("Error!", data.message || "Delete failed", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Server Error!", "Could not delete product", "error");
      }
    }
  };

  return (
    <div className="buysell-container">
      <h2>📦 Buy / Sell Products (User Submitted)</h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="buysell-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Commodity</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Quality</th>
              <th>Date</th>
              <th>Stored in A.C</th>
              <th>Image</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Action</th> {/* ✅ New column */}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.type}</td>
                <td>{p.commodity}</td>
                <td>{p.quantity}</td>
                <td>
                  {p.state}, {p.district}
                </td>
                <td>{p.quality}</td>
                <td>{p.availableFrom}</td>
                <td>{p.isStoredAC ? "✅" : "❌"}</td>
                <td>
                  {p.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${p.image}`}
                      alt={p.commodity}
                      width="70"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{p.name}</td>
                <td>{p.email}</td>

                {/* ✅ Delete button */}
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(p._id)}
                  >
                     Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BuySell;
