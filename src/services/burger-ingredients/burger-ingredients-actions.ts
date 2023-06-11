import { getIngerdients } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';
import { TAppThunk, TAppDispatch } from '../storeTypes';
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' =
  'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' =
  'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' =
  'GET_INGREDIENTS_ERROR';

type TGetIngredientsRequest = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

type TGetIngredientsSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<TIngredient>;
};

type TGetIngredientsError = {
  readonly type: typeof GET_INGREDIENTS_ERROR;
  readonly payload: string;
};

export type TBurgerIngredientsActions =
  | TGetIngredientsRequest
  | TGetIngredientsSuccess
  | TGetIngredientsError;

export const loadIngerdients =
  (): TAppThunk => async (dispatch: TAppDispatch) => {
    dispatch(
      ((): TGetIngredientsRequest => ({ type: GET_INGREDIENTS_REQUEST }))()
    );
    try {
      const response = await getIngerdients();
      dispatch(
        ((): TGetIngredientsSuccess => ({
          type: GET_INGREDIENTS_SUCCESS,
          payload: response.data,
        }))()
      );
    } catch (error: any) {
      dispatch(
        ((): TGetIngredientsError => ({
          type: GET_INGREDIENTS_ERROR,
          payload: error.message,
        }))()
      );
    }
  };
