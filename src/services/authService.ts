// services/authService.ts
import axios from 'axios';

// ✅ Use your live backend API
const API_BASE = 'https://api.teenytechtrek.com/api';

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

// Optional: Forgot password can be enabled when backend route is ready
// export const forgotPassword = async (username: string) => {
//   throw new Error('Forgot password not implemented in backend yet');
// };
