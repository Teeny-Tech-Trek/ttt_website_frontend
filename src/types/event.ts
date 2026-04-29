// src/types/event.ts

export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';

export interface Event {
  id: string;
  created_by: string;
  title?: string;
  slug?: string;
  description?: string;
  location?: string;
  start_time?: string;
  end_time?: string;
  registration_deadline?: string;
  packages_ids: string[];
  payment_required: boolean;
  status: EventStatus;
  published_at?: string;
  cancelled_at?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface EventInput {
  created_by: string;
  title?: string;
  slug?: string;
  description?: string;
  location?: string;
  start_time?: string;
  end_time?: string;
  registration_deadline?: string;
  packages_ids?: string[];         // you can send an empty array if none
  payment_required?: boolean;
  status?: EventStatus;            // default to 'draft'
}
