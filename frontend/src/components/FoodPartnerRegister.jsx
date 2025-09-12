import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth-shared.css';

const FoodPartnerRegister = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const checkPasswordStrength = (pwd) => {
    if (!pwd) return '';
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    const lengthValid = pwd.length >= 8;

    if (lengthValid && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) {
      return 'strong';
    } else if (lengthValid && (hasUpperCase || hasLowerCase) && hasNumbers) {
      return 'medium';
    } else {
      return 'weak';
    }
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(formData.password));
  }, [formData.password]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { businessName, contactName, phone, email, password, confirmPassword, address } = formData;

    if (!businessName || !contactName || !phone || !email || !password || !confirmPassword || !address) {
      setError('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sending register request:', { businessName, email }); // Debugging log
      const response = await axios.post(
        'http://localhost:3000/api/auth/food-partner/register',
        {
          name: businessName,
          contactName,
          phone,
          email,
          password,
          address,
        },
        { withCredentials: true }
      );
      console.log('Register successful:', response.data); // Debugging log
      navigate('/create-food');
    } catch (error) {
      console.error('Register error:', error); // Debugging log
      setError(error.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="partner-register-title">
        <header>
          <h1 id="partner-register-title" className="auth-title">Partner Sign Up</h1>
          <p className="auth-subtitle">Grow your business with our platform.</p>
        </header>
        <nav className="auth-alt-action gap-sm">
          <strong>Switch:</strong> <Link to="/user/register">User</Link> • <Link to="/food-partner/register">Food Partner</Link>
        </nav>
        {error && <p className="error-text" role="alert" id="form-error">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="businessName">Business Name</label>
            <input
              id="businessName"
              name="businessName"
              placeholder="Tasty Bites"
              value={formData.businessName}
              onChange={handleChange}
              autoComplete="organization"
              required
              aria-describedby="form-error"
            />
          </div>
          <div className="two-col">
            <div className="field-group">
              <label htmlFor="contactName">Contact Name</label>
              <input
                id="contactName"
                name="contactName"
                placeholder="Jane Doe"
                value={formData.contactName}
                onChange={handleChange}
                autoComplete="name"
                required
                aria-describedby="form-error"
              />
            </div>
            <div className="field-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                placeholder="+1 555 123 4567"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
                aria-describedby="form-error"
              />
            </div>
          </div>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="business@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              aria-describedby="form-error"
              aria-invalid={error.includes('email') ? 'true' : 'false'}
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
              aria-describedby="form-error password-strength"
              aria-invalid={error.includes('password') ? 'true' : 'false'}
            />
            {formData.password && (
              <div
                className={`password-strength ${passwordStrength}`}
                id="password-strength"
                role="status"
                aria-live="polite"
              >
                Password Strength: {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
              </div>
            )}
          </div>
          <div className="field-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
              aria-describedby="form-error"
              aria-invalid={error.includes('password') ? 'true' : 'false'}
            />
          </div>
          <div className="field-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              placeholder="123 Market Street"
              value={formData.address}
              onChange={handleChange}
              autoComplete="street-address"
              required
              aria-describedby="form-error"
            />
            <p className="small-note">Full address helps customers find you faster.</p>
          </div>
          <div className="form-actions">
            <button className="auth-submit" type="submit" disabled={isLoading} aria-busy={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Partner Account'}
            </button>
            <button
              className="btn-ghost"
              type="button"
              onClick={() => navigate('/')}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="auth-alt-action">
          Already a partner? <Link to="/food-partner/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;