import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from "./ws-actions";

type TWSState = {
    wsConnected: boolean;
    messages: IMessage[];
    error?: Event;
  }
  
  const initialState = {
    wsConnected: false,
    messages: []
  };
  
  export const wsReducer = (state = initialState, action: TWSActions) => {
    switch (action.type) {

      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
                  error: undefined,
          wsConnected: true
        };
  

      case WS_CONNECTION_ERROR:
        return {
          ...state,
                  error: action.payload,
          wsConnected: false
        };
  

      case WS_CONNECTION_CLOSED:
        return {
          ...state,
            error: undefined,
          wsConnected: false
        };
  

      case WS_GET_MESSAGE:
        return {
          ...state,
                  error: undefined,
          messages: [...state.messages, action.payload]
        };
      default:
        return state;
    }
  }; 