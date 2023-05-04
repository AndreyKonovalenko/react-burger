import { loginRequeset, registerRequeset } from "../../utils/burger-api";

export const SET_FORM_VALUE = "SET_FORM_VALUE";
export const CLEAR_FORM = "CLEAR_FORM";

export const SEND_REGISTER_REQUEST = "SEND_REGISTER_REQUEST";
export const SEND_REGISTER_REQUEST_SUCCESS = "SEND_REGISTER_REQUEST_SUCCESS";
export const SEND_REGISTER_REQUEST_ERROR = "SEND_REGISTER_REQUEST_ERROR";
export const SEND_LOGIN_REQUEST = "SEND_LOGIN_REQUEST";
export const SEND_LOGIN_REQUEST_SUCCESS = "SEND_LOGIN_REQUEST_SUCCESS";
export const SEND_LOGIN_REQUEST_ERROR = "SEND_LOGIN_REQUEST_ERROR";

export const setFormValue = ({ field, value }) => {
  return {
    type: SET_FORM_VALUE,
    payload: { field: field, value: value },
  };
};
export const clearForm = () => ({
  type: CLEAR_FORM,
});

export const register = () => async (dispatch, getState) => {
  dispatch({ type: SEND_REGISTER_REQUEST });
  try {
    const { name, email, password } = getState().auth.form;
    const response = await registerRequeset({ name, email, password });
    dispatch({ type: SEND_REGISTER_REQUEST_SUCCESS, payload: response.user });
  } catch (error) {
    dispatch({ type: SEND_REGISTER_REQUEST_ERROR, payload: error.message });
  }
};

export const login = () => async (dispatch, getState) => {
  dispatch({ type: SEND_LOGIN_REQUEST });
  try {
    const { email, password } = getState().auth.form;
    const response = await loginRequeset({ email, password });
    dispatch({ type: SEND_LOGIN_REQUEST_SUCCESS, payload: response.user });
  } catch (error) {
    dispatch({ type: SEND_LOGIN_REQUEST_ERROR, payload: error.message });
  }
};
