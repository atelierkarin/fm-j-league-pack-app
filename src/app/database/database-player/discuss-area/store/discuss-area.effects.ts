import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, take } from 'rxjs/operators';
import { from, of, throwError } from "rxjs";

import { AngularFirestore } from '@angular/fire/firestore';

import * as DiscussAreaActions from './discuss-area.actions';
import { Comment } from "../comment.interface";

@Injectable()
export class DiscussAreaEffects {

  private useServer: boolean;

  @Effect()
  fetchComments = this.actions$.pipe(
    ofType(DiscussAreaActions.FETCH_COMMENTS),
    switchMap((fetchComments: DiscussAreaActions.FetchComments) => {
      this.useServer = false;
      const collectionReference = ref => ref.where('targetPlayerId', '==', fetchComments.payload);

      return this.db.collection<Comment>('playerUserComments', collectionReference)
        .get({ source: "server" })
    }),
    map((docs: firebase.firestore.QuerySnapshot) => {
      let comments = [];
      docs.forEach(doc => {
        const comment = {
          id: doc.id,
          ...doc.data()
        }
        comments.push(comment)
      })
      return new DiscussAreaActions.SetComments(comments);
    }),
    catchError(() => {
      return of(new DiscussAreaActions.UpdateFail("SERVER FAIL"))
    })
  )

  @Effect()
  addComment = this.actions$.pipe(
    ofType(DiscussAreaActions.ADD_COMMENT),
    switchMap((addComment: DiscussAreaActions.AddComment) => {     
      const newComment = {
        ...addComment.payload
      }
      return from(this.db.collection<Comment>('playerUserComments').add(newComment))
    }),
    map(() => {
      return new DiscussAreaActions.UpdateSuccess()
    }),
    catchError(() => {
      return of(new  DiscussAreaActions.UpdateFail("SERVER FAIL"))
    })
  )

  @Effect()
  deleteComment = this.actions$.pipe(
    ofType(DiscussAreaActions.DELETE_COMMENT),
    switchMap((deleteComment: DiscussAreaActions.DeleteComment) => {     
      const deleteId = deleteComment.payload;
      return from(this.db.collection<Comment>('playerUserComments').doc(deleteId).delete())
    }),
    map(() => {
      return new DiscussAreaActions.UpdateSuccess()
    }),
    catchError(() => {
      return of(new  DiscussAreaActions.UpdateFail("SERVER FAIL"))
    })
  )
  
  constructor(
    private actions$: Actions,
    private db: AngularFirestore
  ) {}
}