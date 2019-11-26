import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { History } from './history.model';
import * as fromApp from '../store/app.reducer';
import * as HistoryActions from './store/history.actions';

@Injectable({ providedIn: 'root' })
export class HistoryResolverService implements Resolve<History[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('history').pipe(
      take(1),
      map(historyState => {
        return historyState.history;
      }),
      switchMap(history => {
        if (history.length === 0) {
          this.store.dispatch(new HistoryActions.FetchHistory());
          return this.actions$.pipe(
            ofType(HistoryActions.SET_HISTORY),
            take(1)
          );
        } else {
          return of(history);
        }
      })
    );
  }
}
