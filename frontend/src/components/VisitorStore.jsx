import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/reel.css';

const VisitorStore = ({ items }) => {
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return <div className="store-empty">No items available in the store.</div>;
  }

  return (
    <section className="visitor-store" role="region" aria-label="Visitor Store">
      <header className="store-header">
        <h2 className="store-title">Explore Our Store</h2>
        <p className="store-subtitle">Discover delicious food items and recipes.</p>
      </header>
      <div className="store-grid">
        {items.map((item) => (
          <div key={item._id} className="store-card" role="article" aria-labelledby={`store-item-${item._id}`}>
            <img
              src={item.image || 'https://via.placeholder.com/300x200?text=Food+Item'}
              alt={item.name || 'Food item'}
              className="store-image"
            />
            <div className="store-content">
              <h3 id={`store-item-${item._id}`} className="store-item-title">{item.name || 'Unnamed Item'}</h3>
              <p className="store-item-description">
                {item.description || 'No description available.'}
              </p>
              <button
                className="store-button"
                onClick={() => navigate(`/food/${item._id}`)}
                aria-label={`View details for ${item.name || 'food item'}`}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisitorStore;