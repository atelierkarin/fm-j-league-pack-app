import * as CoreActions from './core.actions';

import { ClubData } from '../../shared/database-filetype'

export interface State {
  fmVersion: string

  clubs: ClubData[]

  loading: boolean
  errorMsg: string
}

const initialState: State = {
  fmVersion: "FM2020",

  clubs: [],

  loading: false,
  errorMsg: null
};

export function coreReducer(
  state = initialState,
  action: CoreActions.CoreActions
) {
  switch (action.type) {
    case CoreActions.SET_FM_VERSION:
      return {
        ...state,
        fmVersion: action.payload
      };
    case CoreActions.LOAD_CLUBS:
      return {
        ...state,
        clubs: [],
        loading: true,
        errorMsg: null
      };
    case CoreActions.SET_CLUBS:
      return {
        ...state,
        clubs: action.payload
      };
    case CoreActions.API_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: null
      };
    case CoreActions.API_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload
      };
    default:
      return state;
  }
}