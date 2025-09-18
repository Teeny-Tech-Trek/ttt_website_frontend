// services/authService.ts - Updated to integrate with your backend endpoints
import axios from 'axios';

const API_BASE = 'https://api.teenytechtrek.com/api'; // Adjust base URL as needed (e.g., for production)

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

// Note: Forgot password endpoint not provided in backend. Implement /auth/forgot-password in your backend if needed.
// export const forgotPassword = async (username: string) => {
//   // Placeholder - throws error until backend endpoint is added
//   throw new Error('Forgot password not implemented in backend yet');
// };