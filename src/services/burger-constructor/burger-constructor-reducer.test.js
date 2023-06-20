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
});
