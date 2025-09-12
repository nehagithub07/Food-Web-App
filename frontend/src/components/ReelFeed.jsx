import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/reel.css';

const ReelFeed = ({ items, onLike, onSave, emptyMessage }) => {
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return <div className="empty-state">{emptyMessage}</div>;
  }

  return (
    <section className="reels-feed" role="region" aria-label="Video Reels">
      {items.map((item) => (
        <div key={item._id} className="reel" role="article" aria-labelledby={`reel-${item._id}`}>
          <video
            className="reel-video"
            src={item.video}
            autoPlay
            loop
            muted
            playsInline
            aria-label={`Video for ${item.name || 'food item'}`}
          />
          <div className="reel-overlay">
            <div className="reel-content">
              <h3 id={`reel-${item._id}`} className="reel-description">
                {item.name || 'Unnamed Item'}
              </h3>
              <button
                className="reel-btn"
                onClick={() => navigate(`/food/${item._id}`)}
                aria-label={`View details for ${item.name || 'food item'}`}
              >
                View Details
              </button>
            </div>
            <div className="reel-actions">
              <div className="reel-action-group">
                <button
                  className="reel-action"
                  onClick={() => onLike(item)}
                  aria-label={item.likeCount > 0 ? 'Unlike video' : 'Like video'}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <span className="reel-action__count">{item.likeCount}</span>
              </div>
              <div className="reel-action-group">
                <button
                  className="reel-action"
                  onClick={() => onSave(item)}
                  aria-label={item.savesCount > 0 ? 'Unsave video' : 'Save video'}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
                <span className="reel-action__count">{item.savesCount}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ReelFeed;