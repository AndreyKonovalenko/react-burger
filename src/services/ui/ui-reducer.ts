import {
  SELECT_INGREDIENT,
  UNSELECT_INGREDIENT,
  SHOW_ORDER_DETAILS,
  HIDE_ORDER_DETAILS,
  SELECT_INGREDIET_COLLECTION,
  SELECT_ORDER,
  UNSELECT_ORDER,
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from './ui-actions';
import { BUN } from '../../utils/ui-constants';
import type { TUiActions } from './ui-actions';
import type { TIngredient } from '../../utils/types';
import { TOrder } from '../ws/ws-reducer';

type TUi = {
  ingredient: TIngredient | null;
  order: TOrder | null;
  orderIsShown: boolean;
  dragging: boolean;
  owner?: string;
  collection: string;
  loading: boolean;
  error: string;
};
const intialState: TUi = {
  ingredient: null,
  order: null,
  orderIsShown: false,
  dragging: false,
  collection: BUN,
  loading: false,
  error: '',
};

export const uiReducer = (state = intialState, action: TUiActions): TUi => {
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
    case SELECT_ORDER: {
      return {
        ...state,
        order: action.payload,
      };
    }
    case UNSELECT_ORDER: {
      return {
        ...state,
        order: null,
      };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        order: action.payload,
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
