import { Action } from '@ngrx/store';

export const CALC_CA = '[Calc CA] Calc CA';
export const SET_CA = '[Calc CA] Set CA';
export const CALC_SUCCESS = '[Calc CA] Calc Success';
export const CALC_FAIL = '[Calc CA] Calc Fail';

export class CalcCa implements Action {
  readonly type = CALC_CA;

  constructor(public payload: {
    pos: string, clubPoints: number, matches: number, leagueRep: number, app: number, gls: number
  }) {}
}

export class SetCa implements Action {
  readonly type = SET_CA;

  constructor(public payload: number) {}
}

export class CalcSuccess implements Action {
  readonly type = CALC_SUCCESS;
}
export class CalcFail implements Action {
  readonly type = CALC_FAIL;

  constructor(public payload: string) {}
}

export type CalcCaActions =
  | CalcCa
  | SetCa
  | CalcSuccess
  | CalcFail;