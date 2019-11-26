import { Action } from '@ngrx/store';

import { History } from "../history.model";

export const SET_HISTORY = '[History] Set History';
export const FETCH_HISTORY = '[History] Fetch History';
export const ADD_HISTORY = '[History] Add History';

export const UPDATE_SUCCESS = '[History] Update Success';
export const UPDATE_FAIL = '[History] Update Fail';

export class SetHistory implements Action {
  readonly type = SET_HISTORY;

  constructor(public payload: History[]) {}
}

export class FetchHistory implements Action {
  readonly type = FETCH_HISTORY;
}

export class AddHistory implements Action {
  readonly type = ADD_HISTORY;

  constructor(public payload: History) {}
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
}
export class UpdateFail implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: string) {}
}

export type HistoryActions =
  | SetHistory
  | FetchHistory
  | AddHistory
  | UpdateSuccess
  | UpdateFail;