import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, take, withLatestFrom } from 'rxjs/operators';
import { from, of, throwError } from "rxjs";

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

import * as PlayerUpdateActions from './player-update.actions';

import * as fromApp from '../../store/app.reducer';
import * as fromPlayerUpdate from './player-update.reducer';

const getPlayerUpdatesNotUpdated = gql`
query {
  playerUpdatesNotUpdated {
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

const mutationDeletePlayerUpdate = gql`
mutation($id: Int!) {
  deletePlayerUpdate(id: $id)
}
`

const mutationAddPlayerUpdate = gql`
mutation($data: PlayerUpdateInput!) {
  insertPlayerUpdate(data: $data)
}
`

@Injectable()
export class PlayerUpdateEffects {

  fetchPlayerUpdateNU = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerUpdateActions.FETCH_PLAYER_UPDATE_NU),
      withLatestFrom(this.store$.select('playerUpdate')),
      switchMap(([action, state]: [PlayerUpdateActions.FetchPlayerUpdateNU, fromPlayerUpdate.State]) => {
        return this.apollo.query<any>({
          query: getPlayerUpdatesNotUpdated
        });
      }),
      map((result: ApolloQueryResult<any>) => {
        let playerUpdates = [];
        if (result && result.data && result.data.playerUpdatesNotUpdated) {
          playerUpdates = result.data.playerUpdatesNotUpdated.map(v => v)
        }
        return new PlayerUpdateActions.SetPlayerUpdate(playerUpdates);
      }),
      catchError((error) => {
        console.error(error)
        return of(new PlayerUpdateActions.UpdateFail("SERVER FAIL"))
      })
    )
  );

  fetchPlayerUpdate = createEffect(() =>
    this.actions$.pipe(
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
  );

  addPlayerUpdate = createEffect(() =>
    this.actions$.pipe(
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
  )

  confirmPlayerUpdate = createEffect(() =>
    this.actions$.pipe(
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
              query: getPlayerUpdatesNotUpdated
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
  );

  deletePlayerUpdate = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerUpdateActions.DELETE_PLAYER_UPDATE),
      withLatestFrom(this.store$.select('playerUpdate')),
      switchMap(([action, state]: [PlayerUpdateActions.DeletePlayerHistory, fromPlayerUpdate.State]) => {
        const id = parseInt(action.payload);
        return this.apollo.mutate<any>({
          mutation: mutationDeletePlayerUpdate,
          variables: {
            id
          },
          update: async (cache, result) => {
            await cache.reset();
          },
        });
      }),
      switchMap(() => {
        return of(new PlayerUpdateActions.SetReloadData())
      }),
      catchError(() => {
        return of(new PlayerUpdateActions.UpdateFail("SERVER FAIL"))
      })
    )
  );

  constructor(
    private actions$: Actions,
    private apollo: Apollo,
    private store$: Store<fromApp.AppState>,
  ) {}

}