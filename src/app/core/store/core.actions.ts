import { Action } from '@ngrx/store';

import { ClubData, LeagueData } from '../../shared/database-filetype'

export const SET_FM_VERSION = '[Core] Set FM Version';

export const SET_LANG = '[Core] Set Lang';

export const LOAD_BASIC_DATA = '[Core] Load Basic Data';
export const SET_CLUBS = '[Core] Set Clubs';
export const SET_LEAGUES = '[Core] Set Leagues';

export const API_SUCCESS = '[Core] API Success';
export const API_FAIL = '[Core] API Fail';

export class SetFMVersion implements Action {
  readonly type = SET_FM_VERSION;

  constructor(public payload: string) {}
}

export class SetLanguage implements Action {
  readonly type = SET_LANG;

  constructor(public payload: string) {}
}

export class LoadBasicData implements Action {
  readonly type = LOAD_BASIC_DATA;
}
export class SetClubs implements Action {
  readonly type = SET_CLUBS;

  constructor(public payload: ClubData[]) {}
}
export class SetLeagues implements Action {
  readonly type = SET_LEAGUES;

  constructor(public payload: LeagueData[]) {}
}

export class ApiSuccess implements Action {
  readonly type = API_SUCCESS;
}
export class ApiFail implements Action {
  readonly type = API_FAIL;

  constructor(public payload: string) {}
}

export type CoreActions =
  | SetFMVersion
  | SetLanguage
  | LoadBasicData
  | SetClubs
  | SetLeagues
  | ApiSuccess
  | ApiFail;