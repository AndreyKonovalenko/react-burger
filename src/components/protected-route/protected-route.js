import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCookie } from '../../utils/burger-api';
import { getAuthState } from '../../services/auth/auth-selectors';
import { getUser } from '../../services/auth/auth-actions';
import LoadingBage from '../loading-bage/loading-bage';

const ProtectedRoute = ({ element }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, loading } = useSelector(getAuthState);
  useEffect(() => {
    const token = getCookie('accessToken');
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: pathname }, replace: true });
    }
  }, [navigate, pathname, user]);

  if (loading) {
    return <LoadingBage />;
  }

  return user && element;
};

export default ProtectedRoute;
