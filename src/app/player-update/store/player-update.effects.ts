import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, take } from 'rxjs/operators';
import { from, of, throwError } from "rxjs";
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { QueryRef } from 'apollo-angular/QueryRef';
import gql from 'graphql-tag';

import { AngularFirestore } from '@angular/fire/firestore';

import * as PlayerUpdateActions from './player-update.actions';

import * as PlayerUpdateModel from '../player-update.model';

const getPlayerUpdatesByDate = gql`
query ($fmVersion: String!, $startDate: String!, $endDate: String!) {
  playerUpdatesByDate(fmVersion: $fmVersion, startDate: $startDate, endDate: $endDate) {
    id
    fmVersion
    player {
      name
      nameEng
      playerType
      nationality
    }
    updateType
    activeDate
    updateDate
    club {
      name
      nationality
    }
    previousClub {
      name
      nationality
    }
    futureTransfer {
      club {
      	name
      	nationality
    	}
      transferDate
    }
    filetype
    previousFiletype
    remarks
  }
}`;

@Injectable()
export class PlayerUpdateEffects {

  private useServer: boolean;
  private payload: string;

  private playerUpdatesByDateQueryRef: QueryRef<any>;

  private formatDate(date: Date, format: string) {
    format = format.replace(/yyyy/g, '' + date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    return format;
  };

  @Effect()
  fetchPlayerUpdate = this.actions$.pipe(
    ofType(PlayerUpdateActions.FETCH_PLAYER_UPDATE),
    switchMap((fetchPlayerUpdate: PlayerUpdateActions.FetchPlayerUpdate) => {
      return this.apollo.watchQuery<any>({
        query: getPlayerUpdatesByDate,
        variables: {
          ...fetchPlayerUpdate.payload
        }
      }).valueChanges;
    }),
    map((result: ApolloQueryResult<any>) => {
      let playerUpdates = [];
      if (result && result.data && result.data.playerUpdatesByDate) {
        playerUpdates = result.data.playerUpdatesByDate.map(v => v)
      }
      return new PlayerUpdateActions.SetPlayerUpdate(playerUpdates);
    }),
    catchError(() => {
      return of(new PlayerUpdateActions.UpdateFail("SERVER FAIL"))
    })

  //     this.useServer = false;
  //     this.payload = fetchPlayerUpdate.payload;
  //     const playerUpdate$ = this.db.collection<PlayerUpdateModel.PlayerUpdate>('playerUpdates', ref => ref.where('fmVersion', '==', this.payload))
  //       .get({ source: "server" })
  //     return playerUpdate$;
  //   }),
  //   map((docs: firebase.firestore.QuerySnapshot) => {
  //     let playerUpdate = [];
  //     docs.forEach(doc => {
  //       playerUpdate.push({
  //         id: doc.id,
  //         ...doc.data()
  //       })
  //     })
  //     return new PlayerUpdateActions.SetPlayerUpdate(playerUpdate);
  //   }),
  //   catchError(err => {
  //     return of(new PlayerUpdateActions.UpdateFail("SERVER FAIL"))
  //   })
  )

  @Effect()
  addPlayerUpdate = this.actions$.pipe(
    ofType(PlayerUpdateActions.ADD_PLAYER_UPDATE),
    switchMap((addPlayerHistory: PlayerUpdateActions.AddPlayerHistory) => {     
      const newData = {
        ...addPlayerHistory.payload
      }
      return from(this.db.collection<PlayerUpdateModel.PlayerUpdate>('playerUpdates').add(newData))
    }),
    map(() => {
      return new PlayerUpdateActions.UpdateSuccess()
    }),
    catchError(() => {
      return of(new PlayerUpdateActions.UpdateFail("SERVER FAIL"))
    })
  )

  @Effect()
  confirmPlayerUpdate = this.actions$.pipe(
    ofType(PlayerUpdateActions.CONFIRM_PLAYER_UPDATE),
    switchMap((confirmPlayerHistory: PlayerUpdateActions.ConfirmPlayerHistory) => {
      const originalRecord = confirmPlayerHistory.payload;
      const id = originalRecord.id;
      const updateRecord = {
        ...originalRecord,
        updateDate: this.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss")
      }
      return from(this.db.collection<PlayerUpdateModel.PlayerUpdate>('playerUpdates').doc(id).set(updateRecord))
    }),
    map(() => {
      return new PlayerUpdateActions.UpdateSuccess()
    }),
    catchError(() => {
      return of(new PlayerUpdateActions.UpdateFail("SERVER FAIL"))
    })
  )

  constructor(
    private actions$: Actions,
    private db: AngularFirestore,
    private router: Router,
    private apollo: Apollo
  ) {}

}