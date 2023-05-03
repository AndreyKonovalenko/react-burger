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
