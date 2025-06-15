// src/api/packages.ts
import api from '../api/axios';
import { Package, PackageInput } from '../types/package';

interface FieldParams {
  field: 'id' | 'slug' | 'package_type' | 'event_id' | 'is_active';
  value: string | boolean;
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
 * Admin only: Create a new package
 * POST /api/packages
 */
export async function createPackage(
  data: PackageInput,
  token: string
): Promise<Package> {
  const config = authHeaders(token);
  const resp = await api.post<Package>('/packages', data, config);
  return resp.data;
}

/**
 * Admin only: Get all packages (no status filter)
 * GET /api/packages
 */
export async function getAllPackages(token: string): Promise<Package[]> {
  const config = authHeaders(token);
  const resp = await api.get<Package[]>('/packages', config);
  return resp.data;
}

/**
 * Admin only: Get packages by arbitrary field
 * GET /api/packages/search?field=...&value=...
 */
export async function getPackagesByField(
  params: FieldParams,
  token: string
): Promise<Package[]> {
  const config = {
    ...authHeaders(token),
    params: {
      field: params.field,
      value: params.value,
    },
  };
  const resp = await api.get<Package[]>('/packages/search', config);
  return resp.data;
}

/**
 * Public: Get all public (is_active = TRUE) packages
 * GET /api/packages/public
 */
export async function getPublicPackages(): Promise<Package[]> {
  const resp = await api.get<Package[]>('/packages/public');
  return resp.data;
}

/**
 * Public: Get public packages by arbitrary field
 * GET /api/packages/public/search?field=...&value=...
 */
export async function getPublicPackagesByField(
  field: 'id' | 'slug' | 'package_type' | 'event_id',
  value: string
): Promise<Package[]> {
  const resp = await api.get<Package[]>('/packages/public/search', {
    params: { field, value },
    withCredentials: true,
  });
  return resp.data;
}

/**
 * Admin only: Update a package by ID
 * PUT /api/packages/:id
 */
export async function updatePackage(
  id: string,
  data: Partial<PackageInput>,
  token: string
): Promise<Package> {
  const config = authHeaders(token);
  const resp = await api.put<Package>(`/packages/${id}`, data, config);
  return resp.data;
}

/**
 * Admin only: Deactivate (soft-delete) a package
 * PUT /api/packages/:id/deactivate
 */
export async function deactivatePackage(
  id: string,
  token: string
): Promise<Package> {
  const config = authHeaders(token);
  const resp = await api.put<Package>(`/packages/${id}/deactivate`, {}, config);
  return resp.data;
}

/**
 * Admin only: Reactivate a soft-deleted package
 * PUT /api/packages/:id/reactivate
 */
export async function reactivatePackage(
  id: string,
  token: string
): Promise<Package> {
  const config = authHeaders(token);
  const resp = await api.put<Package>(`/packages/${id}/reactivate`, {}, config);
  return resp.data;
}
