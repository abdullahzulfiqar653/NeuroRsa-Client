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
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({});
  const [isOpenKeyPair, setIsOpenKeypair] = useState(false);
  const [recipientData, setRecipientData] = useState("");

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        setStep(3);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const closeModal = () => {
    setIsOpenKeypair(false);
    setFormValues({});
    setErrors({});
  };
  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 4));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));
  const openModal = () => {
    setIsOpenKeypair(true);
    setStep(1);
  };

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

  const handleModal = (item = null) => {
    setRecipientData(item);
    setIsOpen((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        search,
        setSearch,
        isDesktop,
        isOpen,
        step,
        isOpenKeyPair,
        setStep,
        closeModal,
        errors,
        setErrors,
        formValues,
        setFormValues,
        nextStep,
        prevStep,
        openModal,
        recipientData,
        setRecipientData,
        handleModal,
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
