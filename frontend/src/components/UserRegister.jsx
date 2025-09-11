import React from 'react';
import '../styles/common.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const navigate = useNavigate();   
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await axios.post("http://localhost:3000/api/auth/user/register", {
        fullName: fullName,
        email: email,
        password: password
      }, {
        withCredentials: true
      });
      console.log("User registered successfully");

      navigate("/");   
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="container">
      <h2>User Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" name="fullName" required />
        <input type="email" placeholder="Email" name="email" required />
        <input type="password" placeholder="Password" name="password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;
