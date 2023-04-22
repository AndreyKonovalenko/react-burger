import {
  ADD_BUN,
  REMOVE_BUN,
  REMOVE_MAIN_AND_SAUCE,
  ADD_MAIN_AND_SAUCE,
  FILL_ORDER,
  SEND_ORDER_REQUEST,
  SEND_ORDER_ERROR,
  SEND_ORDER_SUCCESS,
  REORDER_BURGER_INGREDIENTS,
} from './burger-constructor-actions';

const intialState = {
  bun: null,
  mainAndSauce: [],
  total: 0,
  order: [],
  invoice: null,
  loading: false,
  error: '',
};
export const burgerConstructorReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: {
          id: action.payload.id,
          ingredientId: action.payload.ingredientId,
          price: action.payload.price,
        },
        total:
          state.total -
          (state.bun ? state.bun.price * 2 : 0) +
          action.payload.price * 2,
      };
    case REMOVE_BUN:
      return { ...state, bun: null };
    case ADD_MAIN_AND_SAUCE:
      return {
        ...state,
        mainAndSauce: [
          ...state.mainAndSauce,
          {
            id: action.payload.id,
            ingredientId: action.payload.ingredientId,
            price: action.payload.price,
          },
        ],
        total: state.total + action.payload.price,
      };
    case REMOVE_MAIN_AND_SAUCE:
      return {
        ...state,
        mainAndSauce: state.mainAndSauce.filter(
          (element) => element.id !== action.payload
        ),
        total:
          state.total -
          state.mainAndSauce.find((element) => element.id === action.payload)
            .price,
      };
    case FILL_ORDER:
      return {
        ...state,
        order: (state.bun ? [state.bun.ingredientId] : []).concat(
          state.mainAndSauce.length > 0
            ? state.mainAndSauce.map((element) => element.ingredientId)
            : [],
          state.bun ? [state.bun.ingredientId] : []
        ),
      };
    case SEND_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEND_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        invoice: action.payload,
      };
    case REORDER_BURGER_INGREDIENTS:
      const { dragIndex, hoverIndex } = action.payload;
      const current = state.mainAndSauce.slice();
      current[dragIndex] = current.splice(hoverIndex, 1, current[dragIndex])[0];
      return {
        ...state,
        mainAndSauce: current,
      };
    default:
      return state;
  }
};
