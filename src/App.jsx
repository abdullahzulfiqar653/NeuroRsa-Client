import { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

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

  return (
    <>
      <ToastContainer />
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
