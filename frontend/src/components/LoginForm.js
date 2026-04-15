import React, { useState } from 'react';
import { auth } from '../api/client';
import './LoginForm.css';

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const response = await auth.login(username, password);
      if (response.data.success) {
        setSuccessMessage(`✓ Successfully logged in as ${response.data.data.username}`);
        onLoginSuccess(response.data.data);
        setUsername('');
        setPassword('');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div className="demo-section">
          <h3>🔍 Demo Payloads (for testing)</h3>
          <p className="demo-warning">Try these in the username field (leave password empty):</p>
          <div className="payload-examples">
            <div className="payload">
              <code>admin' OR '1'='1 --</code>
              <p>Bypasses authentication logic</p>
            </div>
            <div className="payload">
              <code>' OR 1=1 -- '</code>
              <p>Alternative bypass method</p>
            </div>
            <div className="payload">
              <code>admin'-- '</code>
              <p>Comments out the password check</p>
            </div>
          </div>
        </div>

        <div className="test-users">
          <h3>ℹ️ Test Credentials</h3>
          <ul>
            <li><strong>admin</strong> / password123</li>
            <li><strong>user1</strong> / user_pass</li>
            <li><strong>user2</strong> / secure_pw</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
