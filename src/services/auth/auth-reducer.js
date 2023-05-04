import {
  SET_FORM_VALUE,
  CLEAR_FORM,
  SEND_REGISTER_REQUEST,
  SEND_REGISTER_REQUEST_SUCCESS,
  SEND_REGISTER_REQUEST_ERROR,
  SEND_LOGIN_REQUEST,
  SEND_LOGIN_REQUEST_SUCCESS,
  SEND_LOGIN_REQUEST_ERROR,
} from "./auth-actions";

const intialState = {
  user: null,
  loading: false,
  error: "",
  form: {
    name: "",
    email: "",
    password: "",
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

    case SEND_REGISTER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SEND_REGISTER_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case SEND_REGISTER_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: "",
        user: action.payload,
      };
    }
    case SEND_LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SEND_LOGIN_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case SEND_LOGIN_REQUEST_SUCCESS: {
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
