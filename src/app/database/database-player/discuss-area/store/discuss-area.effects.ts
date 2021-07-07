import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { messagesByPlayerId, messagesByLatestUpdate, mutationInsertMessage, mutationDeleteMessage, messagesByClubId, messagesByPlayerIdAdmin, messagesByClubIdAdmin } from './discuss-area-queries';

import * as DiscussAreaActions from './discuss-area.actions';

@Injectable()
export class DiscussAreaEffects {

  private temp: any = null;

  fetchComments = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscussAreaActions.FETCH_COMMENTS_BY_PLAYER_ID),
      switchMap((action: DiscussAreaActions.FetchCommentsByPlayerId) => {
        const isAdmin = action.payload.admin ? action.payload.admin : false;
        this.temp = {
          loadMore: (action.payload.startIndex && action.payload.startIndex > 0)
        }
        return this.apollo.watchQuery<any>({
          query: isAdmin ? messagesByPlayerIdAdmin : messagesByPlayerId,
          variables: {
            id: action.payload.id,
            startIndex: action.payload.startIndex
          }
        }).valueChanges;
      }),
      map((result: ApolloQueryResult<any>) => {
        let comments = [];
        if (result && result.data && result.data.messagesByPlayerId) {
          comments = result.data.messagesByPlayerId.map(v => v)
        }
        return this.temp && this.temp.loadMore ? new DiscussAreaActions.SetMoreComments(comments) : new DiscussAreaActions.SetComments(comments);
      }),
      catchError((err, caught) => {
        this.temp = null;
        console.error(err);
        this.store.dispatch(new DiscussAreaActions.UpdateFail("SERVER FAIL"));
        return caught;
      })
    )
  );

  fetchLatestComments = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscussAreaActions.FETCH_LATEST_COMMENTS),
      switchMap(() => {
        return this.apollo.watchQuery<any>({
          query: messagesByLatestUpdate
        }).valueChanges;
      }),
      map((result: ApolloQueryResult<any>) => {
        let comments = [];
        if (result && result.data && result.data.messagesByLatestUpdate) {
          comments = result.data.messagesByLatestUpdate.map(v => v)
        }
        return new DiscussAreaActions.SetLatestComments(comments);
      }),
      catchError((err, caught) => {
        this.temp = null;
        console.error(err);
        this.store.dispatch(new DiscussAreaActions.UpdateFail("SERVER FAIL"));
        return caught;
      })
    )
  );

  addComment = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscussAreaActions.ADD_COMMENT),
      switchMap((action: DiscussAreaActions.AddComment) => {
        const insertPlayer = action.payload.comment.playerId ? true : false;
        const isAdmin = action.payload.admin ? action.payload.admin : false;
        return this.apollo.mutate<any>({
          mutation: mutationInsertMessage,
          variables: {
            message: action.payload.comment
          },
          refetchQueries: [
            {
              query: insertPlayer ? (isAdmin ? messagesByPlayerIdAdmin : messagesByPlayerId) : (isAdmin ? messagesByClubIdAdmin : messagesByClubId),
              variables: {
                id: insertPlayer ? action.payload.comment.playerId : action.payload.comment.clubId
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
  );

  deleteComment = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscussAreaActions.DELETE_COMMENT),
      switchMap((action: DiscussAreaActions.DeleteComment) => {
        const deletePlayer = action.payload.playerId ? true : false;
        const isAdmin = action.payload.admin ? action.payload.admin : false;
        return this.apollo.mutate<any>({
          mutation: mutationDeleteMessage,
          variables: {
            id: action.payload.id
          },
          refetchQueries: [
            {
              query: deletePlayer ? (isAdmin ? messagesByPlayerIdAdmin : messagesByPlayerId) : (isAdmin ? messagesByClubIdAdmin : messagesByClubId),
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
  );
  
  constructor(
    private store: Store,
    private actions$: Actions,
    private apollo: Apollo
  ) {}
}