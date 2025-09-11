import React from 'react';
import '../styles/common.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log({ name, contactName, phone, address, email, password });

    try {
      console.log("Sending registration data...");
      const response = await axios.post("http://localhost:3000/api/auth/food-partner/register", {
        name,
        contactName,
        phone,
        address,
        email,
        password
      }, {
        withCredentials: true
      });
      console.log("Response:", response.data);
      navigate("/create-food");
    } catch (error) {
      console.error("Error registering food partner:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <h2>Food Partner Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Business Name" name="name" required />
        <input type="text" placeholder="Contact Name" name="contactName" required />
        <input type="text" placeholder="Phone" name="phone" required />
        <input type="text" placeholder="Address" name="address" required />
        <input type="email" placeholder="Email" name="email" required />
        <input type="password" placeholder="Password" name="password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default FoodPartnerRegister;
