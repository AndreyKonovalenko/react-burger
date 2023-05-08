import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { getAuthState } from '../../services/auth/auth-selectors';

import LoadingBage from '../loading-bage/loading-bage';
import { TO_LOGIN } from '../../utils/route-constants';

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, loading } = useSelector(getAuthState);

  useEffect(() => {
    if (!user) {
      navigate(TO_LOGIN, { state: { from: pathname }, replace: true });
    }
  }, [navigate, pathname, user]);

  if (loading) {
    return <LoadingBage />;
  }

  return user && element;
};

export default ProtectedRoute;
