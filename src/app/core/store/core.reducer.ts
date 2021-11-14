import * as CoreActions from './core.actions';

import { ClubData, LeagueData } from '../../shared/database-filetype'

export interface State {
  fmVersion: string

  clubs: ClubData[]
  leagues: LeagueData[]

  loading: boolean
  errorMsg: string
}

const initialState: State = {
  fmVersion: "FM2022",

  clubs: [],
  leagues: [],

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
    case CoreActions.LOAD_BASIC_DATA:
      return {
        ...state,
        clubs: [],
        leagues: [],
        loading: true,
        errorMsg: null
      };
    case CoreActions.SET_CLUBS:
      return {
        ...state,
        clubs: action.payload
      };
    case CoreActions.SET_LEAGUES:
      return {
        ...state,
        leagues: action.payload
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