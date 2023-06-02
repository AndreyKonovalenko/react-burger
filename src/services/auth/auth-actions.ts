import {
  loginRequeset,
  registerRequeset,
  recoveryRequest,
  refreshAccessTokenRequest,
  updateUserDataRequest,
  logoutRequest,
  resetPasswordRequest,
  getUserRequest,
  fetchWithRefresh,
} from '../../utils/burger-api';
import { setTokens } from '../../utils/burger-api';
import { TAppThunk, TAppDispatch} from '../storeTypes';

export const SET_FORM_VALUE: 'SET_FORM_VALUE' = 'SET_FORM_VALUE';
export const CLEAR_FORM: 'CLEAR_FORM' = 'CLEAR_FORM';
export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_ERROR: 'REGISTER_ERROR' = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_ERROR: 'LOGIN_ERROR' = 'LOGIN_ERROR';
export const RECOVERY_REQUEST: 'RECOVERY_REQUEST' = 'RECOVERY_REQUEST';
export const RECOVERY_ERROR = 'RECOVERY_ERROR';
export const RECOVERY_SUCCESS: 'RECOVERY_SUCCESS' = 'RECOVERY_SUCCESS';
export const RESET_PASS_REQUEST: 'RESET_PASS_REQUEST' = 'RESET_PASS_REQUEST';
export const RESET_PASS_ERROR: 'RESET_PASS_ERROR' = 'RESET_PASS_ERROR';
export const RESET_PASS_SUCCESS: 'RESET_PASS_SUCCESS' = 'RESET_PASS_SUCCESS';
export const REFRESH_ACCESS_REQUEST: 'REFRESH_ACCESS_REQUEST' =
  'REFRESH_ACCESS_REQUEST';
export const REFRESH_ACCESS_ERROR: 'REFRESH_ACCESS_ERROR' =
  'REFRESH_ACCESS_ERROR';
export const REFRESH_ACCESS_SUCCESS: 'REFRESH_ACCESS_SUCCESS' =
  'REFRESH_ACCESS_SUCCESS';
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_ERROR: 'LOGOUT_ERROR' = 'LOGOUT_ERROR';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_ERROR: 'GET_USER_ERROR' = 'GET_USER_ERROR';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_ERROR: 'UPDATE_USER_ERROR' = 'UPDATE_USER_ERROR';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const CLEAR_STATE: 'CLEAR_STATE' = 'CLEAR_STATE';
export const CLEAR_MESSAGE: 'CLEAR_MESSAGE' = 'CLEAR_MESSAGE';
export const CLEAR_ERROR: 'CLEAR_ERROR' = 'CLEAR_ERROR';


export type TUserActions = TSetFormValue | TClearFrom;

type TFromData = {
  field: string;
  value: string;
};

type TUser = { 
  name: string;
  email: string;
  accessToken: string;
  refreshTorken: string;
}

type TSetFormValue = {
  readonly type: typeof SET_FORM_VALUE;
  readonly payload: TFromData;
};

type TClearFrom = {
  readonly type: typeof CLEAR_FORM;
};

type TRegisterRequest = {
  readonly type: typeof REGISTER_REQUEST;
}
type TRegisterRequestSuccess = {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: TUser
}

type TRegisterRequestError = {
  readonly type: typeof REGISTER_ERROR;
  readonly payload: string
}

export const clearState = () => ({ type: CLEAR_STATE });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });
export const clearError = () => ({ type: CLEAR_ERROR });

export const setFormValue = ({ field, value }: TFromData): TSetFormValue => {
  return {
    type: SET_FORM_VALUE,
    payload: { field: field, value: value },
  };
};

export const clearForm = (): TClearFrom => ({
  type: CLEAR_FORM,
});

export const register = (): TAppThunk => async (dispatch: TAppDispatch, getState) => {
  dispatch((): TRegisterRequest => ({ type: REGISTER_REQUEST }) );
  try {
    const { name, email, password } = getState().auth.form;
    const response = await registerRequeset({ name, email, password });
    setTokens(response);
    dispatch((): TRegisterRequestSuccess => ({ type: REGISTER_SUCCESS, payload: response.user }));
  } catch (error: any) {
    dispatch((): TRegisterRequestError=>({ type: REGISTER_ERROR, payload: error.message }));
  }
};

export const login = () => async (dispatch, getState) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { email, password } = getState().auth.form;
    const response = await loginRequeset({ email, password });
    setTokens(response);
    dispatch({ type: LOGIN_SUCCESS, payload: response.user });
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    const response = await logoutRequest();
    dispatch({ type: LOGOUT_SUCCESS, payload: response.message });
  } catch (error: any) {
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
    const resposne = await refreshAccessTokenRequest();
    setTokens(resposne);
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
    const response = await fetchWithRefresh(getUserRequest);
    dispatch({ type: GET_USER_SUCCESS, payload: response.user });
  } catch (error) {
    dispatch({ type: GET_USER_ERROR, payload: error.message });
  }
};

export const updateUserData = () => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const form = getState().auth.form;
    let data = {};
    for (const element in form) {
      if (form[element] !== '') {
        data = { ...data, [element]: form[element] };
      }
    }
    const response = await fetchWithRefresh(updateUserDataRequest, data);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.user });
  } catch (error) {
    dispatch({ type: UPDATE_USER_ERROR, payload: error.message });
  }
};
