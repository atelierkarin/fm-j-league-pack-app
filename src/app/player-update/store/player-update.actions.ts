import { Action } from '@ngrx/store';

import * as PlayerUpdateModel from '../player-update.model';

export const SET_PLAYER_UPDATE = '[Player Update] Set Player Update';
export const FETCH_PLAYER_UPDATE = '[Player Update] Fetch Player Update';
export const FETCH_PLAYER_UPDATE_NU = '[Player Update] Fetch Player Update Not Updated';
export const ADD_PLAYER_UPDATE = '[Player Update] Add Player Update';
export const CONFIRM_PLAYER_UPDATE = '[Player Update] Confirm Player Update';
export const DELETE_PLAYER_UPDATE = '[Player Update] Delete Player Update';

export const SET_RELOAD_DATA = '[History] Set Reload Data';
export const CLEAR_RELOAD_DATA = '[History] Clear Reload Data';

export const UPDATE_SUCCESS = '[History] Update Success';
export const UPDATE_FAIL = '[History] Update Fail';

export class SetPlayerUpdate implements Action {
  readonly type = SET_PLAYER_UPDATE;

  constructor(public payload: PlayerUpdateModel.PlayerUpdate[]) {}
}

export class FetchPlayerUpdate implements Action {
  readonly type = FETCH_PLAYER_UPDATE;

  constructor(public payload: {
    startDate: string, endDate: string
  }) {}
}

export class FetchPlayerUpdateNU implements Action {
  readonly type = FETCH_PLAYER_UPDATE_NU;
}

export class AddPlayerHistory implements Action {
  readonly type = ADD_PLAYER_UPDATE;

  constructor(public payload: PlayerUpdateModel.PlayerUpdate) {}
}

export class ConfirmPlayerHistory implements Action {
  readonly type = CONFIRM_PLAYER_UPDATE;

  constructor(public payload: PlayerUpdateModel.PlayerUpdate) {}
}

export class DeletePlayerHistory implements Action {
  readonly type = DELETE_PLAYER_UPDATE;

  constructor(public payload: string) {}
}

export class SetReloadData implements Action {
  readonly type = SET_RELOAD_DATA;
}

export class ClearReloadData implements Action {
  readonly type = CLEAR_RELOAD_DATA;
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
  | FetchPlayerUpdateNU
  | AddPlayerHistory
  | ConfirmPlayerHistory
  | UpdateSuccess
  | UpdateFail
  | SetReloadData
  | ClearReloadData;