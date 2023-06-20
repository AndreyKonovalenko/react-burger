import { authReducer } from "./auth-reducer";
import * as types from "./auth-actions";
import { USER_DATA_UPDATED_SUCCESSFULLY } from "../../utils/ui-constants";

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

  it("should clear specific state", () => {
    expect(
      authReducer(
        {
          form: {
            name: "name",
            email: "email",
            password: "adsfasdf3",
            token: "adsfasdf432",
          },
        },
        {
          type: types.CLEAR_FORM,
        }
      )
    ).toEqual({
      form: { name: "", email: "", password: "", token: "" },
    });

    expect(
      authReducer(
        {
          message: "some text",
        },
        {
          type: types.CLEAR_MESSAGE,
        }
      )
    ).toEqual({
      message: "",
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
    expect(authReducer({}, { type: types.LOGOUT_REQUEST })).toEqual({
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
      authReducer({}, { type: types.LOGOUT_ERROR, payload: "404" })
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
          },
        }
      )
    ).toEqual({
      loading: false,
      error: "",
      user: {
        name: "name",
        email: "email",
      },
    });
    expect(
      authReducer(
        {},
        {
          type: types.LOGIN_SUCCESS,
          payload: {
            name: "name",
            email: "email",
          },
        }
      )
    ).toEqual({
      loading: false,
      error: "",
      user: {
        name: "name",
        email: "email",
      },
    });
    expect(
      authReducer(
        {},
        {
          type: types.RECOVERY_SUCCESS,
          payload: "Reset email sent",
        }
      )
    ).toEqual({
      loading: false,
      error: "",
      message: "Reset email sent",
    });

    expect(
      authReducer(
        {},
        {
          type: types.RESET_PASS_SUCCESS,
          payload: "your password have been reset",
        }
      )
    ).toEqual({
      message: "your password have been reset",
      loading: false,
      error: "",
    });

    expect(
      authReducer(
        {},
        {
          type: types.REFRESH_ACCESS_SUCCESS,
        }
      )
    ).toEqual({
      loading: false,
      error: "",
    });
    expect(
      authReducer(
        {},
        {
          type: types.LOGOUT_SUCCESS,
          payload: "Successful logout",
        }
      )
    ).toEqual({
      loading: false,
      error: "",
      message: "Successful logout",
    });
    expect(
      authReducer(
        {},
        {
          type: types.GET_USER_SUCCESS,
          payload: {
            name: "name",
            email: "email",
          },
        }
      )
    ).toEqual({
      loading: false,
      error: "",
      user: {
        name: "name",
        email: "email",
      },
    });
    expect(
      authReducer(
        {},
        {
          type: types.UPDATE_USER_SUCCESS,
          payload: {
            name: "name",
            email: "email",
          },
        }
      )
    ).toEqual({
      loading: false,
      error: "",
      message: USER_DATA_UPDATED_SUCCESSFULLY,
      user: {
        name: "name",
        email: "email",
      },
    });
  });
});
