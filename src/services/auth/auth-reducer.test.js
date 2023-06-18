import { authReducer } from './auth-reducer';

describe('auth-reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      user: null,
      loading: false,
      error: '',
      message: '',
      form: {
        name: '',
        email: '',
        password: '',
        token: '',
      },
    });
  });

  // it('should handle loading', () => {
  //   expect(
  //     burgerIngredientsReducer(
  //       {},
  //       {
  //         type: types.GET_INGREDIENTS_REQUEST,
  //       }
  //     )
  //   ).toEqual({
  //     loading: true,
  //   });
  // });
});
