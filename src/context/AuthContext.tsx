// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';

interface AuthContextType {
  user: { sub: string; role: string } | null;
  accessToken: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'signup';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let tokenFetched = false;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ sub: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const login = (token: string) => {
    setAccessToken(token);
    const decoded: any = jwtDecode(token);
    setUser({ sub: decoded.sub, role: decoded.role });
  };

  const logout = async () => {
    try {
      await api.post(
        '/auth/logout',
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (e) {
      console.warn('[Auth] Logout failed:', e);
    }
    setAccessToken(null);
    setUser(null);
  };

  const refreshToken = useCallback(async () => {
    if (tokenFetched) return;
    tokenFetched = true;
    try {
      const res = await api.post('/auth/refresh', {}, { withCredentials: true });
      const newToken = res.data.accessToken;
      login(newToken);
      console.log('[Auth] Token refreshed');
    } catch (err) {
      console.warn('[Auth] Refresh failed. Logging out.');
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  useEffect(() => {
    refreshToken().finally(() => setLoading(false));
  }, [refreshToken]);

  useEffect(() => {
    let timeout: number;
    let lastActivity = Date.now();
    let refreshing = false;

    const activityHandler = () => {
      const now = Date.now();
      const elapsed = now - lastActivity;
      lastActivity = now;

      if (elapsed > 5 * 60 * 1000 && !refreshing) {
        refreshing = true;
        refreshToken().finally(() => (refreshing = false));
      }

      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        console.log('[Auth] Auto-logout after 60 mins inactivity');
        logout();
      }, 60 * 60 * 1000);
    };

    window.addEventListener('mousemove', activityHandler);
    window.addEventListener('keydown', activityHandler);
    window.addEventListener('scroll', activityHandler);
    activityHandler();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', activityHandler);
      window.removeEventListener('keydown', activityHandler);
      window.removeEventListener('scroll', activityHandler);
    };
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      accessToken, 
      loading, 
      login, 
      logout,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      authModalMode
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};