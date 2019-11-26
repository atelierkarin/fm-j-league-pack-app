import { History } from "../history.model";

import * as HistoryActions from './history.actions';

export interface State {
  history: History[];

  updateError: string;
  loading: boolean;
}

const initialState: State = {
  history: [],

  updateError: null,
  loading: false
};

export function historyReducer(
  state = initialState,
  action: HistoryActions.HistoryActions
) {
  switch (action.type) {
    case HistoryActions.SET_HISTORY:
      return {
        ...state,
        history: [...action.payload]
      };
    case HistoryActions.ADD_HISTORY:
      return {
        ...state,
        updateError: null,
        loading: true
      };
    case HistoryActions.UPDATE_SUCCESS:
      return {
        ...state,
        updateError: null,
        loading: false
      };
    case HistoryActions.UPDATE_FAIL:
      return {
        ...state,
        updateError: action.payload,
        loading: false
      };
    default:
      return state;
  }
}