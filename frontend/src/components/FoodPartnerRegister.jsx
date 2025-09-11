import React from 'react';
import '../styles/common.css';

const FoodPartnerRegister = () => {
  return (
    <div className="container">
      <h2>Food Partner Register</h2>
      <form>
        <input type="text" placeholder="Business Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default FoodPartnerRegister;
