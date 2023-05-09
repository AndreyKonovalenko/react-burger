import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { burgerConstructorReducer } from './burger-constructor/burger-constructor-reducer';
import { uiReducer } from './ui/ui-reducer';
import { burgerIngreintsReducer } from './burger-ingredients/burger-ingredients-reducer';
import { authReducer } from './auth/auth-reducer';

const rootReducer = combineReducers({
  ingredients: burgerIngreintsReducer,
  burger: burgerConstructorReducer,
  ui: uiReducer,
  auth: authReducer,
});

export const initStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};
