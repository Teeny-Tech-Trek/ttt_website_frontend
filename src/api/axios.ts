import axios from 'axios';

const api = axios.create({
  baseURL: 'http://13.60.236.70/api',
  withCredentials: true, // so cookies (refresh token) are sent
  headers: { 'Content-Type': 'application/json' },
});

export default api;
