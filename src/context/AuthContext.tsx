// Auth was removed from the public site. This stub keeps `useAuth` callable so
// admin scaffolding (kept in the repo but unrouted) and shared layout code
// continue to compile. All values are null/no-op — there is no auth state.
import { ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  provider: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'signup';
}

const noop = () => {};

const STUB: AuthContextType = {
  user: null,
  accessToken: null,
  loading: false,
  login: noop,
  logout: noop,
  isAuthModalOpen: false,
  openAuthModal: noop,
  closeAuthModal: noop,
  authModalMode: 'login',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => <>{children}</>;

export const useAuth = (): AuthContextType => STUB;
