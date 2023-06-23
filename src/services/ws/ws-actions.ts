import { WS_NORMA_API_URL } from '../../utils/burger-api';
import { TMessage } from './ws-reducer';
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' =
  'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' =
  'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';

export const WS_DISCONNECT: 'WS_DISCONNECT' = 'WS_DISCONNECT';

export type TWSConnectionStart = {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
};

export type TWSConnectionSuccessAction = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
};

export type TWSConnectionErrorAction = {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
};

export type TWSConnectionClosedAction = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};

export type TWSGetMessageAction = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TMessage;
};

export type TWSDisconnect = {
  readonly type: typeof WS_DISCONNECT;
};
export type TWSActions =
  | TWSConnectionStart
  | TWSConnectionSuccessAction
  | TWSConnectionErrorAction
  | TWSConnectionClosedAction
  | TWSGetMessageAction
  | TWSDisconnect;

export type TWSMethodsActions = {
  wsInit: typeof WS_CONNECTION_START;

  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
  wsDisconnect: typeof WS_DISCONNECT;
};

export const conntectToAll = (): TWSConnectionStart => ({
  type: WS_CONNECTION_START,
  payload: `${WS_NORMA_API_URL}/all`,
});

export const conntectToAUser = (token: string): TWSConnectionStart => ({
  type: WS_CONNECTION_START,
  payload: `${WS_NORMA_API_URL}?token=${token}`,
});

export const disconnect = (): TWSDisconnect => ({
  type: WS_DISCONNECT,
});
