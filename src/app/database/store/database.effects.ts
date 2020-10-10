import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { from, of } from "rxjs";

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { getLatestDatabaseUpdate, getPlayerByClub, getPlayer } from './database-queries';

import { AngularFirestore, QueryFn } from '@angular/fire/firestore';

import { HttpClient } from '@angular/common/http';

import * as DatabaseActions from './database.actions';
import { PlayerData } from "../../data/fmJDatabase/PlayerData.interface";

import * as moment from 'moment';

@Injectable()
export class DatabaseEffects {

  private tempPlayers: {player: PlayerData, id: string}[];
  private tempSearchPlayers: DatabaseActions.SearchPlayersByClub

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
      return of(new DatabaseActions.UpdateFail("SERVER FAIL"))
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
      return of(new DatabaseActions.UpdateFail("SERVER FAIL"))
    })
  )

  @Effect()
  searchPlayersByClub = this.actions$.pipe(
    ofType(DatabaseActions.SEARCH_PLAYERS_BY_CLUB),
    switchMap((searchPlayers: DatabaseActions.SearchPlayersByClub) => {
      this.tempPlayers = [];
      this.tempSearchPlayers = searchPlayers;
      return this.searchPlayersByClubFromServer(this.tempSearchPlayers.payload);
    }),
    map((players: {player: PlayerData, id: string}[]) => {
      return new DatabaseActions.SetSearchPlayers(players);
    }),
    catchError(() => {
      return of(new DatabaseActions.UpdateFail("SERVER FAIL"))
    })
  )

  @Effect()
  loadPlayer = this.actions$.pipe(
    ofType(DatabaseActions.LOAD_PLAYER),
    switchMap((loadPlayer: DatabaseActions.LoadPlayer) => {
      this.collectionReference = null;
      if (loadPlayer.payload.id) {
        this.collectionReference = ref => ref.where('id', '==', loadPlayer.payload.id).limit(1);
      } else if (loadPlayer.payload.name && loadPlayer.payload.dob) {
        this.collectionReference = ref => ref
          .where('player.basicInfo.name', '==', loadPlayer.payload.name)
          .where('player.basicInfo.dob', '==', loadPlayer.payload.dob).limit(1);
      } else if (loadPlayer.payload.name) {
        this.collectionReference = ref => ref
          .where('player.basicInfo.name', '==', loadPlayer.payload.name).limit(1);
      } else {
        throw "NOT ENOUGH INFORMATION"
      }
      return this.db.collection<{player: PlayerData, id: string}>('playerDb', this.collectionReference)
        .get({ source: "server" })
    }),
    map((docs: firebase.firestore.QuerySnapshot) => {
      let players = [];
      docs.forEach(doc => {
        players.push(doc.data())
      })
      if (players.length > 0)
        return new DatabaseActions.SetLoadPlayer(players[0]);
      else
        return new DatabaseActions.SetLoadPlayer(null);
    }),
    
    catchError(() => {
      return of(new DatabaseActions.UpdateFail("SERVER FAIL"))
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
        query: getLatestDatabaseUpdate
      }).valueChanges;
    }),
    map((result: ApolloQueryResult<any>) => {
      let latestUpdatePlayers = [];
      if (result && result.data && result.data.latestDatabaseUpdate) {
        latestUpdatePlayers = result.data.latestDatabaseUpdate.map(v => v)
      }
      return new DatabaseActions.SetLatestUpdatePlayers(latestUpdatePlayers);
    }),
    catchError(() => {
      return of(new DatabaseActions.UpdateFail("SERVER FAIL"))
    })
  )

  searchPlayersByClubFromServer(clubId: number) {
    let players = [];
    const basicCollectionReference = ref => ref.where('player.clubInfo.id', '==', clubId);
    const loanCollectionReference = ref => ref.where('player.loanInfo.id', '==', clubId);

    const basicQuery = this.db.collection<{player: PlayerData, id: string}>('playerDb', basicCollectionReference)
      .get({ source: "server" })
    const loanQuery = this.db.collection<{player: PlayerData, id: string}>('playerDb', loanCollectionReference)
      .get({ source: "server" })

    return basicQuery.pipe(
      switchMap((docs: firebase.firestore.QuerySnapshot) => {
        docs.forEach(doc => {
          players.push(doc.data())
        })
        return loanQuery
      }),
      map((docs: firebase.firestore.QuerySnapshot) => {
        docs.forEach(doc => {
          players.push(doc.data())
        })
        return players
      })
    )
  }

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private db: AngularFirestore,
    private apollo: Apollo
  ) {}
}