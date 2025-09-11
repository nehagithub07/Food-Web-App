import React from 'react';
import '../styles/common.css';

const FoodPartnerLogin = () => {
  return (
    <div className="container">
      <h2>Food Partner Login</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default FoodPartnerLogin;
