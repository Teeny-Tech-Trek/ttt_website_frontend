// src/services/adminService.ts - REAL API VERSION
import api from '../api/axios';

export interface DashboardStats {
  users: number;
  businesses: number;
  blogs: number;
  discussions: number;
  consultations: number;
  contacts: number;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  provider: string;
  createdAt: string;
}

export interface Business {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  published: boolean;
  createdAt: string;
  slug: string;
}

export interface Consultation {
  _id: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  message: string;
  status: string;
  createdAt: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}

// Dashboard Stats
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const res = await api.get('/dashboard');
  return res.data.stats;
};

// Users
export const listUsers = async (): Promise<User[]> => {
  const res = await api.get('/users');
  return res.data.users;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await api.delete(`/users/${userId}`);
};

// Businesses
export const listBusinesses = async (): Promise<Business[]> => {
  const res = await api.get('/businesses');
  return res.data.businesses;
};

// Blogs
export const listBlogs = async (): Promise<Blog[]> => {
  const res = await api.get('/blogs');
  return res.data.blogs;
};

export const togglePublishBlog = async (blogId: string): Promise<Blog> => {
  const res = await api.put(`/blogs/${blogId}/toggle-publish`);
  return res.data.blog;
};

// Consultations
export const listConsultations = async (): Promise<Consultation[]> => {
  const res = await api.get('/consultations');
  return res.data.consultations;
};

// Contacts
export const listContacts = async (): Promise<Contact[]> => {
  const res = await api.get('/contacts');
  return res.data.contacts;
};