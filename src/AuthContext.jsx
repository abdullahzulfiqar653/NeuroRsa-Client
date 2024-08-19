import React, { createContext, useState, useContext, useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768); // Adjust breakpoint as needed
  const [showSaveConfirmationModal, setShowSaveConfirmationModal] = useState(false);
  const [showGeneratePassModal, setShowGeneratePassModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const handleSaveConfirmationModalVisibility = () => {
    setShowSaveConfirmationModal((prev) => !prev);
  };
  const handleGeneratePassVisibility = () => {
    setShowGeneratePassModal((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isDesktop, handleSaveConfirmationModalVisibility,handleGeneratePassVisibility, showSaveConfirmationModal, showGeneratePassModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
