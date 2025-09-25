import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.teenytechtrek.com/api',
  withCredentials: true, // so cookies (refresh token) are sent
  headers: { 'Content-Type': 'application/json' },
});

export default api;
