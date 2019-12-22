import * as PlayerUpdateActions from './player-update.actions';

import * as PlayerUpdateModel from '../player-update.model';

export interface State {
  playerUpdateRecords: PlayerUpdateModel.PlayerUpdate[];

  updateError: string;
  loading: boolean;
}

const initialState: State = {
  playerUpdateRecords: [],

  updateError: null,
  loading: false
};

export function playerUpdateReducer(
  state = initialState,
  action: PlayerUpdateActions.PlayerUpdateActions
) {
  switch (action.type) {
    case PlayerUpdateActions.SET_PLAYER_UPDATE:
      return {
        ...state,
        playerUpdateRecords: [...action.payload],
        loading: false
      };
    case PlayerUpdateActions.ADD_PLAYER_UPDATE:
      return {
        ...state,
        updateError: null,
        loading: true
      };
    case PlayerUpdateActions.CONFIRM_PLAYER_UPDATE:
      return {
        ...state,
        updateError: null
      };
    case PlayerUpdateActions.FETCH_PLAYER_UPDATE:
      return {
        ...state,
        updateError: null,
        loading: true
      };
    case PlayerUpdateActions.UPDATE_SUCCESS:
      return {
        ...state,
        updateError: null,
        loading: false
      };
    case PlayerUpdateActions.UPDATE_FAIL:
      return {
        ...state,
        updateError: action.payload,
        loading: false
      };
    default:
      return state;
  }
}