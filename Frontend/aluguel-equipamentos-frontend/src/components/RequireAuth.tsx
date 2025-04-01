import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { JSX } from 'react';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { token } = useAuth();

  console.log(token)

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}