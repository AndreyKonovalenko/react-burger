import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { burgerConstructorReducer } from './burger-constructor/burger-constructor-reducer';
import { uiReducer } from './ui/ui-reducer';
import { burgerIngredientsReducer } from './burger-ingredients/burger-ingredients-reducer';
import { authReducer } from './auth/auth-reducer';
import { socketMiddleware } from './ws/socket-middleware';
import { wsReducer } from './ws/ws-reducer';
import type { TWSMethodsActions } from './ws/ws-actions';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_DISCONNECT,
} from './ws/ws-actions';

const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  burger: burgerConstructorReducer,
  ui: uiReducer,
  auth: authReducer,
  ws: wsReducer,
});
const wsActions: TWSMethodsActions = {
  wsInit: WS_CONNECTION_START,

  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsDisconnect: WS_DISCONNECT,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions)))
);
