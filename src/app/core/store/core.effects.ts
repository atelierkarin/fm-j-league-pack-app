import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

import * as CoreActions from './core.actions';

import { currentSeason } from '../../shared/common';

const queryAllClubs = gql`
query queryAllClubs {
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

const queryLeagues = gql`
query queryLeagues($season: Int!) {
  leaguesBySeason(season: $season) {
    id,
    leagueName,
    leagueCaGuideline,
    seasons {
      season,
      teams
    }
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
  loadBasicData = this.actions$.pipe(
    ofType(CoreActions.LOAD_BASIC_DATA),
    switchMap((action: CoreActions.LoadBasicData) => {
      return this.apollo.query<any>({
        query: queryAllClubs
      });
    }),
    switchMap((result: ApolloQueryResult<any>) => {
      if (result && result.data && result.data.clubs) {
        this.store.dispatch(new CoreActions.SetClubs(result.data.clubs));
        return this.apollo.query<any>({
          query: queryLeagues,
          variables: {
            season: currentSeason
          }
        });
      } else {
        throw 'QUERY_EXECUTE_FAILURE';
      }
    }),
    switchMap((result: ApolloQueryResult<any>) => {
      if (result && result.data && result.data.leaguesBySeason) {
        return [new CoreActions.SetLeagues(result.data.leaguesBySeason), new CoreActions.ApiSuccess()]
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