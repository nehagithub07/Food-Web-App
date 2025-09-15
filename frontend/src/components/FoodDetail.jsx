import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/reel.css';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('FoodDetail component mounted for ID:', id); // Debugging log
    const fetchFoodItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/food/${id}`);
        console.log('Fetched food item:', response.data);
        setItem(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching food item:', error);
        setError('Failed to load food item. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodItem();
  }, [id]);

  if (isLoading) {
    return <div className="detail-loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!item) {
    return <div className="detail-empty">Food item not found.</div>;
  }

  return (
    <div className="food-detail-container">
      <Navbar />
      <button
        className="detail-back-button"
        onClick={() => navigate('/')}
        aria-label="Back to home"
      >
        &larr; Back
      </button>
      <div className="food-detail-card" role="article" aria-labelledby={`food-detail-${item._id}`}>
        <img
          src={item.image || 'https://via.placeholder.com/400x300?text=Food+Item'}
          alt={item.name || 'Food item'}
          className="detail-image"
        />
        <div className="detail-content">
          <h1 id={`food-detail-${item._id}`} className="detail-title">{item.name || 'Unnamed Item'}</h1>
          <p className="detail-description">{item.description || 'No description available.'}</p>
          {item.price && (
            <p className="detail-price">
              Price: ${parseFloat(item.price).toFixed(2)}
            </p>
          )}
          <button
            className="detail-action-button"
            onClick={() => alert('Add to cart functionality not implemented yet.')}
            aria-label={`Add ${item.name || 'food item'} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default FoodDetail;