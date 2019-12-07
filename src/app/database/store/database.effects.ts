import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, take } from 'rxjs/operators';
import { from, of, throwError, Observable } from "rxjs";

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

import { AngularFirestore, QueryFn } from '@angular/fire/firestore';

import { HttpClient } from '@angular/common/http';

import * as DatabaseActions from './database.actions';
import { PlayerData } from "../../data/fmJDatabase/PlayerData.interface";

import * as moment from 'moment';

const getLatestDatabaseUpdate = gql`
query {
  latestDatabaseUpdate {
    id
    name
    dob
  }
}`;

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

      // Check if localStorage have
      if (window.localStorage) {
        const storageDataString = window.localStorage.getItem("club_" + this.tempSearchPlayers.payload);
        if (storageDataString) {
          try {
            const storageData = JSON.parse(storageDataString);
            if (storageData.expire && moment().valueOf() < storageData.expire) {
              return from([[...storageData.data]])
            }
          } catch (err) {}
        }
      }
      window.localStorage.removeItem("club_" + this.tempSearchPlayers.payload);
      return this.searchPlayersByClubFromServer(this.tempSearchPlayers.payload);
    }),
    map((players: {player: PlayerData, id: string}[]) => {
      if (window.localStorage) {
        const storageDataString = window.localStorage.getItem("club_" + this.tempSearchPlayers.payload);
          if (!storageDataString) {
          const expireDate = moment().add(3, 'days').valueOf();
          window.localStorage.setItem("club_" + this.tempSearchPlayers.payload, JSON.stringify({
            data: players,
            expire: expireDate
          }));
        }
      }
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
        return new DatabaseActions.UpdateFail("SERVER FAIL");
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