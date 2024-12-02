import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/AuthProvider'; // Use the Auth context

const PrivateRoute = () => {
  const { token } = useAuth();

  // If no token or session is expired, redirect to login
  if (!token || !isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Render the protected route
};

const isTokenValid = (token) => {
  const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
  const exp = decoded.exp * 1000; // Convert exp to milliseconds
  return Date.now() < exp; // Return true if the token is still valid
};

export default PrivateRoute;