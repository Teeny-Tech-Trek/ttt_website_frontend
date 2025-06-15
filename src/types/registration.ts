// src/types/registration.ts

export type RegistrationStatus =
  | 'registered'
  | 'waitlisted'
  | 'cancelled'
  | 'attended'
  | 'no_show';

export interface Registration {
  id: string;
  event_id: string;
  user_id?: string | null;
  attendee_name?: string | null;
  attendee_email: string;
  phone_number?: string | null;
  package_id: string;
  order_id?: string | null;
  status: RegistrationStatus;
  registered_at: string;
  cancelled_at?: string | null;
  waitlist_position?: number | null;
  registration_token: string;
  created_at: string;
  updated_at: string;
}

export interface RegistrationInput {
  event_id: string;
  user_id?: string | null;
  attendee_name?: string | null;
  attendee_email: string;
  phone_number?: string | null;
  package_id: string;
  order_id?: string | null;
  status?: RegistrationStatus;       // default to 'registered'
  waitlist_position?: number | null;
}
