import { Action } from '@ngrx/store';

export const SET_FM_VERSION = '[Core] Set FM Version';

export class SetFMVersion implements Action {
  readonly type = SET_FM_VERSION;

  constructor(public payload: string) {}
}

export type CoreActions =
  | SetFMVersion;