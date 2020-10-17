import { Action } from '@ngrx/store';

import { PlayerData, PlayerDataSimple } from "../../data/fmJDatabase/PlayerData.interface";

export const SET_SEASON = '[Database] Set Season';

export const SET_PLAYERS = '[Database] Set Players';

export const BROWSE_PLAYER = '[Database] Browse Player';
export const UPDATE_PLAYER = '[Database] Update Player';
export const DELETE_PLAYER = '[Database] Delete Player';

export const SEARCH_PLAYERS_BY_CLUB = '[Database] Search Players By Club';
export const SET_SEARCH_PLAYERS = '[Database] Set Search Players';
export const LOAD_PLAYER = '[Database] Load Player';
export const SET_LOAD_PLAYER = '[Database] Set Load Player';

export const LOAD_LATEST_UPDATE_PLAYERS = '[Database] Load Latest Update Players';
export const SET_LATEST_UPDATE_PLAYERS = '[Database] Set Latest Update Players';

export const LOAD_MOST_ACCESSED_PLAYERS = '[Database] Load Most Accessed Players';
export const SET_MOST_ACCESSED_PLAYERS = '[Database] Set Most Accessed Players';

export const LOAD_SUCCESS = '[Database] Load Success';
export const LOAD_FAIL = '[Database] Load Fail';
export const UPDATE_SUCCESS = '[Database] Update Success';
export const UPDATE_FAIL = '[Database] Update Fail';

export const RESET = '[Database] Reset';

export class SetSeason implements Action {
  readonly type = SET_SEASON;

  constructor(public payload: number) {}
}

export class SetPlayers implements Action {
  readonly type = SET_PLAYERS;

  constructor(public payload: PlayerData[]) {}
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

  constructor(public payload: PlayerData) {}
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

  constructor(public payload: {id: string, name: string, dob?: string, nationality?: string, ca?: number, pa?: number, updateDate: string, clubId?: number}[]) {}
}

export class LoadMostAccessedPlayers implements Action {
  readonly type = LOAD_MOST_ACCESSED_PLAYERS;
}
export class SetMostAccessedPlayers implements Action {
  readonly type = SET_MOST_ACCESSED_PLAYERS;

  constructor(public payload: {id: string, name: string, dob?: string, nationality?: string, ca?: number, pa?: number, updateDate: string, clubId?: number}[]) {}
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
export class Reset implements Action {
  readonly type = RESET;
}

export type DatabaseActions =
  | SetSeason
  | SetPlayers
  | BrowsePlayer
  | UpdatePlayer
  | DeletePlayer
  | SearchPlayersByClub
  | SetSearchPlayers
  | LoadPlayer
  | SetLoadPlayer
  | LoadLatestUpdatePlayers
  | SetLatestUpdatePlayers
  | LoadMostAccessedPlayers
  | SetMostAccessedPlayers
  | LoadSuccess
  | LoadFail
  | UpdateSuccess
  | UpdateFail
  | Reset;