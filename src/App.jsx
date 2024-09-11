import { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import MainHome from "./pages/MainHome";
import KeyDisplay from "./pages/KeyDisplay";
import Recipients from "./pages/Recipients";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import SelectRecipients from "./pages/SelectRecipients";
import VerifyLoginScreen from "./pages/VerifyLoginScreen";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);
  const CloseButton = ({ closeToast }) => (
    <button
      onClick={() => {
        closeToast();
      }}
      className="alert-btn"
    >
      <img src="/close-btn.svg" className="w-4 h-4" /> Close
    </button>
  );

  return (
    <>
      <ToastContainer
        closeButton={CloseButton}
        className="w-full max-w-[1000px] xs:left-0 sm:left-0 md:left-auto xs:right-0 sm:right-0 lg:!right-[1%] items-center"
        toastClassName={() => "Toastify__toast bg-[#345360] text-white"}
        bodyClassName={() => "Toastify__toast-body text-white"}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/VerifyLoginScreen" element={<VerifyLoginScreen />} />
        <Route path="/register-seed" element={<RegisterScreen />} />
        <Route
          path="/my-recipients"
          element={<ProtectedRoute element={<Recipients />} />}
        />
        <Route
          path="/select-recipients"
          element={<ProtectedRoute element={<SelectRecipients />} />}
        />
        <Route
          path="/main-home"
          element={<ProtectedRoute element={<MainHome />} />}
        />
        <Route
          path="/key-display"
          element={<ProtectedRoute element={<KeyDisplay />} />}
        />
      </Routes>
    </>
  );
}
export default App;
