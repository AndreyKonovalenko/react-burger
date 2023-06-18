import { burgerIngredientsReducer } from './burger-ingredients-reducer';
import * as types from './burger-ingredients-actions';

describe('burger-ingredients-reducer', () => {
  it('should return the initial state', () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual({
      ingredients: [],
      error: '',
      loading: false,
    });
  });
  it('should handle loading', () => {
    expect(
      burgerIngredientsReducer(
        {},
        {
          type: types.GET_INGREDIENTS_REQUEST,
        }
      )
    ).toEqual({
      loading: true,
    });
  });
  it('should handle error', () => {
    expect(
      burgerIngredientsReducer(
        {},
        { type: types.GET_INGREDIENTS_ERROR, payload: 'Something went wrong!' }
      )
    ).toEqual({ loading: false, error: 'Something went wrong!' });
  });

  it('should handle ingredients request', () => {
    expect(
      burgerIngredientsReducer(
        {},
        { type: types.GET_INGREDIENTS_SUCCESS, payload: [{}, {}, {}] }
      )
    ).toEqual({ loading: false, ingredients: [{}, {}, {}], error: '' });
  });
});
