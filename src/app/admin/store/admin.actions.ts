import { Action } from '@ngrx/store';

export const LOGIN_START = '[Admin] LOGIN_START';
export const AUTH_SUCCESS = '[Admin] AUTH_SUCCESS';
export const AUTH_FAIL = '[Admin] AUTH_FAIL';
export const CLEAR_ERROR = '[Admin] CLEAR_ERROR';
export const LOGOUT = '[Admin] LOGOUT';

export const AUTO_LOGIN = '[Admin] AUTO_LOGIN';

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: string = null) {}
}

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(
    public payload: {
      email: string,
      displayName: string,
      uuid: string,
      token: string,
      expirationDate: Date,
      isAdmin: boolean
    }
  ) {}
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AdminActions =
  | AuthSuccess
  | Logout
  | LoginStart
  | AuthFail
  | ClearError
  | AutoLogin;