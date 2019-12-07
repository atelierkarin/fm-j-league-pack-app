import { Action } from "@ngrx/store";

import { PlayerDataChangelog } from "../../../../data/fmJDatabase/PlayerDataChangelog.interface";

export const LOAD_PLAYER_CHANGELOG = "[Changelog] Load Player Changelog";
export const SET_PLAYER_CHANGELOG = "[Changelog] Set Player Changelog";

export const LOAD_FAIL = "[Changelog] Load Fail";
export const RESET_SEARCH = "[Changelog] Reset Search";

export class LoadPlayerChangelog implements Action {
  readonly type = LOAD_PLAYER_CHANGELOG;

  constructor(public payload: string) {}
}
export class SetPlayerChangelog implements Action {
  readonly type = SET_PLAYER_CHANGELOG;

  constructor(public payload: PlayerDataChangelog[]) {}
}
export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string) {}
}
export class ResetSearch implements Action {
  readonly type = RESET_SEARCH;
}

export type ChangelogActions = LoadPlayerChangelog | SetPlayerChangelog | LoadFail | ResetSearch;
