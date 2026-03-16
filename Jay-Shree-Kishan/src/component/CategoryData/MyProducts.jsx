import React from 'react'
import { useState, useEffect } from "react";
import "./ProductList.css";
import { FaPhoneAlt, FaCommentDots, FaEye, FaShareAlt, FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


function MyProducts() {
 const [products, setProducts] = useState([]);
 
   useEffect(() => {
     fetch("http://localhost:5000/api/products")
       .then((res) => res.json())
       .then((data) => {
         if (data.success) {
           setProducts(data.products);
         }
       })
       .catch((err) => console.error("❌ Error fetching products:", err));
   }, []);
 
   return (
     <div className="product-list">
       <h2> Listed Products</h2>
       {products.length === 0 ? (
         <p>No products available</p>
       ) : (
         <div className="cards">
           {products.map((p) => (
             <div key={p._id} className="product-card">
               <span className="tag">Promoted</span>
 
               {/* Product Image */}
               {p.image && (
                 <img
                   src={`http://localhost:5000/uploads/${p.image}`}
                   alt={p.commodity}
                   className="product-img"
                 />
               )}
 
               <h3>
                 {p.commodity} Required in {p.district}
               </h3>
 
               <p>
                 Target Price: <b>INR {p.price} </b>
               </p>
               <p>
                 Qty Required: <b>{p.quantity} </b>
               </p>
               <p>
                 Posted On: <b>5 hours ago</b> 
               </p>
 
               <div className="user-info">
                 <FaUserCircle className="icon" />
                 <span className="name">{p.name}</span>
               </div>
 
               <div className="location">
                 <FaMapMarkerAlt className="icon" />
                 <span>
                   {p.district}, {p.state}
                 </span>
               </div>
 
               <div className="actions">
                <Link to="/trendingPrices"> <button className="call-btn">
                   <FaPhoneAlt /> CALL
                 </button></Link>
                 <div className="meta">
                   <span>
                     <FaCommentDots /> 1 Comments
                   </span>
                   <span>
                     <FaEye /> 707 Views
                   </span>
                 </div>
                 <FaShareAlt className="share" />
               </div>
             </div>
           ))}
         </div>
       )}
     </div>
   );
}

export default MyProducts
