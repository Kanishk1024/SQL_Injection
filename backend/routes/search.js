const express = require('express');
const router = express.Router();
const db = require('../db');

// VULNERABLE: GET /api/search
// This endpoint is deliberately vulnerable to UNION-based SQL Injection
// Attack payload: query = " UNION SELECT id, secret_key, secret_value FROM secrets -- "
// This allows attackers to extract data from other tables
router.get('/', (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Query parameter is required'
    });
  }

  // VULNERABILITY: Raw string concatenation without parameterized queries
  // This allows UNION-based SQL injection to extract data from other tables
  const sqlQuery = `SELECT id, title, content FROM records WHERE title LIKE '%${query}%'`;

  console.log('[SEARCH] Executing query:', sqlQuery);

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('[SEARCH] Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Database error: ' + error.message
      });
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  });
});

// VULNERABLE: GET /api/search/advanced
// Alternative vulnerable search with more flexibility for UNION attacks
router.get('/advanced', (req, res) => {
  const { column, value } = req.query;

  if (!column || !value) {
    return res.status(400).json({
      success: false,
      message: 'Both column and value parameters are required'
    });
  }

  // VULNERABILITY: Column name is also user-controlled, major vulnerability
  const query = `SELECT * FROM records WHERE ${column} LIKE '%${value}%'`;

  console.log('[SEARCH] Executing advanced query:', query);

  db.query(query, (error, results) => {
    if (error) {
      console.error('[SEARCH] Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Database error: ' + error.message
      });
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  });
});

module.exports = router;
