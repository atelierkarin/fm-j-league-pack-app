import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { from, of, EMPTY } from "rxjs";

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { getPlayersByLatestUpdate, getPlayersByClub, getPlayer, mutationDeletePlayer, mutationBrowsePlayer } from './database-queries';

import { AngularFirestore, QueryFn } from '@angular/fire/firestore';

import * as DatabaseActions from './database.actions';
import { PlayerData } from "../../data/fmJDatabase/PlayerData.interface";

import * as moment from 'moment';

@Injectable()
export class DatabaseEffects {
  
  private collectionReference: QueryFn;

  @Effect()
  fetchPlayers = this.actions$.pipe(
    ofType(DatabaseActions.FETCH_PLAYERS),
    switchMap(() => {
      this.collectionReference = null;      
      return this.db.collection<{player: PlayerData, id: string}>('playerDb')
        .get({ source: "server" })
    }),
    map((docs: firebase.firestore.QuerySnapshot) => {
      let players = [];
      docs.forEach(doc => {
        players.push(doc.data())
      })
      return new DatabaseActions.SetPlayers(players.map(p => p.player));
    }),
    catchError(() => {
      return of(new DatabaseActions.LoadFail("SERVER FAIL"))
    })
  )

  @Effect()
  searchPlayers = this.actions$.pipe(
    ofType(DatabaseActions.SEARCH_PLAYERS),
    switchMap((searchPlayers: DatabaseActions.SearchPlayers) => {
      this.collectionReference = ref => ref.where('player.basicInfo.name', '==', searchPlayers.payload);

      return this.db.collection<{player: PlayerData, id: string}>('playerDb', this.collectionReference)
        .get({ source: "server" })
    }),
    map((docs: firebase.firestore.QuerySnapshot) => {
      let players = [];
      docs.forEach(doc => {
        players.push(doc.data())
      })
      return new DatabaseActions.SetSearchPlayers(players);
    }),
    catchError(() => {
      return of(new DatabaseActions.LoadFail("SERVER FAIL"))
    })
  )

  @Effect()
  searchPlayersByClub = this.actions$.pipe(
    ofType(DatabaseActions.SEARCH_PLAYERS_BY_CLUB),
    switchMap((action: DatabaseActions.SearchPlayersByClub) => {
      return this.apollo.watchQuery<any>({
        query: getPlayersByClub,
        variables: {
          clubId: action.payload
        }
      }).valueChanges;
    }),
    map((result: ApolloQueryResult<any>) => {
      let players = [];
      if (result && result.data && result.data.playersByClub) {
        players = result.data.playersByClub.map(v => v)
      }
      return new DatabaseActions.SetSearchPlayers(players);
    }),
    catchError(() => {
      return of(new DatabaseActions.LoadFail("SERVER FAIL"))
    })
  )

  @Effect()
  loadPlayer = this.actions$.pipe(
    ofType(DatabaseActions.LOAD_PLAYER),
    switchMap((action: DatabaseActions.LoadPlayer) => {
      return this.apollo.watchQuery<any>({
        query: getPlayer,
        variables: {
          id: action.payload
        }
      }).valueChanges;
    }),
    map((result: ApolloQueryResult<any>) => {
      let player = null;
      if (result && result.data && result.data.player) {
        player = result.data.player;
      }
      return new DatabaseActions.SetLoadPlayer(player);
    }),
    catchError(() => {
      return of(new DatabaseActions.LoadFail("SERVER FAIL"))
    })
  )

  @Effect()
  updatePlayer = this.actions$.pipe(
    ofType(DatabaseActions.UPDATE_PLAYER),
    switchMap((updatePlayer: DatabaseActions.UpdatePlayer) => {
      let id = null;
      if (updatePlayer.payload.id) {
        id = updatePlayer.payload.id;
      } else {
        id = this.db.createId();
      }
      const changelog = updatePlayer.payload.changeLog;
      const item = {
        player: updatePlayer.payload.player,
        id: id
      }
      return from((this.db.collection<PlayerData>('playerDb').doc(id).set(item)).then(() => {
        if (changelog) {
          const changelogItem = {
            changelog: JSON.stringify(changelog),
            updateDate: moment().valueOf(),
            id: id
          }
          return this.db.collection<{changelog: string, updateDate: number, id: string}>('playerDbChangelog').add(changelogItem).then(() => Promise.resolve());          
        } else {
          return Promise.resolve();
        }
      }).catch(err => {
        console.error(err);
        throw err
      }));
    }),
    map(() => {
      return new DatabaseActions.UpdateSuccess()
    }),
    catchError(() => {
      return of(new DatabaseActions.UpdateFail("SERVER FAIL"))
    })
  )

  @Effect()
  loadLatestUpdatePlayers = this.actions$.pipe(
    ofType(DatabaseActions.LOAD_LATEST_UPDATE_PLAYERS),
    switchMap(() => {
      return this.apollo.watchQuery<any>({
        query: getPlayersByLatestUpdate
      }).valueChanges;
    }),
    map((result: ApolloQueryResult<any>) => {
      let latestUpdatePlayers = [];
      if (result && result.data && result.data.playersByLatestUpdate) {
        latestUpdatePlayers = result.data.playersByLatestUpdate.map(v => v)
      }
      return new DatabaseActions.SetLatestUpdatePlayers(latestUpdatePlayers);
    }),
    catchError(() => {
      return of(new DatabaseActions.LoadFail("SERVER FAIL"))
    })
  )

  @Effect()
  browsePlayer = this.actions$.pipe(
    ofType(DatabaseActions.BROWSE_PLAYER),
    switchMap((action: DatabaseActions.BrowsePlayer) => {
      return this.apollo.mutate<any>({
        mutation: mutationBrowsePlayer,
        variables: {
          id: action.payload
        },
      });
    }),
    map(() => {
      return EMPTY;
    }),
    catchError(() => {
      return of(new DatabaseActions.LoadFail("SERVER FAIL"))
    })
  )

  @Effect()
  deletePlayer = this.actions$.pipe(
    ofType(DatabaseActions.DELETE_PLAYER),
    switchMap((action: DatabaseActions.DeletePlayer) => {
      return this.apollo.mutate<any>({
        mutation: mutationDeletePlayer,
        variables: {
          id: action.payload
        },
      });
    }),
    map(() => {
      return new DatabaseActions.UpdateSuccess()
    }),
    catchError(() => {
      return of(new DatabaseActions.UpdateFail("SERVER FAIL"))
    })
  )

  constructor(
    private actions$: Actions,
    private db: AngularFirestore,
    private apollo: Apollo
  ) {}
}