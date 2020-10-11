import * as DatabaseActions from './database.actions';

import { PlayerData, PlayerDataSimple } from "../../data/fmJDatabase/PlayerData.interface";

import { currentSeason } from '../../shared/common';

export interface State {
  season: number;

  players: PlayerData[];

  searchPlayers: PlayerDataSimple[];
  latestPlayers: {id: string, name: string, dob?: string, updateDate: string, clubId?: number}[];

  editPlayer: PlayerData;

  errMsg: string;
  loading: boolean;
  loadingPlayer: boolean;
}

const initialState: State = {
  season: currentSeason,

  players: null,

  searchPlayers: null,
  latestPlayers: null,

  editPlayer: null,

  errMsg: null,
  loading: false,
  loadingPlayer: false,
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
        loadingPlayer: true,
      };
    case DatabaseActions.SET_LOAD_PLAYER:
      return {
        ...state,
        editPlayer: {...action.payload},
        loading: false,
        loadingPlayer: false,
      };
    case DatabaseActions.UPDATE_PLAYER:
      return {
        ...state,
        loading: true,
      };
    case DatabaseActions.DELETE_PLAYER:
      return {
        ...state,
        loading: true,
      };
    case DatabaseActions.LOAD_LATEST_UPDATE_PLAYERS:
      return {
        ...state,
        loading: true,
      };
    case DatabaseActions.SET_LATEST_UPDATE_PLAYERS:
      return {
        ...state,
        latestPlayers: [...action.payload],
        loading: false,
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
        loading: false,
        loadingPlayer: false,
      };
    default:
      return state;
  }
}