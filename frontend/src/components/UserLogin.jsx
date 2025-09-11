import React from 'react';
import '../styles/common.css';

const UserLogin = () => {
  return (
    <div className="container">
      <h2>User Login</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
