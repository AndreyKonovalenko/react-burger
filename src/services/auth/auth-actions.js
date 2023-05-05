import jwt_decode from "jwt-decode";
import {
  loginRequeset,
  registerRequeset,
  recoveryRequest,
  refreshAccessTokenRequest,
  updateUserDataRequest,
  logoutRequest,
  resetPasswordRequest,
  getUserRequest,
} from "../../utils/burger-api";
import { error } from "console";

export const SET_FORM_VALUE = "SET_FORM_VALUE";
export const CLEAR_FORM = "CLEAR_FORM";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const RECOVERY_REQUEST = "RECOVERY_REQUEST";
export const RECOVERY_ERROR = "RECOVERY_ERROR";
export const RECOVERY_SUCCESS = "RECOVERY_SUCCESS";
export const RESET_PASS_REQUEST = "RESET_PASS_REQUEST";
export const RESET_PASS_ERROR = "RESET_PASS_ERROR";
export const RESET_PASS_SUCCESS = "RESET_PASS_SUCCESS";
export const REFRESH_ACCESS_REQUEST = "REFRESH_ACCESS_REQUEST";
export const REFRESH_ACCESS_ERROR = "REFRESH_ACCESS_ERROR";
export const REFRESH_ACCESS_SUCCESS = "REFRESH_ACCESS_SUCCESS";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_ERROR = "GET_USER_ERROR";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

// const token = getCookie("AccessToken");
// const decoded = jwt_decode(token);
// if (decoded.exp * 1000 < Date.now()) {

// }

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
    dispatch({ type: REGISTER_SUCCESS, payload: response.user });
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, payload: error.message });
  }
};

export const login = () => async (dispatch, getState) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { email, password } = getState().auth.form;
    const response = await loginRequeset({ email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: response.user });
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    const response = await logoutRequest();
    dispatch({ type: LOGOUT_ERROR, payload: response.user });
  } catch (error) {
    dispatch({ type: LOGOUT_SUCCESS, payload: error.message });
  }
};

export const rocoverPassword = () => async (dispatch, getState) => {
  dispatch({ type: RECOVERY_REQUEST });
  try {
    const { email } = getState().auth.form;
    const response = await recoveryRequest({ email });
    dispatch({ type: RECOVERY_SUCCESS, payload: response.message });
  } catch (error) {
    dispatch({ type: RECOVERY_SUCCESS, payload: error.message });
  }
};

export const refreshAccessToken = () => async (dispatch) => {
  dispatch({ type: REFRESH_ACCESS_REQUEST });
  try {
    await refreshAccessTokenRequest();
    dispatch({ type: REFRESH_ACCESS_SUCCESS });
  } catch (error) {
    dispatch({ type: REFRESH_ACCESS_ERROR, payload: error.message });
  }
};

export const resetPassword = () => async (dispatch, getState) => {
  dispatch({ type: RESET_PASS_REQUEST });
  try {
    const { password, token } = getState().auth.form;
    const response = await resetPasswordRequest({ password, token });
    dispatch({ type: RESET_PASS_SUCCESS, payload: response.message });
  } catch (error) {
    dispatch({ type: RESET_PASS_ERROR, payload: error.message });
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await getUserRequest();
    dispatch({ type: GET_USER_SUCCESS, payload: response.user });
  } catch (erro) {
    dispatch({ type: GET_USER_ERROR, payload: error.message });
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
    const response = await updateUserDataRequest(data);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.user });
  } catch (error) {
    dispatch({ type: UPDATE_USER_ERROR, payload: error.message });
  }
};
