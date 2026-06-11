// Shared layer that connects the two "tell us about yourself" touchpoints:
// the chatbot's intake gate (POST /api/chatbot/lead) and the homepage
// Contact Us form (createContact). Whichever one a visitor fills, the other
// gets bypassed — within a 30-day window that mirrors the backend's gate TTL.
//
// Source of truth:
//   - localStorage `ttt_lead_captured`  → frontend "instant skip" flag
//   - POST /api/chatbot/lead             → tells the backend's gate too,
//                                          so /chat doesn't re-prompt
// Both are written together; either alone would be insufficient.

export const CHAT_SESSION_STORAGE_KEY = 'ttt_chat_session_id';
export const LEAD_CAPTURED_STORAGE_KEY = 'ttt_lead_captured';
// Holds the visitor's submitted name/email (+ service/message) so the in-chat
// consultation booking can prefill them without re-asking. Mirrors the gate's
// 30-day TTL so it expires exactly when the lead form would reappear.
export const LEAD_IDENTITY_STORAGE_KEY = 'ttt_lead_identity';

// Mirrors the backend's 30-day capture TTL so the frontend bypass and the
// backend gate expire together.
const LEAD_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const DEFAULT_DEV_API_BASE_URL = 'http://localhost:5000';
const DEFAULT_PROD_API_BASE_URL = 'https://api.teenytechtrek.com';

export const getApiBaseUrl = (): string => {
  const fromEnv = import.meta.env?.VITE_API_BASE_URL as string | undefined;
  if (fromEnv) return fromEnv;
  return import.meta.env?.DEV ? DEFAULT_DEV_API_BASE_URL : DEFAULT_PROD_API_BASE_URL;
};

// Reuses the chatbot's session id so a lead captured via Contact Us satisfies
// the gate for the same anonymous visitor when they later open the chat.
export const getChatSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  try {
    const existing = window.localStorage.getItem(CHAT_SESSION_STORAGE_KEY);
    if (existing) return existing;
    const fresh = `web-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    window.localStorage.setItem(CHAT_SESSION_STORAGE_KEY, fresh);
    return fresh;
  } catch {
    return '';
  }
};

export type LeadCaptureSource = 'chatbot' | 'contact_us';

export interface LeadCapturedRecord {
  capturedAt: string; // ISO timestamp
  source: LeadCaptureSource;
}

// Returns true iff a non-expired capture record exists. Self-heals by clearing
// expired records so we don't suppress the form forever after the TTL lapses.
export const isLeadCaptured = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const raw = window.localStorage.getItem(LEAD_CAPTURED_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as Partial<LeadCapturedRecord> | null;
    if (!parsed?.capturedAt) return false;
    const age = Date.now() - new Date(parsed.capturedAt).getTime();
    if (Number.isNaN(age) || age > LEAD_TTL_MS) {
      window.localStorage.removeItem(LEAD_CAPTURED_STORAGE_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

export const markLeadCaptured = (source: LeadCaptureSource): void => {
  if (typeof window === 'undefined') return;
  try {
    const record: LeadCapturedRecord = {
      capturedAt: new Date().toISOString(),
      source,
    };
    window.localStorage.setItem(LEAD_CAPTURED_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* localStorage may be unavailable in private mode — non-fatal */
  }
};

export const clearLeadCaptured = (): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(LEAD_CAPTURED_STORAGE_KEY);
  } catch {
    /* non-fatal */
  }
};

export interface LeadIdentity {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

interface StoredLeadIdentity extends LeadIdentity {
  capturedAt: string; // ISO timestamp
}

// Persist the lead's details so the booking flow can prefill them later. PII is
// the visitor's own, stored only on their device. Best-effort (private mode).
export const storeLeadIdentity = (identity: LeadIdentity): void => {
  if (typeof window === 'undefined') return;
  try {
    const record: StoredLeadIdentity = {
      name: identity.name?.trim() || undefined,
      email: identity.email?.trim() || undefined,
      service: identity.service?.trim() || undefined,
      message: identity.message?.trim() || undefined,
      capturedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(LEAD_IDENTITY_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* non-fatal */
  }
};

// Returns the saved identity iff it exists and is within the 30-day TTL.
// Self-heals by clearing expired records, matching isLeadCaptured().
export const getLeadIdentity = (): LeadIdentity | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(LEAD_IDENTITY_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredLeadIdentity> | null;
    if (!parsed?.capturedAt) return null;
    const age = Date.now() - new Date(parsed.capturedAt).getTime();
    if (Number.isNaN(age) || age > LEAD_TTL_MS) {
      window.localStorage.removeItem(LEAD_IDENTITY_STORAGE_KEY);
      return null;
    }
    return {
      name: parsed.name,
      email: parsed.email,
      service: parsed.service,
      message: parsed.message,
    };
  } catch {
    return null;
  }
};

export interface ChatbotLeadPayload {
  name: string;
  email: string;
  service: string;
  message: string;
}

// Tells the chatbot backend a lead was captured for this session id. Called
// from the Contact Us flow so /api/chatbot/intro and /chat stop gating.
// Best-effort: failures are logged but don't break the contact submission —
// the localStorage flag still suppresses the chat form on the frontend, and
// the backend will eventually be notified on the user's next visit if needed.
export const notifyChatbotLead = async (payload: ChatbotLeadPayload): Promise<void> => {
  const sessionId = getChatSessionId();
  if (!sessionId) return;
  // Save identity here too, so a lead captured via Contact Us also prefills the
  // in-chat booking (mirrors the cross-touchpoint gate bypass).
  storeLeadIdentity({
    name: payload.name,
    email: payload.email,
    service: payload.service,
    message: payload.message,
  });
  try {
    await fetch(`${getApiBaseUrl()}/api/chatbot/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        name: payload.name,
        email: payload.email,
        service: payload.service,
        message: payload.message,
      }),
    });
  } catch (error) {
    console.warn('notifyChatbotLead failed (non-fatal):', error);
  }
};
