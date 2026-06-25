import axios from 'axios';
import toast from 'react-hot-toast';

const DEFAULT_API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://api.teenytechtrek.com";
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('adminUser');
        if (!window.location.pathname.includes('/admin/login')) {
          window.location.href = '/admin/login';
        }
      } else if (status === 403) {
        toast.error("You don't have permission to perform this action.");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
