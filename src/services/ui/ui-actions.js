export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const UNSELECT_INGREDIENT = 'UNSELECT_INGREDIENT';
export const SHOW_ORDER_DETAILS = 'SHOW_ORDER_DETAILS';
export const HIDE_ORDER_DETAILS = 'HIDE_ORDER_DETAILS';

export const selectIngredient = (inredient) => {
  return {
    type: SELECT_INGREDIENT,
    payload: inredient,
  };
};
export const unSelectIngredient = () => {
  return {
    type: UNSELECT_INGREDIENT,
  };
};

export const showOrderDetails = () => {
  return {
    type: SHOW_ORDER_DETAILS,
  };
};
export const hideOrderDetails = () => {
  return {
    type: HIDE_ORDER_DETAILS,
  };
};
