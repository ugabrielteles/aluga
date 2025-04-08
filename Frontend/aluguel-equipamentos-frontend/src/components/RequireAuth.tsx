import { Navigate } from 'react-router-dom';
import { useAuth, tokenExpired } from '../contexts/AuthContext';
import { JSX } from 'react';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { token } = useAuth();

  if (!token || tokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}