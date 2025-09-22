// src/services/contactService.ts
import api from '../api/axios';

export interface Contact {
  id?: string;
  user_id?: string | null;
  name: string;
  email: string;
  country_code: string;
  phone_number: string;
  subject?: string;
  message: string;
  status?: 'unread' | 'read' | 'resolved';
  token?: string;
  submitted_at?: string;
  updated_at?: string;
}

export const createContact = async (data: Contact) => {
  const res = await api.post('/contact', data);
  return res.data;
};

export const getContacts = async () => {
  const res = await api.get('/contacts');
  return res.data as Contact[];
};

export const updateContact = async (id: string, data: Partial<Contact>) => {
  const res = await api.put(`/contacts/${id}`, data);
  return res.data;
};