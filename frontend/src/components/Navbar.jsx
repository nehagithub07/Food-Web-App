import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/reel.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Navbar component mounted'); // Debugging log
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/check', { withCredentials: true });
        console.log('Auth status:', response.data); // Debugging log
        setIsAuthenticated(response.data.isAuthenticated);
        setUserType(response.data.type || null);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
        setUserType(null);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const endpoint = userType === 'user' ? '/api/auth/user/logout' : '/api/auth/food-partner/logout';
      await axios.post(`http://localhost:3000${endpoint}`, {}, { withCredentials: true });
      console.log('Logout successful'); // Debugging log
      setIsAuthenticated(false);
      setUserType(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          FoodApp
        </Link>
        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-accent, #ef4444)"
            strokeWidth="2"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          {isAuthenticated ? (
            <>
              <span className="navbar-user-type">
                Logged in as {userType === 'user' ? 'User' : 'Food Partner'}
              </span>
              <button
                className="navbar-button"
                onClick={handleLogout}
                aria-label="Log out"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/user/login" className="navbar-link">
                User Login
              </Link>
              <Link to="/user/register" className="navbar-link">
                User Sign Up
              </Link>
              <Link to="/food-partner/login" className="navbar-link">
                Partner Login
              </Link>
              <Link to="/food-partner/register" className="navbar-link">
                Partner Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;