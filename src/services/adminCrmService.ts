// src/services/adminCrmService.ts
// Service for the internal Admin CRM dashboard (login + consultation bookings +
// chatbot leads). Kept separate from the legacy adminService.ts scaffolding.
import api from '../api/axios';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ConsultationBooking {
  _id: string;
  name: string;
  email: string;
  startTime: string;
  endTime: string;
  googleMeetLink?: string;
  eventLink?: string;
  status?: string;
  formData?: Record<string, unknown>;
  createdAt: string;
}

export interface ChatbotLead {
  _id: string;
  session_id?: string;
  name: string;
  email: string;
  service?: string;
  message?: string;
  created_at: string;
}

const TOKEN_KEY = 'accessToken'; // reused by the axios request interceptor
const ADMIN_KEY = 'adminUser';

export const login = async (email: string, password: string) => {
  const res = await api.post('/admin/login', { email, password });
  const { token, admin } = res.data as { token: string; admin: AdminUser };
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
  return admin;
};

export const logout = async () => {
  try {
    await api.post('/admin/logout');
  } catch {
    // Logout is best-effort; the token is stateless and cleared locally anyway.
  }
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
};

export const getStoredAdmin = (): AdminUser | null => {
  const raw = localStorage.getItem(ADMIN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => Boolean(localStorage.getItem(TOKEN_KEY) && getStoredAdmin());

export const getConsultations = async () => {
  const res = await api.get('/admin/consultations');
  return (res.data?.consultations ?? []) as ConsultationBooking[];
};

export const getChatbotLeads = async () => {
  const res = await api.get('/admin/chatbot-leads');
  return (res.data?.leads ?? []) as ChatbotLead[];
};
