import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";

import { Apollo } from "apollo-angular";
import { ApolloQueryResult } from "apollo-client";
import {
  getPlayersByLatestUpdate,
  getPlayersByMostAccessed,
  getPlayersByClub,
  getPlayer,
  mutationDeletePlayer,
  mutationBrowsePlayer,
  mutationUpdatePlayer,
  getPlayerHistory,
  getPlayerHistoryNameByInfo,
  updatePlayerIdByPlayerInfo,
} from "./database-queries";

import * as DatabaseActions from "./database.actions";

@Injectable()
export class DatabaseEffects {
  @Effect()
  searchPlayersByClub = this.actions$.pipe(
    ofType(DatabaseActions.SEARCH_PLAYERS_BY_CLUB),
    switchMap((action: DatabaseActions.SearchPlayersByClub) => {
      return this.apollo.watchQuery<any>({
        query: getPlayersByClub,
        variables: {
          clubId: action.payload,
        },
      }).valueChanges;
    }),
    map((result: ApolloQueryResult<any>) => {
      let players = [];
      if (result && result.data && result.data.playersByClub) {
        players = result.data.playersByClub.map((v) => v);
      }
      return new DatabaseActions.SetSearchPlayers(players);
    }),
    catchError((err, caught) => {
      console.error(err);
      this.store.dispatch(new DatabaseActions.LoadFail("SERVER FAIL"));
      return caught;
    })
  );

  @Effect()
  loadPlayer = this.actions$.pipe(
    ofType(DatabaseActions.LOAD_PLAYER),
    switchMap((action: DatabaseActions.LoadPlayer) => {
      return this.apollo.watchQuery<any>({
        query: getPlayer,
        variables: {
          id: action.payload,
        },
      }).valueChanges;
    }),
    map((result: ApolloQueryResult<any>) => {
      let player = null;
      if (result && result.data && result.data.player) {
        player = result.data.player;
        return new DatabaseActions.SetLoadPlayer(player);
      } else {
        return new DatabaseActions.LoadFail("PLAYER NOT FOUND");
      }
    }),
    catchError((err, caught) => {
      console.error(err);
      this.store.dispatch(new DatabaseActions.LoadFail("SERVER FAIL"));
      return caught;
    })
  );

  @Effect()
  updatePlayer = this.actions$.pipe(
    ofType(DatabaseActions.UPDATE_PLAYER),
    switchMap((action: DatabaseActions.UpdatePlayer) => {
      return this.apollo.mutate<any>({
        mutation: mutationUpdatePlayer,
        variables: {
          player: action.payload,
        },
      });
    }),
    map(() => {
      return new DatabaseActions.UpdateSuccess();
    }),
    catchError((err, caught) => {
      console.error(err);
      this.store.dispatch(new DatabaseActions.UpdateFail("SERVER FAIL"));
      return caught;
    })
  );

  @Effect()
  loadLatestUpdatePlayers = this.actions$.pipe(
    ofType(DatabaseActions.LOAD_LATEST_UPDATE_PLAYERS),
    switchMap(() => {
      return this.apollo.watchQuery<any>({
        query: getPlayersByLatestUpdate,
      }).valueChanges;
    }),
    map((result: ApolloQueryResult<any>) => {
      let latestUpdatePlayers = [];
      if (result && result.data && result.data.playersByLatestUpdate) {
        latestUpdatePlayers = result.data.playersByLatestUpdate.map((v) => v);
      }
      return new DatabaseActions.SetLatestUpdatePlayers(latestUpdatePlayers);
    }),
    catchError((err, caught) => {
      console.error(err);
      this.store.dispatch(new DatabaseActions.LoadFail("SERVER FAIL"));
      return caught;
    })
  );

  @Effect()
  loadLatestMostAccessed = this.actions$.pipe(
    ofType(DatabaseActions.LOAD_MOST_ACCESSED_PLAYERS),
    switchMap(() => {
      return this.apollo.watchQuery<any>({
        query: getPlayersByMostAccessed,
      }).valueChanges;
    }),
    map((result: ApolloQueryResult<any>) => {
      let playersByMostAccessed = [];
      if (result && result.data && result.data.playersByMostAccessed) {
        playersByMostAccessed = result.data.playersByMostAccessed.map((v) => v);
      }
      console.log(playersByMostAccessed)
      return new DatabaseActions.SetMostAccessedPlayers(playersByMostAccessed);
    }),
    catchError((err, caught) => {
      console.error(err);
      this.store.dispatch(new DatabaseActions.LoadFail("SERVER FAIL"));
      return caught;
    })
  );

  @Effect()
  browsePlayer = this.actions$.pipe(
    ofType(DatabaseActions.BROWSE_PLAYER),
    switchMap((action: DatabaseActions.BrowsePlayer) => {
      return this.apollo.mutate<any>({
        mutation: mutationBrowsePlayer,
        variables: {
          id: action.payload,
        },
      });
    }),
    map(() => {
      return new DatabaseActions.LoadSuccess();
    }),
    catchError((err, caught) => {
      console.error(err);
      this.store.dispatch(new DatabaseActions.LoadFail("SERVER FAIL"));
      return caught;
    })
  );

  @Effect()
  deletePlayer = this.actions$.pipe(
    ofType(DatabaseActions.DELETE_PLAYER),
    switchMap((action: DatabaseActions.DeletePlayer) => {
      return this.apollo.mutate<any>({
        mutation: mutationDeletePlayer,
        variables: {
          id: action.payload,
        },
      });
    }),
    map(() => {
      return new DatabaseActions.UpdateSuccess();
    }),
    catchError((err, caught) => {
      console.error(err);
      this.store.dispatch(new DatabaseActions.UpdateFail("SERVER FAIL"));
      return caught;
    })
  );

  @Effect()
  loadPlayerHistory = this.actions$.pipe(
    ofType(DatabaseActions.LOAD_PLAYER_HISTORY),
    switchMap((action: DatabaseActions.LoadPlayerHistory) => {
      return this.apollo.watchQuery<any>({
        query: getPlayerHistory,
        variables: {
          id: action.payload,
        },
      }).valueChanges;
    }),
    map((result: ApolloQueryResult<any>) => {
      let playerHistory = [];
      if (result && result.data && result.data.playerHistory) {
        playerHistory = result.data.playerHistory.map((v) => v);
      }
      return new DatabaseActions.SetPlayerHistory(playerHistory);
    }),
    catchError((err, caught) => {
      console.error(err);
      this.store.dispatch(new DatabaseActions.LoadFail("SERVER FAIL"));
      return caught;
    })
  );

  @Effect()
  loadPlayerHistoryNameByInfo = this.actions$.pipe(
    ofType(DatabaseActions.LOAD_PLAYER_HISTORY_NAME),
    switchMap((action: DatabaseActions.LoadPlayerHistoryName) => {
      return this.apollo.watchQuery<any>({
        query: getPlayerHistoryNameByInfo,
        variables: {
          ...action.payload,
        },
      }).valueChanges;
    }),
    map((result: ApolloQueryResult<any>) => {
      let list = [];
      if (result && result.data && result.data.getPlayerHistoryNameByInfo) {
        list = result.data.getPlayerHistoryNameByInfo.map((v) => v);
      }
      return new DatabaseActions.SetPlayerHistoryName(list);
    }),
    catchError((err, caught) => {
      console.error(err);
      this.store.dispatch(new DatabaseActions.LoadFail("SERVER FAIL"));
      return caught;
    })
  );

  @Effect()
  updatePlayerIdByPlayerInfo = this.actions$.pipe(
    ofType(DatabaseActions.UPDATE_PLAYER_HISTORY_NAME),
    switchMap((action: DatabaseActions.UpdatePlayerHistoryName) => {
      return this.apollo.mutate<any>({
        mutation: updatePlayerIdByPlayerInfo,
        variables: {
          data: {
            ...action.payload
          }
        },
        refetchQueries: [
          {
            query: getPlayerHistoryNameByInfo,
            variables: {
              season: action.payload.season,
              clubId: action.payload.clubId,
              leagueId: action.payload.leagueId
            }
          }
        ]
      });
    }),
    map(() => {
      return new DatabaseActions.UpdateSuccess();
    }),
    catchError((err, caught) => {
      console.error(err);
      this.store.dispatch(new DatabaseActions.UpdateFail("SERVER FAIL"));
      return caught;
    })
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private apollo: Apollo
  ) {}
}
