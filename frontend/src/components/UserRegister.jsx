import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth-shared.css';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
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
      console.log('Sending register request:', { fullName, email }); // Debugging log
      const response = await axios.post(
        'http://localhost:3000/api/auth/user/register',
        { fullName, email, password },
        { withCredentials: true }
      );
      console.log('Register successful:', response.data); // Debugging log
      navigate('/');
    } catch (error) {
      console.error('Register error:', error); // Debugging log
      setError(error.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="user-register-title">
        <header>
          <h1 id="user-register-title" className="auth-title">User Sign Up</h1>
          <p className="auth-subtitle">Join to explore and save delicious recipes.</p>
        </header>
        <nav className="auth-alt-action gap-sm">
          <strong>Switch:</strong> <Link to="/user/register">User</Link> • <Link to="/food-partner/register">Food Partner</Link>
        </nav>
        {error && <p className="error-text" role="alert" id="form-error">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="name"
              required
              aria-describedby="form-error"
            />
          </div>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="user@example.com"
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
          <div className="form-actions">
            <button className="auth-submit" type="submit" disabled={isLoading} aria-busy={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
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
          Already a user? <Link to="/user/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;