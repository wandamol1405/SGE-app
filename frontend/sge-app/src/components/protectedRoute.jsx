import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    alert("Primero debes ingresar con email y contraseña.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
