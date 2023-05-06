import {
  SET_FORM_VALUE,
  CLEAR_FORM,
  REGISTER_REQUEST,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  RECOVERY_REQUEST,
  RECOVERY_ERROR,
  RECOVERY_SUCCESS,
  RESET_PASS_REQUEST,
  RESET_PASS_ERROR,
  RESET_PASS_SUCCESS,
  REFRESH_ACCESS_REQUEST,
  REFRESH_ACCESS_ERROR,
  REFRESH_ACCESS_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  CLEAR_STATE,
  CLEAR_MESSAGE,
  CLEAR_ERROR,
} from './auth-actions';

const initialState = {
  user: null,
  loading: false,
  error: '',
  message: '',
  form: {
    name: '',
    email: '',
    password: '',
    token: '',
  },
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_STATE: {
      return initialState;
    }
    case CLEAR_MESSAGE: {
      return {
        ...state,
        message: '',
      };
    }
    case CLEAR_ERROR: {
      return {
        ...state,
        error: '',
      };
    }
    case SET_FORM_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.field]: action.payload.value,
        },
      };
    }
    case CLEAR_FORM: {
      return {
        ...state,
        form: { name: '', email: '', password: '', token: '' },
      };
    }

    case REGISTER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        user: action.payload,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: '',
      };
    }
    case RECOVERY_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case RECOVERY_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case RECOVERY_SUCCESS: {
      return {
        ...state,
        message: action.payload,
        loading: false,
        error: '',
      };
    }
    case RESET_PASS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case RESET_PASS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case RESET_PASS_SUCCESS: {
      return {
        ...state,
        message: action.password,
        loading: false,
        error: '',
      };
    }
    case REFRESH_ACCESS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REFRESH_ACCESS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case REFRESH_ACCESS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        message: action.payload,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: '',
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: '',
        message: 'Двнные пользователя успешно обновлены!',
      };
    }

    default:
      return state;
  }
};
