import type { Middleware, MiddlewareAPI } from 'redux';
import type { TWSMethodsActions } from './ws-actions';
import type { TAppDispatch, TRootState, TActions } from '../storeTypes';
import type { TMessage } from './ws-reducer';

export const socketMiddleware = (wsActions: TWSMethodsActions): Middleware => {
  return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;
    let url = '';
    return (next) => (action: TActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsDisconnect } =
        wsActions;

      if (type === wsInit) {
        url = action.payload;
        socket = new WebSocket(url);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: TMessage = JSON.parse(data);
          dispatch({
            type: onMessage,
            payload: parsedData,
          });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
          console.log('The connection has been closed successfully.');
        };

        if (type === wsDisconnect) {
          socket.close();
        }
      }

      next(action);
    };
  }) as Middleware;
};
