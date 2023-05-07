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
import {
  LOGIN,
  REGISTR,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  PROFILE,
  INGREDIENTS,
} from '../../utils/route-constants';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<BurgerPage />} />
          <Route path={LOGIN} element={<LoginPage />} />
          <Route path={REGISTR} element={<RegisterPage />} />
          <Route path={FORGOT_PASSWORD} element={<ForgetPasswordPage />} />
          <Route path={RESET_PASSWORD} element={<ResetPasswordPage />} />
          <Route
            path={`${INGREDIENTS}/:id`}
            element={<IngredientDetailsPage />}
          />
          <Route
            path={PROFILE}
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
