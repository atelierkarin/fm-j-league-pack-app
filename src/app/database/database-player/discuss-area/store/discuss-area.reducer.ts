import * as DiscussAreaActions from './discuss-area.actions';

import { Comment } from "../comment.interface";

export interface State {
  
  comments: Comment[];
  latestComments: Comment[];

  errMsg: string;
  loading: boolean;
}

const initialState: State = {
  comments: null,
  latestComments: null,

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
    case DiscussAreaActions.SET_MORE_COMMENTS:
      return {
        ...state,
        comments: state.comments ? [
          ...state.comments,
          ...action.payload,
        ] : [...action.payload],
        loading: false,
      };
    case DiscussAreaActions.SET_LATEST_COMMENTS:
      return {
        ...state,
        latestComments: [...action.payload],
        loading: false,
      };
    case DiscussAreaActions.FETCH_COMMENTS_BY_PLAYER_ID:
      return !(action.payload.startIndex > 0) ? {
        ...state,
        comments: null,
        loading: true,
      } : {
        ...state,
        loading: true,
      };
    case DiscussAreaActions.FETCH_COMMENTS_BY_CLUB_ID:
      return !(action.payload.startIndex > 0) ? {
        ...state,
        comments: null,
        loading: true,
      } : {
        ...state,
        loading: true,
      };
    case DiscussAreaActions.FETCH_LATEST_COMMENTS:
      return {
        ...state,
        loading: true,
      };
    case DiscussAreaActions.UPDATE_SUCCESS:
      return {
        ...state,
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