// src/routes/RouteGuards.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type ProtectedRouteProps = {
  children: ReactNode;
  roles?: string[];
};

export const ProtectedRoute = ({ children, roles = [] }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const hasRoleAccess = roles.length === 0 || (user && roles.includes(user.role));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!hasRoleAccess) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const withAuthGuard = (Component: JSX.Element, roles: string[] = []) => {
  return <ProtectedRoute roles={roles}>{Component}</ProtectedRoute>;
};
