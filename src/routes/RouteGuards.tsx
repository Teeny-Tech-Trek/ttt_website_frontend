// src/routes/RouteGuards.tsx
import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

type ProtectedRouteProps = {
  children: ReactNode;
  roles?: string[];
};

export const ProtectedRoute = ({ children, roles = [] }: ProtectedRouteProps) => {
  const { user, openAuthModal } = useAuth();
  const isAuthenticated = !!user;
  const hasRoleAccess = roles.length === 0 || (user && roles.includes(user.role));

  if (!isAuthenticated) {
    // Instead of redirecting to /login, open the modal
    openAuthModal('login');
    return null; // or return a loading spinner, or redirect to home
  }
  
  if (!hasRoleAccess) {
    // You might want to show an unauthorized message or redirect to home
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Access Denied</h2>
        <p className="text-gray-600">You don't have permission to access this page.</p>
      </div>
    </div>;
  }

  return <>{children}</>;
};

export const withAuthGuard = (Component: JSX.Element, roles: string[] = []) => {
  return <ProtectedRoute roles={roles}>{Component}</ProtectedRoute>;
};