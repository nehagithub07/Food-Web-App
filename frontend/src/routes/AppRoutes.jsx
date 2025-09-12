import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../components/UserRegister.jsx';
import UserLogin from '../components/UserLogin.jsx';
import FoodPartnerRegister from '../components/FoodPartnerRegister.jsx';
import FoodPartnerLogin from '../components/FoodPartnerLogin.jsx';
import Home from '../pages/Home.jsx';
import CreateFood from '../components/CreateFood.jsx';
import FoodDetail from '../components/FoodDetail.jsx';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food/:id" element={<FoodDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;