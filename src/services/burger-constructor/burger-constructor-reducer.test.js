import { burgerConstructorReducer } from "./burger-constructor-reducer";
import * as types from "./burger-constructor-actions";

describe("burger-constructor-reducer", () => {
  it("should create initial state", () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual({
      bun: null,
      mainAndSauce: [],
      total: 0,
      order: [],
      invoice: null,
      loading: false,
      error: "",
    });
  });

  it("should manipulate with ingredients quantity", () => {
    expect(
      burgerConstructorReducer(
        {
          bun: {
            price: 0,
          },
          total: 0,
        },
        {
          type: types.ADD_BUN,
          payload: {
            id: "adfadf2345",
            ingredientId: "adfadf42345",
            price: 110,
          },
        }
      )
    ).toEqual({
      bun: {
        id: "adfadf2345",
        ingredientId: "adfadf42345",
        price: 110,
      },
      total: 220,
    });
    expect(
      burgerConstructorReducer(
        {
          mainAndSauce: [],
          total: 0,
        },
        {
          type: types.ADD_MAIN_AND_SAUCE,
          payload: {
            id: "adfadf2345",
            ingredientId: "adfadf42345",
            price: 110,
          },
        }
      )
    ).toEqual({
      mainAndSauce: [
        {
          id: "adfadf2345",
          ingredientId: "adfadf42345",
          price: 110,
        },
      ],
      total: 110,
    });
    expect(
      burgerConstructorReducer(
        {
          mainAndSauce: [
            {
              id: "adfadf2345",
              ingredientId: "adfadf42345",
              price: 110,
            },
          ],
          total: 110,
        },
        {
          type: types.REMOVE_MAIN_AND_SAUCE,
          payload: "adfadf2345",
        }
      )
    ).toEqual({
      mainAndSauce: [],
      total: 0,
    });

    expect(
      burgerConstructorReducer(
        {
          mainAndSauce: [
            {
              id: "adfadf2345",
              ingredientId: "1###1",
              price: 60,
            },
          ],
          bun: {
            id: "adfadsgadsd",
            ingredientId: "1###2",
            price: 110,
          },
          order: [],
        },
        {
          type: types.FILL_ORDER,
        }
      )
    ).toEqual({
      mainAndSauce: [
        {
          id: "adfadf2345",
          ingredientId: "1###1",
          price: 60,
        },
      ],
      bun: {
        id: "adfadsgadsd",
        ingredientId: "1###2",
        price: 110,
      },
      order: ["1###2", "1###1", "1###2"],
    });
  });

  it("should handle order request", () => {
    expect(
      burgerConstructorReducer(
        {},
        {
          type: types.SEND_ORDER_REQUEST,
        }
      )
    ).toEqual({
      loading: true,
    });
    expect(
      burgerConstructorReducer(
        {},
        {
          type: types.SEND_ORDER_ERROR,
          payload: "400",
        }
      )
    ).toEqual({
      loading: false,
      error: "400",
      invoice: null,
    });
    expect(
      burgerConstructorReducer(
        {},
        {
          type: types.SEND_ORDER_SUCCESS,
          payload: {
            success: true,
            name: "name",
          },
        }
      )
    ).toEqual({
      loading: false,
      error: "",
      invoice: {
        success: true,
        name: "name",
      },
    });
  });

  it("shoul reaorder ingredient position in array", () => {
    expect(
      burgerConstructorReducer(
        { mainAndSauce: [{ id: "1##1" }, { id: "1##2" }, { id: "1##3" }] },
        {
          type: types.REORDER_BURGER_INGREDIENTS,
          payload: { dragIndex: 0, hoverIndex: 2 },
        }
      )
    ).toEqual({
      mainAndSauce: [{ id: "1##3" }, { id: "1##2" }, { id: "1##1" }],
    });
  });
});
