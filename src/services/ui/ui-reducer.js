import {
  SELECT_INGREDIENT,
  UNSELECT_INGREDIENT,
  SHOW_ORDER_DETAILS,
  HIDE_ORDER_DETAILS,
  SELECT_INGREDIET_COLLECTION,
} from './ui-actions';
import { BUN } from '../../utils/ui-constants';

const intialState = {
  ingredient: null,
  orderIsShown: false,
  dragging: false,
  collection: BUN,
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
    case SELECT_INGREDIET_COLLECTION: {
      return {
        ...state,
        collection: action.payload,
      };
    }

    default:
      return state;
  }
};
