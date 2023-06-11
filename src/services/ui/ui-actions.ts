import { TIngredient } from '../../utils/types';
import { TOrder } from '../ws/ws-reducer';
import { TAppThunk, TAppDispatch } from '../storeTypes';
import { getOrderByOrderNumber } from '../../utils/burger-api';

export const SELECT_INGREDIENT: 'SELECT_INGREDIENT' = 'SELECT_INGREDIENT';
export const UNSELECT_INGREDIENT: 'UNSELECT_INGREDIENT' = 'UNSELECT_INGREDIENT';
export const SHOW_ORDER_DETAILS: 'SHOW_ORDER_DETAILS' = 'SHOW_ORDER_DETAILS';
export const HIDE_ORDER_DETAILS: 'HIDE_ORDER_DETAILS' = 'HIDE_ORDER_DETAILS';
export const SELECT_INGREDIET_COLLECTION: 'SELECT_INGREDIET_COLLECTION' =
  'SELECT_INGREDIET_COLLECTION';
export const SELECT_ORDER: 'SELECT_ORDER' = 'SELECT_ORDER';
export const UNSELECT_ORDER: 'UNSELECT_ORDER' = 'UNSELECT_ORDER';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR: 'GET_ORDER_ERROR' = 'GET_ORDER_ERROR';

type TSelectIngredient = {
  readonly type: typeof SELECT_INGREDIENT;
  readonly payload: TIngredient;
};

type TSelectOrder = {
  readonly type: typeof SELECT_ORDER;
  readonly payload: TOrder;
};

type TUnSelectOrder = {
  readonly type: typeof UNSELECT_ORDER;
};
type TUnSelectIngredient = {
  readonly type: typeof UNSELECT_INGREDIENT;
};

type TShowOrderDetails = {
  readonly type: typeof SHOW_ORDER_DETAILS;
};

type THideOrderDetails = {
  readonly type: typeof HIDE_ORDER_DETAILS;
};

type TSelectIngredientCollection = {
  readonly type: typeof SELECT_INGREDIET_COLLECTION;
  readonly payload: string;
};
type TGetOrderRequest = {
  readonly type: typeof GET_ORDER_REQUEST;
};

type TGetOrderSuccess = {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: TOrder;
};

type TGetOrderError = {
  readonly type: typeof GET_ORDER_ERROR;
  readonly payload: string;
};

export type TUiActions =
  | TSelectIngredient
  | TUnSelectIngredient
  | TShowOrderDetails
  | THideOrderDetails
  | TSelectIngredientCollection
  | TSelectOrder
  | TUnSelectOrder
  | TGetOrderRequest
  | TGetOrderSuccess
  | TGetOrderError;

export const selectIngredient = (
  inredient: TIngredient
): TSelectIngredient => ({
  type: SELECT_INGREDIENT,
  payload: inredient,
});

export const selectOrder = (order: TOrder): TSelectOrder => ({
  type: SELECT_ORDER,
  payload: order,
});

export const unSelectOrder = (): TUnSelectOrder => ({
  type: UNSELECT_ORDER,
});

export const unSelectIngredient = (): TUnSelectIngredient => ({
  type: UNSELECT_INGREDIENT,
});

export const showOrderDetails = (): TShowOrderDetails => ({
  type: SHOW_ORDER_DETAILS,
});

export const hideOrderDetails = (): THideOrderDetails => ({
  type: HIDE_ORDER_DETAILS,
});

export const selectIngredientCollection = (
  collectionName: string
): TSelectIngredientCollection => ({
  type: SELECT_INGREDIET_COLLECTION,
  payload: collectionName,
});

export const loadOrderById =
  (number: string): TAppThunk =>
  async (dispatch: TAppDispatch) => {
    dispatch(((): TGetOrderRequest => ({ type: GET_ORDER_REQUEST }))());
    try {
      const response = await getOrderByOrderNumber(number);
      dispatch(
        ((): TGetOrderSuccess => ({
          type: GET_ORDER_SUCCESS,
          payload: response.orders[0],
        }))()
      );
    } catch (error: any) {
      dispatch(
        ((): TGetOrderError => ({
          type: GET_ORDER_ERROR,
          payload: error.message,
        }))()
      );
    }
  };
