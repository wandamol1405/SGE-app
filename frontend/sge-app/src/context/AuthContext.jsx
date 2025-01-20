// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginHome = (email, password) => {
    // Aquí puedes agregar la lógica de autenticación
    if (email && password) {
      setIsAuthenticated(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Credenciales incorrectas.");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loginHome, logout, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
