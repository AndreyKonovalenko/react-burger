import { wsReducer } from "./ws-reducer";
import * as types from "./ws-actions";

describe("ws-reducer", () => {
  it("should create initial state", () => {
    expect(wsReducer(undefined, {})).toEqual({
      wsConnected: false,
      message: null,
    });
  });

  it("should handle WebSocket connection", () => {
    expect(
      wsReducer(
        {},
        {
          type: types.WS_CONNECTION_SUCCESS,
        }
      )
    ).toEqual({
      error: undefined,
      wsConnected: true,
    });
    expect(
      wsReducer(
        {},
        {
          type: types.WS_CONNECTION_ERROR,
          payload: "Connection Error",
        }
      )
    ).toEqual({
      error: "Connection Error",
      wsConnected: false,
    });
    expect(
      wsReducer(
        {},
        {
          type: types.WS_CONNECTION_CLOSED,
        }
      )
    ).toEqual({
      error: undefined,
      wsConnected: false,
    });
    expect(
      wsReducer(
        {},
        {
          type: types.WS_GET_MESSAGE,
          payload: {},
        }
      )
    ).toEqual({
      error: undefined,
      message: {},
    });
  });
});
