import { TIngredient } from '../../utils/types';

export const SELECT_INGREDIENT: 'SELECT_INGREDIENT' = 'SELECT_INGREDIENT';
export const UNSELECT_INGREDIENT: 'UNSELECT_INGREDIENT' = 'UNSELECT_INGREDIENT';
export const SHOW_ORDER_DETAILS: 'SHOW_ORDER_DETAILS' = 'SHOW_ORDER_DETAILS';
export const HIDE_ORDER_DETAILS: 'HIDE_ORDER_DETAILS' = 'HIDE_ORDER_DETAILS';
export const SELECT_INGREDIET_COLLECTION: 'SELECT_INGREDIET_COLLECTION' =
  'SELECT_INGREDIET_COLLECTION';

type TSelectIngredient = {
  readonly type: typeof SELECT_INGREDIENT;
  readonly payload: TIngredient;
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

export type TUiActions =
  | TSelectIngredient
  | TUnSelectIngredient
  | TShowOrderDetails
  | THideOrderDetails
  | TSelectIngredientCollection;

export const selectIngredient = (
  inredient: TIngredient
): TSelectIngredient => ({
  type: SELECT_INGREDIENT,
  payload: inredient,
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
