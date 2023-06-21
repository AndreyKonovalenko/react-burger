import { uiReducer } from "./ui-reducer";
import * as types from "./ui-actions";
import { BUN } from "../../utils/ui-constants";
describe("ui-reducer", () => {
  it("should create initial state", () => {
    expect(uiReducer(undefined, {})).toEqual({
      ingredient: null,
      order: null,
      orderIsShown: false,
      dragging: false,
      collection: BUN,
      loading: false,
      error: "",
    });
  });

  it("should handle ui actions", () => {
    expect(
      uiReducer(
        {},
        {
          type: types.SELECT_INGREDIENT,
          payload: { _id: "325243#" },
        }
      )
    ).toEqual({
      ingredient: { _id: "325243#" },
    });
    expect(
      uiReducer(
        {},
        {
          type: types.UNSELECT_INGREDIENT,
        }
      )
    ).toEqual({
      ingredient: null,
    });
    expect(
      uiReducer(
        {},
        {
          type: types.SELECT_ORDER,
          payload: { _id: "32524asdf3#" },
        }
      )
    ).toEqual({
      order: { _id: "32524asdf3#" },
    });
    expect(
      uiReducer(
        {},
        {
          type: types.UNSELECT_ORDER,
        }
      )
    ).toEqual({
      order: null,
    });
    expect(
      uiReducer(
        {},
        {
          type: types.SHOW_ORDER_DETAILS,
        }
      )
    ).toEqual({
      orderIsShown: true,
    });
    expect(
      uiReducer(
        {},
        {
          type: types.HIDE_ORDER_DETAILS,
        }
      )
    ).toEqual({
      orderIsShown: false,
    });
    expect(
      uiReducer(
        {},
        {
          type: types.SELECT_INGREDIET_COLLECTION,
          payload: BUN,
        }
      )
    ).toEqual({
      collection: BUN,
    });
  });

  it("should handle get order request", () => {
    expect(
      uiReducer(
        {},
        {
          type: types.GET_ORDER_REQUEST,
        }
      )
    ).toEqual({
      loading: true,
    });
    expect(
      uiReducer(
        {},
        {
          type: types.GET_ORDER_ERROR,
          payload: "400",
        }
      )
    ).toEqual({
      loading: false,
      error: "400",
    });
    expect(
      uiReducer(
        {},
        {
          type: types.GET_ORDER_SUCCESS,
          payload: {
            _id: "24352435asdfa",
            ingredients: [],
          },
        }
      )
    ).toEqual({
      loading: false,
      error: "",
      order: {
        _id: "24352435asdfa",
        ingredients: [],
      },
    });
  });
});
