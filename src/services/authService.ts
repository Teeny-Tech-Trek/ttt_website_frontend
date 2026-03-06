import axios from 'axios';

const DEFAULT_API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://api.teenytechtrek.com";
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
const API_BASE = `${API_BASE_URL}/api`;

export const registerUser = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_BASE}/auth/signup`, {
    username,
    email,
    password,
  });
  if (!response.data.success) {
    throw new Error(response.data.message || 'Signup failed');
  }
  return response.data;
};

export const loginUser = async (identifier: string, password: string) => {
  const response = await axios.post(`${API_BASE}/auth/signin`, {
    identifier,
    password,
  });
  if (!response.data.success) {
    throw new Error(response.data.message || 'Login failed');
  }
  return response.data;
};

export const googleLogin = async (idToken: string) => {
  const response = await axios.post(`${API_BASE}/auth/google`, {
    idToken,
  });
  if (!response.data.success) {
    throw new Error(response.data.message || 'Google login failed');
  }
  return response.data;
};
