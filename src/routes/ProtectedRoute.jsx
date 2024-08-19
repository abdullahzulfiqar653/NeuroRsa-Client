import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;
