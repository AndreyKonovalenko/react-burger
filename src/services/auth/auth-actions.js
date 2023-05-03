import { loginRequeset } from '../../utils/burger-api';
export const LOGIN_FORM_SET_VALUE = 'LOGIN_FORM_SET_VALUE';
export const CLEAR_LOGIN_FORM = 'CLEAR_LOGIN_FORM';
export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST';
export const SEND_LOGIN_REQUEST_SUCCESS = 'SEND_LOGIN_REQUEST_SUCCESS';
export const SEND_LOGIN_REQUEST_ERROR = 'SEND_LOGIN_REQUEST_ERROR';

export const setLoginFromValue = ({ field, value }) => {
  return {
    type: LOGIN_FORM_SET_VALUE,
    payload: { field: field, value: value },
  };
};

export const clearLoginForm = () => ({
  type: CLEAR_LOGIN_FORM,
});

export const login = () => async (dispatch, getState) => {
  dispatch({ type: SEND_LOGIN_REQUEST });
  try {
    const form = getState().auth.loginForm;
    const response = await loginRequeset(form);
    dispatch({ type: SEND_LOGIN_REQUEST_SUCCESS, payload: response.user });
  } catch (error) {
    dispatch({ type: SEND_LOGIN_REQUEST_ERROR, payload: error.message });
  }
};
