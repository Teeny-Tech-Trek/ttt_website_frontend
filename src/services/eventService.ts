// src/api/events.ts
import api from '../api/axios';
import { Event, EventInput, EventStatus } from '../types/event';

interface BatchUpdatePayload {
  ids: string[];
  // any subset of updatable fields:
  title?: string;
  slug?: string;
  description?: string;
  location?: string;
  start_time?: string;
  end_time?: string;
  registration_deadline?: string;
  payment_required?: boolean;
  status?: EventStatus;
  cancelled_at?: string;
}

/**
 * Attach Authorization header if token is provided
 */
function authHeaders(token?: string) {
  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    : { withCredentials: true };
}

/**
 * Public: fetch only published events
 * GET /api/events
 */
export async function getPublishedEvents(): Promise<Event[]> {
  const resp = await api.get<Event[]>('/events');
  return resp.data;
}

/**
 * Admin only: fetch events by status
 * GET /api/events?status=…
 */
export async function getEventsByStatus(
  status: EventStatus,
  token: string
): Promise<Event[]> {
  const config = {
    ...authHeaders(token),
    params: { status },
  };
  const resp = await api.get<Event[]>('/events', config);
  return resp.data;
}

/**
 * Admin only: create a new event (draft)
 * POST /api/events
 */
export async function createEvent(
  data: EventInput,
  token: string
): Promise<Event> {
  const config = authHeaders(token);
  const resp = await api.post<Event>('/events', data, config);
  return resp.data;
}

/**
 * Admin only: update a single event
 * PUT /api/events/:id
 */
export async function updateEvent(
  id: string,
  data: Partial<EventInput>,
  token: string
): Promise<Event> {
  const config = authHeaders(token);
  const resp = await api.put<Event>(`/events/${id}`, data, config);
  return resp.data;
}

/**
 * Admin only: batch update events
 * PUT /api/events/batch   body: { ids: [...], <fields> }
 */
export async function batchUpdateEvents(
  payload: BatchUpdatePayload,
  token: string
): Promise<{ message: string }> {
  const config = authHeaders(token);
  const resp = await api.put<{ message: string }>(
    '/events/batch',
    payload,
    config
  );
  return resp.data;
}

/**
 * Admin only: reactivate a soft-deleted event
 * PUT /api/events/:id/reactivate
 */
export async function reactivateEvent(
  id: string,
  token: string
): Promise<Event> {
  const config = authHeaders(token);
  const resp = await api.put<Event>(`/events/${id}/reactivate`, {}, config);
  return resp.data;
}

/**
 * Search events by any field (admin can filter by any, public gets only published)
 * GET /api/events/search?field1=val1&field2=val2
 * 
 */
export async function getEventsByField(
  params: Record<string, string | number | boolean>,
  token?: string
): Promise<Event[]> {
  const config = {
    ...authHeaders(token),
    params,
  };
  const resp = await api.get<Event[]>('/events/search', config);
  return resp.data;
}