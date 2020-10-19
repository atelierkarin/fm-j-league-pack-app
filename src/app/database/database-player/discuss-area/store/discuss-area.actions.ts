import { Action } from '@ngrx/store';

import { Comment } from "../comment.interface";

export const SET_COMMENTS = '[DiscussArea] Set Comments';
export const FETCH_COMMENTS_BY_PLAYER_ID = '[DiscussArea] Fetch Comments by Player ID';
export const FETCH_COMMENTS_BY_CLUB_ID = '[DiscussArea] Fetch Comments by Club ID';
export const ADD_COMMENT = '[DiscussArea] Add Comment';
export const DELETE_COMMENT = '[DiscussArea] Delete Comment';

export const UPDATE_SUCCESS = '[DiscussArea] Update Success';
export const UPDATE_FAIL = '[DiscussArea] Update Fail';

export class SetComments implements Action {
  readonly type = SET_COMMENTS;

  constructor(public payload: Comment[]) {}
}

export class FetchCommentsByPlayerId implements Action {
  readonly type = FETCH_COMMENTS_BY_PLAYER_ID;

  constructor(public payload: {id: number, admin?: boolean}) {}
}

export class FetchCommentsByClubId implements Action {
  readonly type = FETCH_COMMENTS_BY_CLUB_ID;

  constructor(public payload: {id: number, admin?: boolean}) {}
}

export class AddComment implements Action {
  readonly type = ADD_COMMENT;

  constructor(public payload: Comment) {}
}

export class DeleteComment implements Action {
  readonly type = DELETE_COMMENT;

  constructor(public payload: { id: number, playerId?: number, clubId?: number }) {}
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
}
export class UpdateFail implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: string) {}
}

export type DiscussAreaActions =
  | SetComments
  | FetchCommentsByPlayerId
  | FetchCommentsByClubId
  | AddComment
  | DeleteComment
  | UpdateSuccess
  | UpdateFail;