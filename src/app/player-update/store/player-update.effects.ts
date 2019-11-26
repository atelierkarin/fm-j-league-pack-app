import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, take } from 'rxjs/operators';
import { from, of, throwError } from "rxjs";

import { AngularFirestore } from '@angular/fire/firestore';

import * as PlayerUpdateActions from './player-update.actions';

import * as PlayerUpdateModel from '../player-update.model';

@Injectable()
export class PlayerUpdateEffects {

  private useServer: boolean;
  private payload: string;

  @Effect()
  fetchPlayerUpdate = this.actions$.pipe(
    ofType(PlayerUpdateActions.FETCH_PLAYER_UPDATE),
    switchMap((fetchPlayerUpdate: PlayerUpdateActions.FetchPlayerUpdate) => {
      this.useServer = false;
      this.payload = fetchPlayerUpdate.payload;
      const playerUpdate$ = this.db.collection<PlayerUpdateModel.PlayerUpdate>('playerUpdates', ref => ref.where('fmVersion', '==', this.payload))
        .get({ source: "server" })
      return playerUpdate$;
    }),
    map((docs: firebase.firestore.QuerySnapshot) => {
      let playerUpdate = [];
      docs.forEach(doc => {
        playerUpdate.push(doc.data())
      })
      return new PlayerUpdateActions.SetPlayerUpdate(playerUpdate);
    }),
    catchError(err => {
      return of(new PlayerUpdateActions.UpdateFail("SERVER FAIL"))
    })
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

  // @Effect()
  // confirmPlayerUpdate = this.actions$.pipe(
  //   ofType(PlayerUpdateActions.CONFIRM_PLAYER_UPDATE),
  //   switchMap((confirmPlayerHistory: PlayerUpdateActions.ConfirmPlayerHistory) => {     
  //     const updateRecord = confirmPlayerHistory.payload;
  //     updateRecord.
  //     return from(this.db.collection<PlayerUpdateModel.PlayerUpdate>('playerUpdates').add(newData))
  //   }),
  //   map(() => {
  //     return new PlayerUpdateActions.UpdateSuccess()
  //   }),
  //   catchError(() => {
  //     return of(new PlayerUpdateActions.UpdateFail("SERVER FAIL"))
  //   })
  // )

  constructor(
    private actions$: Actions,
    private db: AngularFirestore
  ) {}

}