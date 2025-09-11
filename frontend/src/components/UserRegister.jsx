import React from 'react';
import '../styles/common.css';

const UserRegister = () => {
  return (
    <div className="container">
      <h2>User Register</h2>
      <form>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;
