// src/types/package.ts

export type PackageType = 'subscription' | 'event';

export interface Package {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  duration_days: number;
  is_active: boolean;
  package_type: PackageType;
  event_id?: string | null;
  capacity?: number | null;
  package_registration_deadline?: string | null;
  created_at: string;
  updated_at: string;
}

export interface PackageInput {
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  duration_days: number;
  is_active?: boolean;
  package_type: PackageType;
  event_id?: string | null;
  capacity?: number | null;
  package_registration_deadline?: string | null;
}
