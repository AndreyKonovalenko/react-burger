import {
  SET_FORM_VALUE,
  CLEAR_FORM,
  REGISTER_REQUEST,
  REGISTER_REQUEST_ERROR,
  REGISTER_REQUEST_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_REQUEST_ERROR,
  LOGIN_REQUEST_SUCCESS,
  RECOVERY_REQUEST,
  RECOVERY_REQUEST_ERROR,
  RECOVERY_REQUEST_SUCCESS,
  RESET_PASS_REQUEST,
  RESET_PASS_REQUEST_ERROR,
  RESET_PASS_REQUEST_SUCCESS,
  REFRESH_ACCESS_REQUEST,
  REFRESH_ACCESS_REQUEST_ERROR,
  REFRESH_ACCESS_REQUEST_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_ERROR,
  LOGOUT_REQUEST_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_REQUEST_ERROR,
  GET_USER_REQUEST_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_REQUEST_ERROR,
  UPDATE_USER_REQUEST_SUCCESS,
} from "./auth-actions";

const intialState = {
  user: null,
  loading: false,
  error: "",
  message: "",
  form: {
    name: "",
    email: "",
    password: "",
    token: "",
  },
};

export const authReducer = (state = intialState, action) => {
  switch (action.type) {
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
        form: { name: "", email: "", password: "" },
      };
    }

    case REGISTER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REGISTER_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case REGISTER_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: "",
        user: action.payload,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case LOGIN_REQUEST_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: "",
      };
    }
    case RECOVERY_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case RECOVERY_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case RECOVERY_REQUEST_SUCCESS: {
      return {
        ...state,
        message: action.payload,
        loading: false,
        error: "",
      };
    }
    case RESET_PASS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case RESET_PASS_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case RESET_PASS_REQUEST_SUCCESS: {
      return {
        ...state,
        message: action.password,
        loading: false,
        error: "",
      };
    }
    case REFRESH_ACCESS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REFRESH_ACCESS_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case REFRESH_ACCESS_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: "",
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGOUT_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case LOGOUT_REQUEST_SUCCESS: {
      return {
        ...state,
        massage: action.payload,
        loading: false,
        error: "",
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_USER_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case GET_USER_REQUEST_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: "",
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPDATE_USER_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case UPDATE_USER_REQUEST_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: "",
      };
    }

    default:
      return state;
  }
};
