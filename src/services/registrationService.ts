// src/api/registrations.ts
import api from '../api/axios';
import {
  Registration,
  RegistrationInput,
  RegistrationStatus,
} from '../types/registration';

interface GetByFieldParams {
  field:
    | 'id'
    | 'event_id'
    | 'package_id'
    | 'status'
    | 'attendee_email'
    | 'registration_token'
    | 'user_id';
  value: string;
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
 * Create a new registration (admin only, per your route configuration)
 * POST /api/registrations
 */
export async function createRegistration(
  data: RegistrationInput,
  token: string
): Promise<Registration> {
  const config = authHeaders(token);
  const resp = await api.post<Registration>('/registrations', data, config);
  return resp.data;
}

/**
 * Get registrations by arbitrary field (public or admin)
 * GET /api/registrations?field=...&value=...
 */
export async function getRegistrationsByField(
  params: GetByFieldParams,
  token?: string
): Promise<Registration[]> {
  const cfg = {
    ...authHeaders(token),
    params: {
      field: params.field,
      value: params.value,
    },
  };
  const resp = await api.get<Registration[]>('/registrations', cfg);
  return resp.data;
}

/**
 * Update a single registration by ID (admin only)
 * PUT /api/registrations/:id
 */
export async function updateRegistration(
  id: string,
  data: Partial<RegistrationInput> & {
    status?: RegistrationStatus;
    cancelled_at?: string;
    attendee_name?: string;
    attendee_email?: string;
    phone_number?: string;
    order_id?: string;
    waitlist_position?: number;
  },
  token: string
): Promise<Registration> {
  const config = authHeaders(token);
  const resp = await api.put<Registration>(`/registrations/${id}`, data, config);
  return resp.data;
}

/**
 * Cancel a registration by its registration_token
 * POST /api/registrations/cancel/:token
 */
export async function cancelRegistrationByToken(
  tokenParam: string,
  token?: string
): Promise<{ message: string; registration: Registration }> {
  // Your route is router.post('/cancel/:token', authMiddleware, isSelf('id'), …)
  // but we treat tokenParam as the param. We still send Authorization if available.
  const config = authHeaders(token);
  const resp = await api.post<{
    message: string;
    registration: Registration;
  }>(`/registrations/cancel/${tokenParam}`, {}, config);
  return resp.data;
}

/**
 * Get all registrations for the authenticated user
 * GET /api/registrations/user
 */
export async function getUserRegistrations(
  token: string
): Promise<Registration[]> {
  const config = authHeaders(token);
  const resp = await api.get<Registration[]>('/registrations/user', config);
  return resp.data;
}

/**
 * Promote the next waitlisted registration for a package (admin only)
 * POST /api/registrations/promote/:package_id
 */
export async function promoteNextWaitlisted(
  packageId: string,
  token: string
): Promise<{ message: string; registration: Registration }> {
  const config = authHeaders(token);
  const resp = await api.post<{
    message: string;
    registration: Registration;
  }>(`/registrations/promote/${packageId}`, {}, config);
  return resp.data;
}

/**
 * Count how many are registered or waitlisted for a package
 * GET /api/registrations/count?package_id=...&status=registered|waitlisted
 */
export async function countByPackageAndStatus(
  packageId: string,
  status: 'registered' | 'waitlisted'
): Promise<{ package_id: string; status: string; count: number }> {
  const resp = await api.get<{
    package_id: string;
    status: string;
    count: number;
  }>(`/registrations/count`, {
    params: { package_id: packageId, status },
    withCredentials: true,
  });
  return resp.data;
}
