import { authReducer } from "./auth-reducer";
import * as types from "./auth-actions";

describe("auth-reducer", () => {
  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual({
      user: null,
      loading: false,
      error: "",
      message: "",
      form: {
        name: "",
        email: "",
        password: "",
        token: "",
      },
    });
  });
  it("should reset state to initial value", () => {
    expect(
      authReducer(
        {
          user: {},
          loading: true,
          error: "",
          message: "test message",
          form: {
            name: "",
            email: "",
            password: "",
            token: "1435143512",
          },
        },
        {
          type: types.CLEAR_STATE,
        }
      )
    ).toEqual({
      user: null,
      loading: false,
      error: "",
      message: "",
      form: {
        name: "",
        email: "",
        password: "",
        token: "",
      },
    });
  });

  it("should update from state", () => {
    expect(
      authReducer(
        {},
        {
          type: types.SET_FORM_VALUE,
          payload: { field: "mail", value: "test@test.ru" },
        }
      )
    ).toEqual({
      form: { mail: "test@test.ru" },
    });
  });

  it("should set loading to true", () => {
    expect(authReducer({}, { type: types.REGISTER_REQUEST })).toEqual({
      loading: true,
    });
    expect(authReducer({}, { type: types.LOGIN_REQUEST })).toEqual({
      loading: true,
    });
    expect(authReducer({}, { type: types.RECOVERY_REQUEST })).toEqual({
      loading: true,
    });
    expect(authReducer({}, { type: types.RESET_PASS_REQUEST })).toEqual({
      loading: true,
    });
    expect(authReducer({}, { type: types.REFRESH_ACCESS_REQUEST })).toEqual({
      loading: true,
    });
    expect(authReducer({}, { type: types.LOGIN_REQUEST })).toEqual({
      loading: true,
    });
    expect(authReducer({}, { type: types.GET_USER_REQUEST })).toEqual({
      loading: true,
    });
    expect(authReducer({}, { type: types.UPDATE_USER_REQUEST })).toEqual({
      loading: true,
    });
  });

  it("should set error state as string", () => {
    expect(
      authReducer({}, { type: types.REGISTER_ERROR, payload: "404" })
    ).toEqual({ loading: false, error: "404" });
    expect(
      authReducer({}, { type: types.LOGIN_ERROR, payload: "404" })
    ).toEqual({ loading: false, error: "404" });
    expect(
      authReducer({}, { type: types.RECOVERY_ERROR, payload: "404" })
    ).toEqual({ loading: false, error: "404" });
    expect(
      authReducer({}, { type: types.RESET_PASS_ERROR, payload: "404" })
    ).toEqual({ loading: false, error: "404" });
    expect(
      authReducer({}, { type: types.REFRESH_ACCESS_ERROR, payload: "404" })
    ).toEqual({ loading: false, error: "404" });
    expect(
      authReducer({}, { type: types.LOGIN_ERROR, payload: "404" })
    ).toEqual({ loading: false, error: "404" });
    expect(
      authReducer({}, { type: types.GET_USER_ERROR, payload: "404" })
    ).toEqual({ loading: false, error: "404" });
    expect(
      authReducer({}, { type: types.UPDATE_USER_ERROR, payload: "404" })
    ).toEqual({ loading: false, error: "404" });
  });

  it("should update state with data from success requeset", () => {
    expect(
      authReducer(
        {},
        {
          type: types.REGISTER_SUCCESS,
          payload: {
            name: "name",
            email: "email",
            accessToken: "454135145dfadsf",
            refreshTeken: " adsfdasf342545",
          },
        }
      )
    ).toEqual({
      loading: false,
      error: "",
      user: {
        name: "name",
        email: "email",
        accessToken: "454135145dfadsf",
        refreshTeken: " adsfdasf342545",
      },
    });
  });
});
