import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * A wrapper component that enforces authentication.
 * If no userRole is present in localStorage, it redirects to the login page.
 */
const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem('userRole');

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    // Redirect based on their actual role to avoid infinite loops or 404s
    return <Navigate to={userRole === 'admin' ? "/admin-dashboard" : "/student-dashboard"} replace />;
  }

  return children;
};

export default ProtectedRoute;
