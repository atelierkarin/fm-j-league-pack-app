import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from "rxjs";

import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';


import * as ChangelogActions from './changelog.actions';
import { PlayerDataChangelog } from "../../../../data/fmJDatabase/PlayerDataChangelog.interface";

@Injectable()
export class ChangelogEffects {

  private collectionReference: QueryFn;

  loadPlayerChangelog = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangelogActions.LOAD_PLAYER_CHANGELOG),
      switchMap((loadPlayerChangelog: ChangelogActions.LoadPlayerChangelog) => {
        this.collectionReference = ref => ref
          .where('id', '==', loadPlayerChangelog.payload);
        return this.db.collection<PlayerDataChangelog>('playerDbChangelog', this.collectionReference)
          .get({ source: "server" })
      }),
      map(docs => {
        let changelog = [];
        docs.forEach(doc => {
          changelog.push(doc.data())
        })
        return new ChangelogActions.SetPlayerChangelog(changelog);
      }),
      
      catchError(() => {
        return of(new ChangelogActions.LoadFail("SERVER FAIL"))
      })
    )
  );

  constructor(
    private actions$: Actions,
    private db: AngularFirestore
  ) {}
}
