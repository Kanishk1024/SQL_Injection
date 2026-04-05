const express = require('express');
const router = express.Router();
const db = require('../db');

// VULNERABLE: POST /api/auth/login
// This endpoint is deliberately vulnerable to SQL Injection
// Attack payload: username = "admin' OR '1'='1 --" bypasses password check
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // VULNERABILITY: Raw string concatenation without parameterized queries
  // This allows SQL injection attacks
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  console.log('[AUTH] Executing query:', query);

  db.query(query, (error, results) => {
    if (error) {
      console.error('[AUTH] Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Database error: ' + error.message
      });
    }

    if (results.length > 0) {
      const user = results[0];
      // Login successful
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
    } else {
      // Login failed
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
  });
});

// SAFE: GET /api/auth/users (for testing, secured endpoint - not modified yet)
router.get('/users', (req, res) => {
  const query = 'SELECT id, username, role FROM users';

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Database error: ' + error.message
      });
    }

    return res.status(200).json({
      success: true,
      data: results
    });
  });
});

module.exports = router;
