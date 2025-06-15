// src/services/adminLogService.ts
import api from '../api/axios';

export interface AdminLog {
  id?: string;
  admin_id: string;
  action_type: string;
  description?: string;
  logged_at?: string;
}

export const createLog = async (action_type: string, description?: string) => {
  const res = await api.post('/adminLogs/log', { action_type, description });
  return res.data as AdminLog;
};

export const getAllLogs = async () => {
  const res = await api.get('/adminLogs/logs');
  return res.data as AdminLog[];
};

export const getLogsByAdmin = async (adminId: string) => {
  const res = await api.get(`/adminLogs/logs/${adminId}`);
  return res.data as AdminLog[];
};
