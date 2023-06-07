import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from './ws-actions';

import type { TIngredient } from '../../utils/types';
import type { TWSActions } from './ws-actions';

type TOrder = {
  orders: Array<TIngredient>;
  _id: string;
  status: boolean;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TMessage = {
  success: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

type TWSState = {
  wsConnected: boolean;
  messages: Array<TMessage>;
  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  messages: [],
};

export const wsReducer = (
  state = initialState,
  action: TWSActions
): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};
