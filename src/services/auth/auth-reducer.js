import {
  LOGIN_FORM_SET_VALUE,
  CLEAR_LOGIN_FORM,
  SEND_LOGIN_REQUEST,
  SEND_LOGIN_REQUEST_ERROR,
  SEND_LOGIN_REQUEST_SUCCESS,
} from './auth-actions';

const intialState = {
  user: null,
  loading: false,
  error: '',
  loginForm: {
    email: '',
    password: '',
  },
};

export const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case LOGIN_FORM_SET_VALUE: {
      console.log('payload', action.payload, [action.payload.field]);
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          [action.payload.field]: action.payload.value,
        },
      };
    }
    case CLEAR_LOGIN_FORM: {
      return {
        ...state,
        loginForm: { email: '', password: '' },
      };
    }
    default:
      return state;
  }
};
