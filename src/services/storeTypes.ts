import { useDispatch as untypedUseDispatch } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from './store';
import { TAuthActions } from './auth/auth-actions';
import { TBurgerActions } from './burger-constructor/burger-constructor-actions';

type TActions = TAuthActions | TBurgerActions;
export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = ThunkDispatch<TRootState, never, TActions>;

export const typedUseDispatch = () => untypedUseDispatch<TAppDispatch>();
export type TAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TRootState,
  never,
  TActions
>;
