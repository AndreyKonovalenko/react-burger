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
import { TUser } from './auth-reducer';
import { setTokens } from '../../utils/burger-api';
import { TAppThunk, TAppDispatch } from '../storeTypes';

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

type TFromFieldData = {
  field: string;
  value: string;
};

type TSetFormValue = {
  readonly type: typeof SET_FORM_VALUE;
  readonly payload: TFromFieldData;
};

type TClearFrom = {
  readonly type: typeof CLEAR_FORM;
};

type TClearState = {
  readonly type: typeof CLEAR_STATE;
};

type TClearMessage = {
  readonly type: typeof CLEAR_MESSAGE;
};

type TClearError = {
  readonly type: typeof CLEAR_ERROR;
};

type TRegisterRequest = {
  readonly type: typeof REGISTER_REQUEST;
};
type TRegisterRequestSuccess = {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: TUser;
};

type TRegisterRequestError = {
  readonly type: typeof REGISTER_ERROR;
  readonly payload: string;
};

type TLoginRequest = {
  readonly type: typeof LOGIN_REQUEST;
};
type TLoginRequestSuccess = {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: TUser;
};

type TLoginRequestError = {
  readonly type: typeof LOGIN_ERROR;
  readonly payload: string;
};

type TLogoutRequest = {
  readonly type: typeof LOGOUT_REQUEST;
};

type TLogoutRequestSuccess = {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly payload: string;
};

type TLogoutRequestError = {
  readonly type: typeof LOGOUT_ERROR;
  readonly payload: string;
};

type TRecoveryRequest = {
  readonly type: typeof RECOVERY_REQUEST;
};

type TRecoveryRequestSuccess = {
  readonly type: typeof RECOVERY_SUCCESS;
  readonly payload: string;
};

type TRecoveryRequestError = {
  readonly type: typeof RECOVERY_ERROR;
  readonly payload: string;
};

type TRefreshRequest = {
  readonly type: typeof REFRESH_ACCESS_REQUEST;
};

type TRefreshRequestSuccess = {
  readonly type: typeof REFRESH_ACCESS_SUCCESS;
};

type TRefreshRequestError = {
  readonly type: typeof REFRESH_ACCESS_ERROR;
  readonly payload: string;
};

type TResetPasswordRequeset = {
  readonly type: typeof RESET_PASS_REQUEST;
};

type TResetPasswordSuccess = {
  readonly type: typeof RESET_PASS_SUCCESS;
  readonly payload: string;
};

type TResetPasswordError = {
  readonly type: typeof RESET_PASS_ERROR;
  readonly payload: string;
};
type TGetUserRequest = {
  readonly type: typeof GET_USER_REQUEST;
};

type TGetUserSuccess = {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: TUser;
};

type TGetUserError = {
  readonly type: typeof GET_USER_ERROR;
  readonly payload: string;
};

type TUpdateUserRequest = {
  readonly type: typeof UPDATE_USER_REQUEST;
};

type TUpdateUserSuccess = {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: TUser;
};

type TUpdateUserError = {
  readonly type: typeof UPDATE_USER_ERROR;
  readonly payload: string;
};

export type TAuthActions =
  | TSetFormValue
  | TClearFrom
  | TClearState
  | TClearMessage
  | TClearError
  | TRegisterRequest
  | TRegisterRequestSuccess
  | TRegisterRequestError
  | TLoginRequest
  | TLoginRequestSuccess
  | TLoginRequestError
  | TLogoutRequest
  | TLogoutRequestSuccess
  | TLogoutRequestError
  | TRecoveryRequest
  | TRecoveryRequestSuccess
  | TRecoveryRequestError
  | TRefreshRequest
  | TRefreshRequestSuccess
  | TRefreshRequestError
  | TResetPasswordRequeset
  | TResetPasswordSuccess
  | TResetPasswordError
  | TGetUserRequest
  | TGetUserSuccess
  | TGetUserError
  | TUpdateUserRequest
  | TUpdateUserSuccess
  | TUpdateUserError;

export const clearState = (): TClearState => ({ type: CLEAR_STATE });
export const clearMessage = (): TClearMessage => ({ type: CLEAR_MESSAGE });
export const clearError = (): TClearError => ({ type: CLEAR_ERROR });

export const setFormValue = ({
  field,
  value,
}: TFromFieldData): TSetFormValue => {
  return {
    type: SET_FORM_VALUE,
    payload: { field: field, value: value },
  };
};

export const clearForm = (): TClearFrom => ({
  type: CLEAR_FORM,
});

export const register =
  (): TAppThunk => async (dispatch: TAppDispatch, getState) => {
    dispatch(((): TRegisterRequest => ({ type: REGISTER_REQUEST }))());
    try {
      const { name, email, password } = getState().auth.form;
      const response = await registerRequeset({ name, email, password });
      setTokens(response);
      dispatch(
        ((): TRegisterRequestSuccess => ({
          type: REGISTER_SUCCESS,
          payload: response.user,
        }))()
      );
    } catch (error: any) {
      dispatch(
        ((): TRegisterRequestError => ({
          type: REGISTER_ERROR,
          payload: error.message,
        }))()
      );
    }
  };

export const login =
  (): TAppThunk => async (dispatch: TAppDispatch, getState) => {
    dispatch(((): TLoginRequest => ({ type: LOGIN_REQUEST }))());
    try {
      const { email, password } = getState().auth.form;
      const response = await loginRequeset({ email, password });
      setTokens(response);
      dispatch(
        ((): TLoginRequestSuccess => ({
          type: LOGIN_SUCCESS,
          payload: response.user,
        }))()
      );
    } catch (error: any) {
      dispatch(
        ((): TLoginRequestError => ({
          type: LOGIN_ERROR,
          payload: error.message,
        }))()
      );
    }
  };

export const logout = (): TAppThunk => async (dispatch: TAppDispatch) => {
  dispatch(((): TLogoutRequest => ({ type: LOGOUT_REQUEST }))());
  try {
    const response = await logoutRequest();
    dispatch(
      ((): TLogoutRequestSuccess => ({
        type: LOGOUT_SUCCESS,
        payload: response.message,
      }))()
    );
  } catch (error: any) {
    dispatch(
      ((): TLogoutRequestError => ({
        type: LOGOUT_ERROR,
        payload: error.message,
      }))()
    );
  }
};

export const rocoverPassword = (): TAppThunk => async (dispatch, getState) => {
  dispatch(((): TRecoveryRequest => ({ type: RECOVERY_REQUEST }))());
  try {
    const { email } = getState().auth.form;
    const response = await recoveryRequest({ email });
    dispatch(
      ((): TRecoveryRequestSuccess => ({
        type: RECOVERY_SUCCESS,
        payload: response.message,
      }))()
    );
  } catch (error: any) {
    dispatch(
      ((): TRecoveryRequestError => ({
        type: RECOVERY_ERROR,
        payload: error.message,
      }))()
    );
  }
};

export const refreshAccessToken =
  (): TAppThunk => async (dispatch: TAppDispatch) => {
    dispatch(((): TRefreshRequest => ({ type: REFRESH_ACCESS_REQUEST }))());
    try {
      const resposne = await refreshAccessTokenRequest();
      setTokens(resposne);
      dispatch(
        ((): TRefreshRequestSuccess => ({ type: REFRESH_ACCESS_SUCCESS }))()
      );
    } catch (error: any) {
      dispatch(
        ((): TRefreshRequestError => ({
          type: REFRESH_ACCESS_ERROR,
          payload: error.message,
        }))()
      );
    }
  };

export const resetPassword =
  (): TAppThunk => async (dispatch: TAppDispatch, getState) => {
    dispatch(((): TResetPasswordRequeset => ({ type: RESET_PASS_REQUEST }))());
    try {
      const { password, token } = getState().auth.form;
      const response = await resetPasswordRequest({ password, token });
      dispatch(
        ((): TResetPasswordSuccess => ({
          type: RESET_PASS_SUCCESS,
          payload: response.message,
        }))()
      );
    } catch (error: any) {
      dispatch(
        ((): TResetPasswordError => ({
          type: RESET_PASS_ERROR,
          payload: error.message,
        }))()
      );
    }
  };

export const getUser = (): TAppThunk => async (dispatch: TAppDispatch) => {
  dispatch(((): TGetUserRequest => ({ type: GET_USER_REQUEST }))());
  try {
    const response = await fetchWithRefresh(getUserRequest);
    dispatch(
      ((): TGetUserSuccess => ({
        type: GET_USER_SUCCESS,
        payload: response.user,
      }))()
    );
  } catch (error: any) {
    dispatch(
      ((): TGetUserError => ({
        type: GET_USER_ERROR,
        payload: error.message,
      }))()
    );
  }
};

export const updateUserData =
  (): TAppThunk => async (dispatch: TAppDispatch, getState) => {
    dispatch(((): TUpdateUserRequest => ({ type: UPDATE_USER_REQUEST }))());
    try {
      const form: { [key: string]: string } = getState().auth.form;
      let data = {};
      for (const element in form) {
        if (form[element] !== '') {
          data = { ...data, [element]: form[element] };
        }
      }
      const response = await fetchWithRefresh(updateUserDataRequest, data);
      dispatch(
        ((): TUpdateUserSuccess => ({
          type: UPDATE_USER_SUCCESS,
          payload: response.user,
        }))()
      );
    } catch (error: any) {
      dispatch(
        ((): TUpdateUserError => ({
          type: UPDATE_USER_ERROR,
          payload: error.message,
        }))()
      );
    }
  };
