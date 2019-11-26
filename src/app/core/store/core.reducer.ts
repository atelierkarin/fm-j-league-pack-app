import * as CoreActions from './core.actions';

export interface State {
  fmVersion: string
}

const initialState: State = {
  fmVersion: "FM2020"
};

export function coreReducer(
  state = initialState,
  action: CoreActions.CoreActions
) {
  switch (action.type) {
    case CoreActions.SET_FM_VERSION:
      return {
        ...state,
        fmVersion: action.payload
      };
    default:
      return state;
  }
}