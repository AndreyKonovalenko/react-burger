import { TRootState } from '../storeTypes';

export const getUserState = (state: TRootState) => state.auth.user;
export const getFormState = (state: TRootState) => state.auth.form;
export const getAuthState = (state: TRootState) => state.auth;
export const getAuthError = (state: TRootState) => state.auth.error;
