import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SearchForm from './components/SearchForm';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-brand">
            <h1>SQL Injection Demo</h1>
            <p className="subtitle">Educational Security Testing Platform</p>
          </div>
          <div className="nav-links">
            <Link to="/">Login</Link>
            <Link to="/search">Search</Link>
            {currentUser && (
              <span className="user-info">
                Logged in as: <strong>{currentUser.username}</strong> ({currentUser.role})
              </span>
            )}
          </div>
        </nav>

        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={<LoginForm onLoginSuccess={setCurrentUser} />}
            />
            <Route
              path="/search"
              element={<SearchForm currentUser={currentUser} />}
            />
          </Routes>
        </div>

        <footer className="footer">
          <p>⚠️ This is a deliberately vulnerable application for educational purposes only.</p>
          <p>Course: Cybersecurity (CSL6010) | Team: Aaryan, Vyankatesh, Kanishk, Abhinash</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
