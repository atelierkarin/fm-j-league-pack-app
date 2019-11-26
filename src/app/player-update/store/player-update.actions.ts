import { Action } from '@ngrx/store';

import * as PlayerUpdateModel from '../player-update.model';

export const SET_PLAYER_UPDATE = '[Player Update] Set Player Update';
export const FETCH_PLAYER_UPDATE = '[Player Update] Fetch Player Update';
export const ADD_PLAYER_UPDATE = '[Player Update] Add Player Update';
export const CONFIRM_PLAYER_UPDATE = '[Player Update] Confirm Player Update';

export const UPDATE_SUCCESS = '[History] Update Success';
export const UPDATE_FAIL = '[History] Update Fail';

export class SetPlayerUpdate implements Action {
  readonly type = SET_PLAYER_UPDATE;

  constructor(public payload: PlayerUpdateModel.PlayerUpdate[]) {}
}

export class FetchPlayerUpdate implements Action {
  readonly type = FETCH_PLAYER_UPDATE;

  constructor(public payload: string) {}
}

export class AddPlayerHistory implements Action {
  readonly type = ADD_PLAYER_UPDATE;

  constructor(public payload: PlayerUpdateModel.PlayerUpdate) {}
}

export class ConfirmPlayerHistory implements Action {
  readonly type = CONFIRM_PLAYER_UPDATE;

  constructor(public payload: PlayerUpdateModel.PlayerUpdate) {}
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
}
export class UpdateFail implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: string) {}
}

export type PlayerUpdateActions =
  | SetPlayerUpdate
  | FetchPlayerUpdate
  | AddPlayerHistory
  | ConfirmPlayerHistory
  | UpdateSuccess
  | UpdateFail;