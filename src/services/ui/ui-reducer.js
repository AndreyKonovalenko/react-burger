import {
  SELECT_INGREDIENT,
  UNSELECT_INGREDIENT,
  SHOW_ORDER_DETAILS,
  HIDE_ORDER_DETAILS,
} from "./ui-actions";
const intialState = {
  ingredient: null,
  orderIsShown: false,
};

export const uiReducer = (state = intialState, action) => {
  switch (action.type) {
    case SELECT_INGREDIENT: {
      return {
        ...state,
        ingredient: action.payload,
      };
    }
    case UNSELECT_INGREDIENT: {
      return {
        ...state,
        ingredient: null,
      };
    }
    case SHOW_ORDER_DETAILS: {
      return {
        ...state,
        orderIsShown: true,
      };
    }
    case HIDE_ORDER_DETAILS: {
      return {
        ...state,
        orderIsShown: false,
      };
    }
    default:
      return state;
  }
};
