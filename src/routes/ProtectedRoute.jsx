import React from "react";
import { useAuth } from "../../AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;
