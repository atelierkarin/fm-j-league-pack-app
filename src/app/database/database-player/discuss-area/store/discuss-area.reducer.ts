import * as DiscussAreaActions from './discuss-area.actions';

import { Comment } from "../comment.interface";

export interface State {
  
  comments: Comment[];

  errMsg: string;
  loading: boolean;
}

const initialState: State = {
  comments: null,

  errMsg: null,
  loading: false,
};

export function discussAreaReducer(
  state = initialState,
  action: DiscussAreaActions.DiscussAreaActions
) {
  switch (action.type) {
    case DiscussAreaActions.SET_COMMENTS:
      return {
        ...state,
        comments: [...action.payload],
        loading: false,
      };
    case DiscussAreaActions.FETCH_COMMENTS:
      return {
        ...state,
        searchPlayers: null,
        loading: true,
      };
    case DiscussAreaActions.UPDATE_SUCCESS:
      return {
        ...state,
        editPlayer: null,
        updateError: null,
        loading: false
      };
    case DiscussAreaActions.UPDATE_FAIL:
      return {
        ...state,
        updateError: action.payload,
        loading: false
      };
    default:
      return state;
  }
}