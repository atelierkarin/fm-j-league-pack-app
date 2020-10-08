import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, take } from 'rxjs/operators';
import { from, of, throwError } from "rxjs";
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

import { AngularFirestore } from '@angular/fire/firestore';

import * as PlayerUpdateActions from './player-update.actions';

import * as PlayerUpdateModel from '../player-update.model';

const getPlayerUpdatesByDate = gql`
query ($startDate: String!, $endDate: String!) {
  playerUpdatesByDate(startDate: $startDate, endDate: $endDate) {
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

const mutationConfirmPlayerUpdate = gql`
mutation($id: Int!) {
  setPlayerUpdatesUpdateDate(id: $id)
}
`

const mutationAddPlayerUpdate = gql`
mutation($data: PlayerUpdateInput!) {
  insertPlayerUpdate(data: $data)
}
`

@Injectable()
export class PlayerUpdateEffects {

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
      return this.apollo.query<any>({
        query: getPlayerUpdatesByDate,
        variables: {
          ...fetchPlayerUpdate.payload
        }
      });
    }),
    map((result: ApolloQueryResult<any>) => {
      let playerUpdates = [];
      if (result && result.data && result.data.playerUpdatesByDate) {
        playerUpdates = result.data.playerUpdatesByDate.map(v => v)
      }
      return new PlayerUpdateActions.SetPlayerUpdate(playerUpdates);
    }),
    catchError((error) => {
      console.error(error)
      return of(new PlayerUpdateActions.UpdateFail("SERVER FAIL"))
    })
  )

  @Effect()
  addPlayerUpdate = this.actions$.pipe(
    ofType(PlayerUpdateActions.ADD_PLAYER_UPDATE),
    switchMap((addPlayerHistory: PlayerUpdateActions.AddPlayerHistory) => {   
      return this.apollo.mutate<any>({
        mutation: mutationAddPlayerUpdate,
        variables: {
          data: {...addPlayerHistory.payload}
        }
      });
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
      const id = parseInt(originalRecord.id);
      return this.apollo.mutate<any>({
        mutation: mutationConfirmPlayerUpdate,
        variables: {
          id
        }
      });
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