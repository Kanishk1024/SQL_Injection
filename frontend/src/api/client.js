import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const auth = {
  login: (username, password) => {
    return client.post('/auth/login', { username, password });
  },
  getUsers: () => {
    return client.get('/auth/users');
  }
};

export const search = {
  search: (query) => {
    return client.get('/search', { params: { query } });
  },
  advancedSearch: (column, value) => {
    return client.get('/search/advanced', { params: { column, value } });
  }
};

export default client;
