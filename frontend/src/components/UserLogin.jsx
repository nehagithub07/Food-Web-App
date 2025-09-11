import React from 'react';
import '../styles/common.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await axios.post("http://localhost:3000/api/auth/user/login", {
         
        email: email,
        password: password
      }, {
        withCredentials: true
      });
      console.log("User logged in successfully");

      navigate("/");   
    } catch (error) {
      console.error("Error login user:", error);
    }
  };
  return (
    <div className="container">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" name="email" required />
        <input type="password" placeholder="Password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
