import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

import * as CoreActions from './core.actions';

const queryAllClubs = gql`
query {
  clubs {
    id
    clubName
    clubShortname
    clubNationality
    clubColor1
    clubColor2
    createDate
    modifiedDate
  }
}`;

@Injectable()
export class CoreEffects {

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
  loadClubs = this.actions$.pipe(
    ofType(CoreActions.LOAD_CLUBS),
    switchMap((action: CoreActions.LoadClubs) => {
      return this.apollo.query<any>({
        query: queryAllClubs
      });
    }),
    switchMap((result: ApolloQueryResult<any>) => {
      if (result && result.data && result.data.clubs) {
        return [new CoreActions.SetClubs(result.data.clubs), new CoreActions.ApiSuccess()]
      } else {
        throw 'QUERY_EXECUTE_FAILURE';
      }
    }),
    catchError((err, caught) => {
      console.error(err);
      this.store.dispatch(new CoreActions.ApiFail(err));
      return caught;
    })
  )

  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router,
    private apollo: Apollo
  ) {}

}