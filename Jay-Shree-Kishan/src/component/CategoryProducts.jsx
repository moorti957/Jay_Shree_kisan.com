import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, [category]);

  return (
    <div className="category-products">
      <h2>Products in Category: {category}</h2>
      {products.length === 0 ? (
        <p>No products found in this category</p>
      ) : (
        <div className="cards">
          {products.map((p) => (
            <div key={p._id} className="product-card">
              {p.image && (
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  alt={p.commodity}
                  className="product-img"
                />
              )}
              <h3>
                <Link to={`/products/${p._id}`}>
                  {p.commodity} - {p.district}
                </Link>
              </h3>
              <p>Price: <b>INR {p.price}</b></p>
              <p>Quantity: <b>{p.quantity}</b></p>
              <p>Type: <b>{p.type}</b></p>
              <p>Location: {p.district}, {p.state}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
