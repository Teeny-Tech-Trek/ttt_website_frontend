// src/routes/RouteGuards.tsx
import { ReactNode, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
  roles?: string[];
};

export const ProtectedRoute = ({ children, roles = [] }: ProtectedRouteProps) => {
  const { user, loading, openAuthModal } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const isAuthenticated = !!user;
    const hasRoleAccess = roles.length === 0 || (user && roles.includes(user.role));

    if (!isAuthenticated) {
      // User not logged in - open auth modal
      openAuthModal('login');
      navigate('/#home');
      return;
    }

    if (!hasRoleAccess) {
      // User logged in but doesn't have the right role
      navigate('/#home');
      return;
    }
  }, [user, loading, roles, navigate, openAuthModal]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isAuthenticated = !!user;
  const hasRoleAccess = roles.length === 0 || (user && roles.includes(user.role));

  // If not authenticated or no role access, don't render children
  if (!isAuthenticated || !hasRoleAccess) {
    return null;
  }

  return <>{children}</>;
};

export const withAuthGuard = (Component: JSX.Element, roles: string[] = []) => {
  return <ProtectedRoute roles={roles}>{Component}</ProtectedRoute>;
};