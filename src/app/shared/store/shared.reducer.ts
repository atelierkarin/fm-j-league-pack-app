import * as SharedActions from './shared.actions';

export interface State {
  toastContent: string;
  toastStyle: string;
}

const initialState: State = {
  toastContent: null,
  toastStyle: null
};

export function sharedReducer(
  state = initialState,
  action: SharedActions.SharedActions
) {
  switch (action.type) {
    case SharedActions.SET_TOAST_CONTENT:
      return {
        ...state,
        toastContent: action.payload.content,
        toastStyle: action.payload.style
      };
    case SharedActions.CLEAR_TOAST_CONTENT:
      return {
        ...state,
        toastContent: null,
        toastStyle: null
      };
    default:
      return state;
  }
}