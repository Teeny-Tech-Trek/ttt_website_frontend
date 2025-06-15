// src/services/authService.ts
import api from '../api/axios';

export const loginUser = async (username: string, password: string) => {
  return api.post('/auth/login', { username, password });
};

export const registerUser = async (username: string, email: string, password: string) => {
  return api.post('/users/register', { username, email, password });
};

export const forgotPassword = async (username: string) => {
  return api.post('/users/forgot-password', { username });
};

export const googleLogin = async (idToken: string) => {
  return api.post('/auth/oAuth-login', { idToken }, { withCredentials: true });
};