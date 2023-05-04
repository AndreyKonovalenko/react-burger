import {
  loginRequeset,
  registerRequeset,
  recoveryRequest,
} from "../../utils/burger-api";

export const SET_FORM_VALUE = "SET_FORM_VALUE";
export const CLEAR_FORM = "CLEAR_FORM";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_REQUEST_ERROR = "REGISTER_REQUEST_ERROR";
export const REGISTER_REQUEST_SUCCESS = "REGISTER_REQUEST_SUCCESS";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REQUEST_ERROR = "LOGIN_REQUEST_ERROR";
export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";
export const RECOVERY_REQUEST = "RECOVERY_REQUEST";
export const RECOVERY_REQUEST_ERROR = "RECOVERY_REQUESET_ERROR";
export const RECOVERY_REQUEST_SUCCESS = "RECOVERY_REQUEST_SUCCESS";
export const RESET_PASS_REQUEST = "RESET_PASS_REQUEST";
export const RESET_PASS_REQUEST_ERROR = "RESET_PASS_REQUEST_ERROR";
export const RESET_PASS_REQUEST_SUCCESS = "RESET_PASS_REQUEST_SUCCESS";
export const REFRESH_ACCESS_REQUEST = "REFRESH_ACCESS_REQUEST";
export const REFRESH_ACCESS_REQUEST_ERROR = "REFRESH_ACCESS_REQUEST_ERROR";
export const REFRESH_ACCESS_REQUEST_SUCCESS = "REFRESH_ACCESS_REQUEST_SUCCESS";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_REQUEST_ERROR = "LOGOUT_REQUEST_ERROR";
export const LOGOUT_REQUEST_SUCCESS = "LOGOUT_REQUEST_SUCCESS";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_REQUEST_ERROR = "GET_USER_REQUEST_ERROR";
export const GET_USER_REQUEST_SUCCESS = "GET_USER_REQUEST_SUCCESS";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_REQUEST_ERROR = "UPDATE_USER_REQUEST_ERROR";
export const UPDATE_USER_REQUEST_SUCCESS = "UPDATE_USER_REQUEST_SUCCESS";

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
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { name, email, password } = getState().auth.form;
    const response = await registerRequeset({ name, email, password });
    dispatch({ type: REGISTER_REQUEST_SUCCESS, payload: response.user });
  } catch (error) {
    dispatch({ type: REGISTER_REQUEST_ERROR, payload: error.message });
  }
};

export const login = () => async (dispatch, getState) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { email, password } = getState().auth.form;
    const response = await loginRequeset({ email, password });
    dispatch({ type: LOGIN_REQUEST_SUCCESS, payload: response.user });
  } catch (error) {
    dispatch({ type: LOGIN_REQUEST_ERROR, payload: error.message });
  }
};

export const rocoverPassword = () => async (dispatch, getState) => {
  dispatch({ type: RECOVERY_REQUEST });
  try {
    const { email } = getState().auth.form;
    const response = await recoveryRequest({ email });
    dispatch({ type: RECOVERY_REQUEST_SUCCESS, payload: response.message });
  } catch (error) {
    dispatch({ type: RECOVERY_REQUEST_SUCCESS, payload: error.message });
  }
};

export const updateUserData = () => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const form = getState().auth.form;
    const data = {};
    for (const element of form) {
      if (form[element] !== "") {
        return { ...data, element };
      }
    }
    const response = await recoveryRequest(data);
    dispatch({ type: UPDATE_USER_REQUEST_SUCCESS, payload: response.user });
  } catch (error) {
    dispatch({ type: UPDATE_USER_REQUEST_ERROR, payload: error.message });
  }
};
