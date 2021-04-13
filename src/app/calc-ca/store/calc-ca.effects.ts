import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, take } from 'rxjs/operators';
import { from, of, throwError } from "rxjs";

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

import * as CalcCaActions from './calc-ca.actions'

const queryCalcCa = gql`
query ($pos: String!, $clubPoints: Int!, $matches: Int!, $leagueRep: Int!, $app: Int!, $gls: Int!) {
  queryCa(pos: $pos, clubPoints: $clubPoints, matches: $matches, leagueRep: $leagueRep, app: $app, gls: $gls) {
    ca
  }
}`;

@Injectable()
export class CalcCaEffects {

  @Effect()
  calcCa = this.actions$.pipe(
    ofType(CalcCaActions.CALC_CA),
    switchMap((cc: CalcCaActions.CalcCa) => {
      return this.apollo.watchQuery<any>({
        query: queryCalcCa,
        variables: {
          ...cc.payload
        }
      }).valueChanges;
    }),
    map((result: ApolloQueryResult<any>) => {
      if (result && result.data && result.data["queryCa"] && result.data["queryCa"]["ca"]) {
        return new CalcCaActions.SetCa(result.data["queryCa"]["ca"])
      } else {
        return new CalcCaActions.CalcFail("Failure")
      }
    }),
    catchError(() => {
      return of(new CalcCaActions.CalcFail("Failure"))
    })
  )

  constructor(
    private actions$: Actions,
    private apollo: Apollo
  ) {}
}