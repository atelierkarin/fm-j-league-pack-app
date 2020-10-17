import { Action } from '@ngrx/store';

export const SET_TOAST_CONTENT = '[Shared] Set Toast Content';
export const CLEAR_TOAST_CONTENT = '[Shared] Clear Toast Content';

export class SetToastContent implements Action {
  readonly type = SET_TOAST_CONTENT;

  constructor(public payload: { content: string, style?: string }) {}
}

export class ClearToastContent implements Action {
  readonly type = CLEAR_TOAST_CONTENT;
}

export type SharedActions =
  | SetToastContent
  | ClearToastContent;