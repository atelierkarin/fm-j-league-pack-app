import * as ChangelogActions from './changelog.actions';

import { PlayerDataChangelog } from "../../../../data/fmJDatabase/PlayerDataChangelog.interface";

export interface State {
  playerId: string;
  changelog: PlayerDataChangelog[];

  errMsg: string;
  loading: boolean;
}

const initialState: State = {
  playerId: null,
  changelog: null,

  errMsg: null,
  loading: false,
};

export function changelogReducer(
  state = initialState,
  action: ChangelogActions.ChangelogActions
) {
  switch (action.type) {
    case ChangelogActions.LOAD_PLAYER_CHANGELOG:
      return {
        ...state,
        playerId: action.payload,
        changelog: null,
        loading: true,
      };
    case ChangelogActions.SET_PLAYER_CHANGELOG:
      return {
        ...state,
        changelog: [...action.payload],
        loading: false,
      };
    case ChangelogActions.LOAD_FAIL:
      return {
        ...state,
        playerId: null,
        changelog: null,
        errMsg: action.payload,
        loading: false
      };
    case ChangelogActions.RESET_SEARCH:
      return {
        ...state,
        playerId: null,
        changelog: null,
        errMsg: null,
        loading: false
      };
    default:
      return state;
  }
}