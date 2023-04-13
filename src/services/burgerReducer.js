import uniqid from "uniqid";
import * as actionTypes from "./actionTypes";
const buregerReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_BUN:
      return {
        ...state,
        bun: {
          id: uniqid(),
          ingredientId: action.payload.ingredientId,
          price: action.payload.price,
        },
      };
    case actionTypes.REMOVE_BUN:
      return { ...state, bun: null };
    case actionTypes.ADD_MAIN_AND_SAUCE:
      return {
        ...state,
        mainAndSauce: [
          ...state.mainAndSauce,
          {
            id: uniqid(),
            ingredientId: action.payload.ingredientId,
            price: action.payload.price,
          },
        ],
      };
    case actionTypes.REMOVE_MAIN_AND_SAUCE:
      return {
        ...state,
        mainAndSauce: state.mainAndSauce.filter(
          (element) => element.id !== action.payload
        ),
      };
    case actionTypes.CALCULATE_TOTAL:
      return {
        ...state,
        total:
          (state.mainAndSauce.length > 0
            ? state.mainAndSauce.reduce(
                (acc, current) => acc + current.price,
                0
              )
            : 0) + (state.bun ? state.bun.price * 2 : 0),
      };
    case actionTypes.FILL_ORDER:
      return {
        ...state,
        order: (state.mainAndSauce.length > 0
          ? state.mainAndSauce.map((element) => element.ingredientId)
          : []
        ).concat(state.bun ? state.bun.ingredientId : []),
      };

    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};

export default buregerReducer;
