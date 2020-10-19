import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { messagesByPlayerId, messagesByLatestUpdate, mutationInsertMessage, mutationDeleteMessage, messagesByClubId, messagesByPlayerIdAdmin } from './discuss-area-queries';

import * as DiscussAreaActions from './discuss-area.actions';

@Injectable()
export class DiscussAreaEffects {

  @Effect()
  fetchComments = this.actions$.pipe(
    ofType(DiscussAreaActions.FETCH_COMMENTS_BY_PLAYER_ID),
    switchMap((action: DiscussAreaActions.FetchCommentsByPlayerId) => {
      const isAdmin = action.payload.admin ? action.payload.admin : false;
      return this.apollo.watchQuery<any>({
        query: isAdmin ? messagesByPlayerIdAdmin : messagesByPlayerId,
        variables: {
          id: action.payload.id
        }
      }).valueChanges;
    }),
    map((result: ApolloQueryResult<any>) => {
      let comments = [];
      if (result && result.data && result.data.messagesByPlayerId) {
        comments = result.data.messagesByPlayerId.map(v => v)
      }
      return new DiscussAreaActions.SetComments(comments);
    }),
    catchError((err, caught) => {
      console.error(err);
      this.store.dispatch(new DiscussAreaActions.UpdateFail("SERVER FAIL"));
      return caught;
    })
  )

  @Effect()
  addComment = this.actions$.pipe(
    ofType(DiscussAreaActions.ADD_COMMENT),
    switchMap((action: DiscussAreaActions.AddComment) => {
      const insertPlayer = action.payload.playerId ? true : false;
      return this.apollo.mutate<any>({
        mutation: mutationInsertMessage,
        variables: {
          message: action.payload
        },
        refetchQueries: [
          {
            query: insertPlayer ? messagesByPlayerId : messagesByClubId,
            variables: {
              id: insertPlayer ? action.payload.playerId : action.payload.clubId
            }
          },
        ],
      });
    }),
    map(() => {
      return new DiscussAreaActions.UpdateSuccess()
    }),
    catchError((err, caught) => {
      console.error(err);
      this.store.dispatch(new DiscussAreaActions.UpdateFail("SERVER FAIL"));
      return caught;
    })
  )

  @Effect()
  deleteComment = this.actions$.pipe(
    ofType(DiscussAreaActions.DELETE_COMMENT),
    switchMap((action: DiscussAreaActions.DeleteComment) => {
      const deletePlayer = action.payload.playerId ? true : false;
      return this.apollo.mutate<any>({
        mutation: mutationDeleteMessage,
        variables: {
          id: action.payload.id
        },
        refetchQueries: [
          {
            query: deletePlayer ? messagesByPlayerId : messagesByClubId,
            variables: {
              id: deletePlayer ? action.payload.playerId : action.payload.clubId
            }
          },
        ],
      });
    }),
    map(() => {
      return new DiscussAreaActions.UpdateSuccess()
    }),
    catchError((err, caught) => {
      console.error(err);
      this.store.dispatch(new DiscussAreaActions.UpdateFail("SERVER FAIL"));
      return caught;
    })
  )
  
  constructor(
    private store: Store,
    private actions$: Actions,
    private apollo: Apollo
  ) {}
}