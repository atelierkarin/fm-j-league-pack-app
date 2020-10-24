import * as DatabaseActions from './database.actions';

import { PlayerData, PlayerDataSimple } from "../../data/fmJDatabase/PlayerData.interface";
import { PlayerHistory } from '../../shared/database-filetype';

import { currentSeason } from '../../shared/common';

export interface State {
  season: number;

  players: PlayerData[];
  playerHistory: PlayerHistory[];

  playerHistoryNameInfo: {playerId?: number, playerName: string}[];

  searchPlayers: PlayerDataSimple[];
  latestPlayers: {id: string, name: string, dob?: string, updateDate: string, clubId?: number}[];

  editPlayer: PlayerData;

  errMsg: string;
  loading: boolean;
  loadingPlayer: boolean;
  loadingHistory: boolean;

  mostAccessedPlayers: {id: string, name: string, dob?: string, updateDate: string, clubId?: number}[];
  loadingMostAccessedPlayers: boolean;
}

const initialState: State = {
  season: currentSeason,

  players: null,
  playerHistory: null,

  playerHistoryNameInfo: null,

  searchPlayers: null,
  latestPlayers: null,

  editPlayer: null,

  errMsg: null,
  loading: false,
  loadingPlayer: false,
  loadingHistory: false,

  mostAccessedPlayers: null,
  loadingMostAccessedPlayers: false,
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
    case DatabaseActions.BROWSE_PLAYER:
      return state;
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
    case DatabaseActions.LOAD_MOST_ACCESSED_PLAYERS:
      return {
        ...state,
        loadingMostAccessedPlayers: true,
      };
    case DatabaseActions.SET_MOST_ACCESSED_PLAYERS:
      return {
        ...state,
        mostAccessedPlayers: [...action.payload],
        loadingMostAccessedPlayers: false,
      };
    case DatabaseActions.LOAD_PLAYER_HISTORY:
      return {
        ...state,
        playerHistory: null,
        loadingHistory: true
      };
    case DatabaseActions.SET_PLAYER_HISTORY:
      return {
        ...state,
        playerHistory: [...action.payload],
        loadingHistory: false
      };
    case DatabaseActions.LOAD_PLAYER_HISTORY_NAME:
      return {
        ...state,
        playerHistoryNameInfo: null,
        loading: true
      };
    case DatabaseActions.SET_PLAYER_HISTORY_NAME:
      return {
        ...state,
        playerHistoryNameInfo: [...action.payload],
        loading: false
      };
    case DatabaseActions.UPDATE_PLAYER_HISTORY_NAME:
      return {
        ...state,
        loading: true
      };
    case DatabaseActions.LOAD_SUCCESS:
      return {
        ...state,
        errMsg: null,
        loading: false
      };
    case DatabaseActions.LOAD_FAIL:
      return {
        ...state,
        errMsg: action.payload,
        loading: false,
        loadingMostAccessedPlayers: false,
        loadingHistory: false
      };
    case DatabaseActions.UPDATE_SUCCESS:
      return {
        ...state,
        editPlayer: null,
        errMsg: null,
        loading: false
      };
    case DatabaseActions.UPDATE_FAIL:
      return {
        ...state,
        errMsg: action.payload,
        loading: false
      };
    case DatabaseActions.RESET:
      return {
        ...state,
        searchPlayers: null,
        editPlayer: null,
        errMsg: null,
        loading: false,
        loadingPlayer: false,
      };
    default:
      return state;
  }
}