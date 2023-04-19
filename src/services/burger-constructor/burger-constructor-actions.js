import { sendOrder } from '../../utils/burger-api';
export const ADD_BUN = 'ADD_BUN';
export const REMOVE_BUN = 'REMOVE_BUN';
export const ADD_MAIN_AND_SAUCE = 'ADD_MAIN_AND_SAUCE';
export const REMOVE_MAIN_AND_SAUCE = 'REMOVE_MAIN_AND_SAUCE';
export const FILL_ORDER = 'FILL_ORDER';
export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_ERROR = 'SEND_ORDER_ERROR';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';

export const addIngredient = (ingredient) => {
  if (ingredient.type === 'bun') {
    return {
      type: ADD_BUN,
      payload: { ingredientId: ingredient._id, price: ingredient.price },
    };
  }
  if (ingredient.type !== 'bun') {
    return {
      type: ADD_MAIN_AND_SAUCE,
      payload: { ingredientId: ingredient._id, price: ingredient.price },
    };
  }
};

export const removeMainAndSauce = (id) => {
  return { type: REMOVE_MAIN_AND_SAUCE, payload: id };
};

export const fillOrder = () => {
  return { type: FILL_ORDER };
};

export const postOrder = () => async (dispatch, getState) => {
  dispatch(fillOrder());
  dispatch({ type: SEND_ORDER_REQUEST });
  try {
    const order = getState().burger.order;
    const response = await sendOrder({ ingredients: order });
    dispatch({ type: SEND_ORDER_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: SEND_ORDER_ERROR, payload: error.message });
  }
};
