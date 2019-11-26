import * as DatabaseActions from './database.actions';

import { PlayerData } from "../../data/fmJDatabase/PlayerData.interface";

import * as moment from 'moment';

export interface State {
  season: number;

  players: PlayerData[];

  searchPlayers: {player: PlayerData, id: string}[];

  editPlayer: {player: PlayerData, id: string};

  errMsg: string;
  loading: boolean;
}

const initialState: State = {
  season: moment().year(),

  players: null,

  searchPlayers: null,

  editPlayer: null,

  errMsg: null,
  loading: false,
};

export function databaseReducer(
  state = initialState,
  action: DatabaseActions.DatabaseActions
) {
  switch (action.type) {
    case DatabaseActions.SET_SEASON:
      return {
        ...state,
        season: action.payload
      };
    case DatabaseActions.SET_PLAYERS:
      return {
        ...state,
        players: [...action.payload],
        loading: false,
      };
    case DatabaseActions.FETCH_PLAYERS:
      return {
        ...state,
        loading: true,
      };

    case DatabaseActions.SEARCH_PLAYERS:
      return {
        ...state,
        searchPlayers: null,
        loading: true,
      };
    case DatabaseActions.SEARCH_PLAYERS_BY_CLUB:
      return {
        ...state,
        searchPlayers: null,
        loading: true,
      };
    case DatabaseActions.SET_SEARCH_PLAYERS:
      return {
        ...state,
        searchPlayers: [...action.payload],
        loading: false,
      };
    case DatabaseActions.LOAD_PLAYER:
      return {
        ...state,
        editPlayer: null,
        loading: true,
      };
    case DatabaseActions.SET_LOAD_PLAYER:
      return {
        ...state,
        editPlayer: {...action.payload},
        loading: false,
      };

    case DatabaseActions.UPDATE_PLAYER:
      return {
        ...state,
        loading: true,
      };    

    case DatabaseActions.UPDATE_SUCCESS:
      return {
        ...state,
        editPlayer: null,
        updateError: null,
        loading: false
      };
    case DatabaseActions.UPDATE_FAIL:
      return {
        ...state,
        updateError: action.payload,
        loading: false
      };
    case DatabaseActions.RESET_SEARCH:
      return {
        ...state,
        searchPlayers: null,
        editPlayer: null,
        updateError: null,
        loading: false
      };
    default:
      return state;
  }
}