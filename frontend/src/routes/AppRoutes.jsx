import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../components/UserRegister';
import UserLogin from '../components/UserLogin';
import FoodPartnerRegister from '../components/FoodPartnerRegister';
import FoodPartnerLogin from '../components/FoodPartnerLogin';
import Home from '../components/Home';
import CreateFood  from '../components/CreateFood';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-food" element={<CreateFood/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
