import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      debugger
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setProduct(data.product);
        } else {
          setError(data.message || "❌ Product not found");
        }
      } catch (err) {
        setError("⚠️ Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-detail">
      <div className="product-image">
        {product.image ? (
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.commodity}
          />
        ) : (
          <p>No Image Available</p>
        )}
      </div>

      <div className="product-info">
        <h2>{product.commodity}</h2>
        <p>
          Price: <b>₹{product.price}</b>
        </p>
        <p>
          Quantity: <b>{product.quantity}</b>
        </p>
        <p>
          Type: <b>{product.type}</b>
        </p>
        <p>
          Location: <b>{product.district}, {product.state} </b>
        </p>
        <p>
          Comments: {product.comments}
        </p>

        
      </div>
    </div>
  );
};

export default ProductDetail;
