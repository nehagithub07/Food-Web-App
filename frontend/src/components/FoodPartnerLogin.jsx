import React from 'react';
import '../styles/common.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        { email, password },
        { withCredentials: true } // only if backend uses cookies
      );

      console.log("Login successful:", response.data);

      // Redirect to create-food page after successful login
      navigate("/create-food");
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <h2>Food Partner Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" name="email" required />
        <input type="password" placeholder="Password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default FoodPartnerLogin;
