import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/bottom-nav.css';

const BottomNav = () => {
  return (
    <nav className="bottom-nav" role="navigation" aria-label="Bottom navigation">
      <div className="bottom-nav__inner">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}
          aria-label="Go to Home"
          title="Home"
        >
          <span className="bottom-nav__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5 12 3l9 7.5"/>
              <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>
            </svg>
          </span>
          <span className="bottom-nav__label">Home</span>
        </NavLink>

        <NavLink
          to="/saved"
          className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}
          aria-label="Go to Saved"
          title="Saved"
        >
          <span className="bottom-nav__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>
            </svg>
          </span>
          <span className="bottom-nav__label">Saved</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}
          aria-label="Go to Profile"
          title="Profile"
        >
          <span className="bottom-nav__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </span>
          <span className="bottom-nav__label">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;