// src/services/orderService.ts
import api from '../api/axios';

export interface Order {
  id?: string;
  user_id: string;
  package_id: string;
  payment_gateway?: string;
  payment_id: string;
  amount_paid: number;
  currency?: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  purchased_at?: string;
  access_expires_at?: string;
  updated_at?: string;
}

export const createOrder = async (data: Order) => {
  const res = await api.post('/orders', data);
  return res.data;
};

export const getOrders = async () => {
  const res = await api.get('/orders');
  return res.data as Order[];
};

export const getOrderById = async (id: string) => {
  const res = await api.get(`/orders/${id}`);
  return res.data as Order;
};

export const updateOrder = async (id: string, data: Partial<Order>) => {
  const res = await api.put(`/orders/${id}`, data);
  return res.data;
};

export const updatePaymentStatus = async (id: string, status: Order['payment_status']) => {
  const res = await api.patch(`/orders/${id}/status`, { status });
  return res.data;
};