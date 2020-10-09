import { Action } from '@ngrx/store';

import { ClubData } from '../../shared/database-filetype'

export const SET_FM_VERSION = '[Core] Set FM Version';

export const LOAD_CLUBS = '[Core] Load Clubs';
export const SET_CLUBS = '[Core] Set Clubs';

export const API_SUCCESS = '[Core] API Success';
export const API_FAIL = '[Core] API Fail';

export class SetFMVersion implements Action {
  readonly type = SET_FM_VERSION;

  constructor(public payload: string) {}
}

export class LoadClubs implements Action {
  readonly type = LOAD_CLUBS;
}
export class SetClubs implements Action {
  readonly type = SET_CLUBS;

  constructor(public payload: ClubData[]) {}
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
  | LoadClubs
  | SetClubs
  | ApiSuccess
  | ApiFail;