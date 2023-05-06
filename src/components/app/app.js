import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layout/layout';
import BurgerPage from '../../pages/burger-page/burger-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgetPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetailsPage from '../../pages/ingredient-details-page/ingredient-details-page';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<BurgerPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='forgot-password' element={<ForgetPasswordPage />} />
          <Route path='reset-password' element={<ResetPasswordPage />} />
          <Route path='ingredients/:id' element={<IngredientDetailsPage />} />
          <Route
            path='profile'
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
