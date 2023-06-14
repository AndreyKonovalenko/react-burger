import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
} from './burger-ingredients-actions';
import type { TIngredient } from '../../utils/types';
import type { TBurgerIngredientsActions } from './burger-ingredients-actions';

export type TIngredients = {
  ingredients: Array<TIngredient>;
  error: string;
  loading: boolean;
};

const initialState: TIngredients = {
  ingredients: [],
  error: '',
  loading: false,
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: TBurgerIngredientsActions
): TIngredients => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_INGREDIENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        loading: false,
        error: '',
      };

    default:
      return state;
  }
};
