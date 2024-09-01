import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import VerifyLoginScreen from "./pages/VerifyLoginScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import Home from "./pages/Home";
import KeyFrame from "./pages/KeyFrame";
import Recipients from "./pages/Recipients";
import SelectRecipients from "./pages/SelectRecipients";
import MainHome from "./pages/MainHome";
import PrivateKey from "./pages/PrivateKey";
import PrublicKey from "./pages/PublicKey";
import { ToastContainer } from "react-toastify";

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
          path="/key-frame"
          element={<ProtectedRoute element={<KeyFrame />} />}
        />
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
          path="/private-key"
          element={<ProtectedRoute element={<PrivateKey />} />}
        />
        <Route
          path="/public-key"
          element={<ProtectedRoute element={<PrublicKey />} />}
        />
      </Routes>
    </>
  );
}
export default App;
