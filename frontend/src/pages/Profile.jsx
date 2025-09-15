import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/profile.css';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Profile component mounted');
    const fetchUserProfile = async () => {
      try {
        // This would need to be implemented in the backend
        const response = await axios.get('http://localhost:3000/api/auth/profile', { 
          withCredentials: true 
        });
        console.log('Fetched user profile:', response.data);
        setUser(response.data.user);
        setError(null);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        if (error.response?.status === 401) {
          setError('Please log in to view your profile.');
          navigate('/user/login');
        } else {
          setError('Failed to load profile. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/user/logout', {}, { 
        withCredentials: true 
      });
      console.log('Logout successful');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="home-container">
        <Navbar />
        <div className="empty-state">Loading your profile...</div>
        <BottomNav />
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <Navbar />
        <div className="error-message">{error}</div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="home-container">
      <Navbar />
      <main className="profile-page">
        <section className="profile-header">
          <div className="profile-meta">
            <img 
              className="profile-avatar" 
              src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400" 
              alt="Profile avatar" 
            />
            <div className="profile-info">
              <h1 className="profile-pill profile-business" title="Full name">
                {user?.fullName || 'User Name'}
              </h1>
              <p className="profile-pill profile-address" title="Email">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>

          <div className="profile-stats" role="list" aria-label="Stats">
            <div className="profile-stat" role="listitem">
              <span className="profile-stat-label">videos liked</span>
              <span className="profile-stat-value">{user?.likesCount || 0}</span>
            </div>
            <div className="profile-stat" role="listitem">
              <span className="profile-stat-label">videos saved</span>
              <span className="profile-stat-value">{user?.savesCount || 0}</span>
            </div>
          </div>
        </section>

        <hr className="profile-sep" />

        <section className="profile-actions">
          <button 
            className="profile-action-btn"
            onClick={() => navigate('/saved')}
          >
            View Saved Videos
          </button>
          <button 
            className="profile-action-btn secondary"
            onClick={handleLogout}
          >
            Logout
          </button>
        </section>
      </main>
      <BottomNav />
    </div>
  );
};

export default Profile;