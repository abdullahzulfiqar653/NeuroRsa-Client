import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

const isTokenValid = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [showSaveConfirmationModal, setShowSaveConfirmationModal] =
    useState(false);
  const [showGeneratePassModal, setShowGeneratePassModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [generatorPassword, setGeneratorPassword] = useState("");

  useEffect(() => {
    if (isTokenValid()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const signup = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
  };

  const handleSaveConfirmationModalVisibility = () => {
    setShowSaveConfirmationModal((prev) => !prev);
  };

  const handleGeneratePassVisibility = () => {
    setShowGeneratePassModal((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        isDesktop,
        isAuthenticated,
        generatorPassword,
        setGeneratorPassword,
        showGeneratePassModal,
        showSaveConfirmationModal,
        handleGeneratePassVisibility,
        handleSaveConfirmationModalVisibility,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
