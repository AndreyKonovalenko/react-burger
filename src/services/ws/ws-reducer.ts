import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from './ws-actions';

import type { TWSActions } from './ws-actions';

export type TOrder = {
  ingredients: Array<string>;
  _id: string;
  status: string;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TMessage = {
  success: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  message?: string;
};

type TWSState = {
  wsConnected: boolean;
  message: TMessage | null;
  error?: string;
};

const initialState: TWSState = {
  wsConnected: false,
  message: null,
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
        message: action.payload,
      };
    default:
      return state;
  }
};
