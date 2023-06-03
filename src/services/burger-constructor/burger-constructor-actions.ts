import { TIngredient } from '../../utils/types';
import { sendOrder, fetchWithRefresh } from '../../utils/burger-api';
import { TAppDispatch, TAppThunk } from '../storeTypes';
import { TInvoice } from './burger-constructor-reducer';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_MAIN_AND_SAUCE: 'ADD_MAIN_AND_SAUCE' = 'ADD_MAIN_AND_SAUCE';
export const REMOVE_MAIN_AND_SAUCE: 'REMOVE_MAIN_AND_SAUCE' =
  'REMOVE_MAIN_AND_SAUCE';
export const FILL_ORDER: 'FILL_ORDER' = 'FILL_ORDER';
export const SEND_ORDER_REQUEST: 'SEND_ORDER_REQUEST' = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_ERROR: 'SEND_ORDER_ERROR' = 'SEND_ORDER_ERROR';
export const SEND_ORDER_SUCCESS: 'SEND_ORDER_SUCCESS' = 'SEND_ORDER_SUCCESS';
export const REORDER_BURGER_INGREDIENTS: 'REORDER_BURGER_INGREDIENTS' =
  'REORDER_BURGER_INGREDIENTS';

type TAddBun = {
  readonly type: typeof ADD_BUN;
  readonly payload: { id: string; ingredientId: string; price: number };
};

type TAddMainAndSauce = {
  readonly type: typeof ADD_MAIN_AND_SAUCE;
  readonly payload: { id: string; ingredientId: string; price: number };
};

type TRemoveMainAndSauce = {
  readonly type: typeof REMOVE_MAIN_AND_SAUCE;
  readonly payload: string;
};

type TFillOrder = {
  readonly type: typeof FILL_ORDER;
};

type TSendOrederRequest = {
  readonly type: typeof SEND_ORDER_REQUEST;
};

type TSendOrederError = {
  readonly type: typeof SEND_ORDER_ERROR;
  readonly payload: string;
};

type TSendOrederSuccess = {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly payload: TInvoice;
};

type TReorder = {
  readonly type: typeof REORDER_BURGER_INGREDIENTS;
  readonly payload: { dragIndex: number; hoverIndex: number };
};

export type TBurgerActions =
  | TAddBun
  | TAddMainAndSauce
  | TRemoveMainAndSauce
  | TFillOrder
  | TSendOrederRequest
  | TSendOrederError
  | TSendOrederSuccess
  | TReorder;

export const addIngredient = (ingredient: TIngredient) =>
  ingredient.type === 'bun'
    ? ((): TAddBun => ({
        type: ADD_BUN,
        payload: {
          id: crypto.randomUUID(),
          ingredientId: ingredient._id,
          price: ingredient.price,
        },
      }))()
    : ((): TAddMainAndSauce => ({
        type: ADD_MAIN_AND_SAUCE,
        payload: {
          id: crypto.randomUUID(),
          ingredientId: ingredient._id,
          price: ingredient.price,
        },
      }))();

export const removeMainAndSauce = (id: string) =>
  ((): TRemoveMainAndSauce => ({ type: REMOVE_MAIN_AND_SAUCE, payload: id }))();

export const postOrder =
  (): TAppThunk => async (dispatch: TAppDispatch, getState) => {
    dispatch(((): TFillOrder => ({ type: FILL_ORDER }))());
    dispatch(((): TSendOrederRequest => ({ type: SEND_ORDER_REQUEST }))());
    try {
      const order = getState().burger.order;
      const response = await fetchWithRefresh(sendOrder, {
        ingredients: order,
      });
      dispatch(
        ((): TSendOrederSuccess => ({
          type: SEND_ORDER_SUCCESS,
          payload: response,
        }))()
      );
    } catch (error: any) {
      dispatch(
        ((): TSendOrederError => ({
          type: SEND_ORDER_ERROR,
          payload: error.message,
        }))()
      );
    }
  };

export const reorder = (dragIndex: number, hoverIndex: number) =>
  ((): TReorder => ({
    type: REORDER_BURGER_INGREDIENTS,
    payload: { dragIndex, hoverIndex },
  }))();
