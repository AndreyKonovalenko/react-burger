import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { getCookie } from '../../utils/burger-api';

import { getAuthState } from '../../services/auth/auth-selectors';
import { getUser, refreshAccessToken } from '../../services/auth/auth-actions';
import LoadingBage from '../loading-bage/loading-bage';

const ProtectedRoute = ({ element }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(getAuthState);

  useEffect(() => {
    const token = getCookie('accessToken');
    const decoded = jwt_decode(token);
    if (decoded.exp * 1000 < Date.now()) {
      dispatch(refreshAccessToken());
    } else {
      dispatch(getUser());
    }
  }, [dispatch]);

  if (loading) {
    return <LoadingBage />;
  }

  return user ? element : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
