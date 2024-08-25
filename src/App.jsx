import { useEffect } from 'react';
import { Routes, Route, useNavigationType, useLocation } from 'react-router-dom';
import VerifyLoginScreen from './pages/VerifyLoginScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import Home from './pages/Home';
import KeyFrame from './pages/KeyFrame';

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = '';
    let metaDescription = '';

    switch (pathname) {
      case '/':
        title = '';
        metaDescription = '';
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector('head > meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/VerifyLoginScreen' element={<VerifyLoginScreen />} />
      <Route path='/register-seed' element={<RegisterScreen />} />
      <Route path='/key-frame' element={<KeyFrame />} />
    </Routes>
  );
}
export default App;
