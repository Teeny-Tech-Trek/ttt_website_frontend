// src/services/newsletterService.ts
import api from '../api/axios';

export interface NewsletterSubscription {
  id?: string;
  email: string;
  subscribed_at?: string;
  is_verified?: boolean;
  unsubscribe_token?: string;
}

export const subscribeNewsletter = async (email: string) => {
  const res = await api.post('/newsletter/subscribe', { email });
  return res.data as NewsletterSubscription;
};

export const getAllSubscriptions = async () => {
  const res = await api.get('/newsletters');
  return res.data as NewsletterSubscription[];
};
