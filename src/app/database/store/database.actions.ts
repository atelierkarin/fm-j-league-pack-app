import { Action } from '@ngrx/store';

import { PlayerData, PlayerDataSimple } from "../../data/fmJDatabase/PlayerData.interface";
import { PlayerDataChangelog } from "../../data/fmJDatabase/PlayerDataChangelog.interface";

export const SET_SEASON = '[Database] Set Season';

export const SET_PLAYERS = '[Database] Set Players';
export const FETCH_PLAYERS = '[Database] Fetch Players';

export const BROWSE_PLAYER = '[Database] Browse Player';
export const UPDATE_PLAYER = '[Database] Update Player';
export const DELETE_PLAYER = '[Database] Delete Player';

export const SEARCH_PLAYERS = '[Database] Search Players';
export const SEARCH_PLAYERS_BY_CLUB = '[Database] Search Players By Club';
export const SET_SEARCH_PLAYERS = '[Database] Set Search Players';
export const LOAD_PLAYER = '[Database] Load Player';
export const SET_LOAD_PLAYER = '[Database] Set Load Player';

export const LOAD_LATEST_UPDATE_PLAYERS = '[Database] Load Latest Update Players';
export const SET_LATEST_UPDATE_PLAYERS = '[Database] Set Latest Update Players';

export const LOAD_SUCCESS = '[Database] Load Success';
export const LOAD_FAIL = '[Database] Load Fail';
export const UPDATE_SUCCESS = '[Database] Update Success';
export const UPDATE_FAIL = '[Database] Update Fail';

export const RESET_SEARCH = '[Database] Reset Search';

export class SetSeason implements Action {
  readonly type = SET_SEASON;

  constructor(public payload: number) {}
}

export class SetPlayers implements Action {
  readonly type = SET_PLAYERS;

  constructor(public payload: PlayerData[]) {}
}

export class FetchPlayers implements Action {
  readonly type = FETCH_PLAYERS;
}

export class SearchPlayers implements Action {
  readonly type = SEARCH_PLAYERS;

  constructor(public payload: string) {}
}
export class SearchPlayersByClub implements Action {
  readonly type = SEARCH_PLAYERS_BY_CLUB;

  constructor(public payload: number) {}
}
export class SetSearchPlayers implements Action {
  readonly type = SET_SEARCH_PLAYERS;

  constructor(public payload: PlayerDataSimple[]) {}
}
export class LoadPlayer implements Action {
  readonly type = LOAD_PLAYER;

  constructor(public payload: number) {}
}
export class SetLoadPlayer implements Action {
  readonly type = SET_LOAD_PLAYER;

  constructor(public payload: PlayerData) {}
}

export class BrowsePlayer implements Action {
  readonly type = BROWSE_PLAYER;

  constructor(public payload: number) {}
}
export class UpdatePlayer implements Action {
  readonly type = UPDATE_PLAYER;

  constructor(public payload: {player: PlayerData, id?: number, changeLog?: any}) {}
}
export class DeletePlayer implements Action {
  readonly type = DELETE_PLAYER;

  constructor(public payload: number) {}
}

export class LoadLatestUpdatePlayers implements Action {
  readonly type = LOAD_LATEST_UPDATE_PLAYERS;
}
export class SetLatestUpdatePlayers implements Action {
  readonly type = SET_LATEST_UPDATE_PLAYERS;

  constructor(public payload: {id: string, name: string, dob?: string, updateDate: string, clubId?: number}[]) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
}
export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string) {}
}
export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
}
export class UpdateFail implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: string) {}
}
export class ResetSearch implements Action {
  readonly type = RESET_SEARCH;
}

export type DatabaseActions =
  | SetSeason
  | SetPlayers
  | FetchPlayers
  | BrowsePlayer
  | UpdatePlayer
  | DeletePlayer
  | SearchPlayers
  | SearchPlayersByClub
  | SetSearchPlayers
  | LoadPlayer
  | SetLoadPlayer
  | LoadLatestUpdatePlayers
  | SetLatestUpdatePlayers
  | LoadSuccess
  | LoadFail
  | UpdateSuccess
  | UpdateFail
  | ResetSearch;