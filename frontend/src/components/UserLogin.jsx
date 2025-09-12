import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth-shared.css';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  console.log('UserLogin component rendered'); // Debugging log

  // Password strength validation
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
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sending login request:', { email }); // Debugging log
      const response = await axios.post(
        'http://localhost:3000/api/auth/user/login',
        { email, password },
        { withCredentials: true }
      );
      console.log('Login successful:', response.data); // Debugging log
      navigate('/');
    } catch (error) {
      console.error('Login error:', error); // Debugging log
      setError(error.response?.data?.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="user-login-title">
        <header>
          <h1 id="user-login-title" className="auth-title">User Login</h1>
          <p className="auth-subtitle">Sign in to explore and save delicious recipes.</p>
        </header>
        <nav className="auth-alt-action gap-sm">
          <strong>Switch:</strong> <Link to="/user/login">User</Link> • <Link to="/food-partner/login">Food Partner</Link>
        </nav>
        {error && <p className="error-text" role="alert" id="form-error">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              aria-describedby="form-error"
              aria-invalid={error.includes('email') ? 'true' : 'false'}
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                aria-describedby="form-error password-strength"
                aria-invalid={error.includes('password') ? 'true' : 'false'}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {showPassword ? (
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  ) : (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <path d="M1 1l22 22" />
                    </>
                  )}
                </svg>
              </button>
            </div>
            {password && (
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
          <div className="form-actions">
            <button
              className="auth-submit"
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
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
          New user? <Link to="/user/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;