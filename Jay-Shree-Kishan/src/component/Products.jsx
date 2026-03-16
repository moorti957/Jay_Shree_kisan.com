import React, { useState } from 'react'
import './Products.css'
import { FaChevronLeft, FaChevronRight, FaShoppingBag } from 'react-icons/fa';
import { products } from '../assets/assets';

const Products = () => {
    const [counts, setCounts] = useState({});
     const [currentIndex, setCurrentIndex] = useState(0);

  const increment = (id) =>
    setCounts((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));

  const decrement = (id) =>
    setCounts((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));

    const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === products.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const currentProduct = products[currentIndex];
  const progress = (currentProduct.sold / currentProduct.stock) * 100;
  return (
     <div className="deal-container">
      <div className="deal-header">
        <h2>Deal Of The Day</h2>
       
        <div className="nav-buttons">
          <button onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button onClick={nextSlide}>
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className='deal-pra'> <p>Do Not Miss The Current Offers Until The End Of March.</p></div>

      <div className='box' >
        <div className="deal-grid">
        {products.map((item) => {
          const progress = (item.sold / item.stock) * 100;
          return (
            <div className="deal-card" key={item.id}>
              <div className="product-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="product-info">
                <h3>{item.name}</h3>
                <div className="sizes">
                  {item.sizes.map((size, index) => (
                    <button key={index}>{size}</button>
                  ))}
                </div>
                <div className="rating">
                  {"★".repeat(item.rating)}
                  {"☆".repeat(5 - item.rating)}
                </div>
                <p className="price">${item.price.toFixed(2)}</p>

                <div className="cart-actions">
                  <div className="qty">
                    <button onClick={() => decrement(item.id)}>-</button>
                    <span>{counts[item.id] || 1}</span>
                    <button onClick={() => increment(item.id)}>+</button>
                  </div>
                  <div className="add-cart">
                    <FaShoppingBag />
                  </div>
                </div>

                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  )
}

export default Products
