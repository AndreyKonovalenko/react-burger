import { getIngerdients } from "../../utils/burger-api";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export const loadIngerdients = () => async (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  try {
    const response = await getIngerdients();
    dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_INGREDIENTS_ERROR, payload: error.message });
  }
};
