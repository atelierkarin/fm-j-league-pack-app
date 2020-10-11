import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, take, withLatestFrom } from 'rxjs/operators';
import { from, of, throwError } from "rxjs";

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

import * as PlayerUpdateActions from './player-update.actions';

import * as fromApp from '../../store/app.reducer';
import * as fromPlayerUpdate from './player-update.reducer';

const getPlayerUpdatesByDate = gql`
query ($startDate: String!, $endDate: String!) {
  playerUpdatesByDate(startDate: $startDate, endDate: $endDate) {
    id
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
    dbPlayerId
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
    withLatestFrom(this.store$.select('playerUpdate')),
    switchMap(([action, state]: [PlayerUpdateActions.FetchPlayerUpdate, fromPlayerUpdate.State]) => {
      return this.apollo.query<any>({
        query: getPlayerUpdatesByDate,
        variables: {
          ...state.displayDate
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
    withLatestFrom(this.store$.select('playerUpdate')),
    switchMap(([action, state]: [PlayerUpdateActions.AddPlayerHistory, fromPlayerUpdate.State]) => {   
      return this.apollo.mutate<any>({
        mutation: mutationAddPlayerUpdate,
        variables: {
          data: {...action.payload}
        },
        refetchQueries: [
          {
            query: getPlayerUpdatesByDate,
            variables: {
              ...state.displayDate
            }
          },
        ],
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
    withLatestFrom(this.store$.select('playerUpdate')),
    switchMap(([action, state]: [PlayerUpdateActions.ConfirmPlayerHistory, fromPlayerUpdate.State]) => {
      const originalRecord = action.payload;
      const id = parseInt(originalRecord.id);
      return this.apollo.mutate<any>({
        mutation: mutationConfirmPlayerUpdate,
        variables: {
          id
        },
        refetchQueries: [
          {
            query: getPlayerUpdatesByDate,
            variables: {
              ...state.displayDate
            }
          },
        ],
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
    private apollo: Apollo,
    private store$: Store<fromApp.AppState>,
  ) {}

}