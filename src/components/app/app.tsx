import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import ProfileUserForm from '../profile-user-form/profile-user-form';
import ProfileOrders from '../profile-order/profile-order';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import {
  TO_LOGIN,
  TO_FORGOT_PASSWORD,
  TO_PROFILE,
  TO_REGISTER,
  TO_RESET_PASSWORD,
  TO_INGREDIENTS,
  TO_ORDERS,
} from '../../utils/route-constants';
import { getUser } from '../../services/auth/auth-actions';
import { getCookie } from '../../utils/burger-api';
import { loadIngerdients } from '../../services/burger-ingredients/burger-ingredients-actions';

const App = (): JSX.Element => {
  const dispatch = useDispatch() as any;
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      dispatch(getUser());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadIngerdients());
  }, [dispatch]);
  
  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<Layout />}>
          <Route index element={<BurgerPage />} />
          <Route path={TO_LOGIN} element={<LoginPage />} />
          <Route path={TO_REGISTER} element={<RegisterPage />} />
          <Route path={TO_FORGOT_PASSWORD} element={<ForgetPasswordPage />} />
          <Route path={TO_RESET_PASSWORD} element={<ResetPasswordPage />} />
          <Route
            path={`${TO_INGREDIENTS}/:id`}
            element={<IngredientDetailsPage />}
          />
          <Route
            path={TO_PROFILE}
            element={<ProtectedRoute element={<ProfilePage />} />}>
            <Route index element={<ProfileUserForm />} />
            <Route
              path={`${TO_PROFILE}${TO_ORDERS}`}
              element={<ProfileOrders />}
            />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path={`${TO_INGREDIENTS}/:id`}
            element={
              <Modal title={'Детали ингредиета'}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
