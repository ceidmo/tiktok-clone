import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled components for the auth page
const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const AuthForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const AuthTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const AuthInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const AuthButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #fe2c55;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 1rem;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background-color: #e41e4a;
  }
`;

const AuthToggle = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #666;

  span {
    color: #fe2c55;
    cursor: pointer;
    font-weight: bold;
  }
`;

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(endpoint, formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setFormData({ username: '', email: '', password: '' });
    setError('');
    setIsLogin(!isLogin);
  };

  return (
    <AuthContainer>
      <AuthForm onSubmit={handleSubmit}>
        <AuthTitle>{isLogin ? 'Log In' : 'Sign Up'}</AuthTitle>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!isLogin && (
          <AuthInput
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}

        <AuthInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <AuthInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="6"
        />

        <AuthButton type="submit" disabled={loading}>
          {loading ? 'Please wait...' : isLogin ? 'Log In' : 'Sign Up'}
        </AuthButton>

        <AuthToggle>
          {isLogin ? (
            <>Don't have an account? <span onClick={toggleForm}>Sign up</span></>
          ) : (
            <>Already have an account? <span onClick={toggleForm}>Log in</span></>
          )}
        </AuthToggle>
      </AuthForm>
    </AuthContainer>
  );
}

export default AuthPage;
