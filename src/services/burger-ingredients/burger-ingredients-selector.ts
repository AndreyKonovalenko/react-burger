import { TRootState } from '../storeTypes';
export const getIngredientsState = (state: TRootState) => state.ingredients;
export const getIngredientsList = (state: TRootState) =>
  state.ingredients.ingredients;
