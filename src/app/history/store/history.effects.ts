import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { from, of } from "rxjs";

import { AngularFirestore } from '@angular/fire/compat/firestore';

import * as HistoryActions from './history.actions';
import { History } from "../history.model";

@Injectable()
export class HistoryEffects {

  private useServer: boolean;

  fetchHistory = createEffect(() =>
    this.actions$.pipe(
      ofType(HistoryActions.FETCH_HISTORY),
      switchMap(() => {
        this.useServer = false;
        return this.db.collection<History>('history')
          .get({ source: "server" })
      }),
      map((docs) => {
        let history = [];
        docs.forEach(doc => {
          history.push(doc.data())
        })
        return new HistoryActions.SetHistory(history.sort((a, b) => {
          const dateA = new Date(a.updateDate);
          const dateB = new Date(b.updateDate);
          return dateB.getTime() - dateA.getTime();
        }));
      }),
      catchError(() => {
        return of(new HistoryActions.UpdateFail("SERVER FAIL"))
      })
    )
  );

  addHitoryHistory = createEffect(() =>
    this.actions$.pipe(
      ofType(HistoryActions.ADD_HISTORY),
      switchMap((addHistoryData: HistoryActions.AddHistory) => {     
        const newHistory = {
          ...addHistoryData.payload
        }
        return from(this.db.collection<History>('history').add(newHistory))
      }),
      map(() => {
        return new HistoryActions.UpdateSuccess()
      }),
      catchError(() => {
        return of(new HistoryActions.UpdateFail("SERVER FAIL"))
      })
    )
  );

  constructor(
    private actions$: Actions,
    private db: AngularFirestore
  ) {}
}