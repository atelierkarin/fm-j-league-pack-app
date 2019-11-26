import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';

import { User } from '../user.model';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import * as AdminActions from './admin.actions';
import { from, of } from "rxjs";
import { switchMap, catchError, map, tap } from 'rxjs/operators';

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.code) {
    return of(new AdminActions.AuthFail(errorMessage));
  }
  switch (errorRes.code) {
    case 'auth/user-not-found':
      errorMessage = 'メールアドレスが間違っています';
      break;
    case 'auth/wrong-password':
      errorMessage = 'パスワードが間違っています';
      break;
  }
  return of(new AdminActions.AuthFail(errorMessage));
};

@Injectable()
export class AdminEffects {

  private redirectUrl: string;
  private loginCredential: firebase.auth.UserCredential;

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AdminActions.LOGIN_START),
    switchMap((loginStart: AdminActions.LoginStart) => {
      this.loginCredential = null;
      this.redirectUrl = loginStart.payload;
      const provider = new firebase.auth.GoogleAuthProvider();
      return this.afAuth.auth.signInWithPopup(provider);
    }),
    switchMap(credential => {
      this.loginCredential = credential;
      return from(this.afAuth.auth.currentUser.getIdToken())
    }),
    map((token: string) => {
      const email = this.loginCredential.user.email;
      const displayName = this.loginCredential.user.displayName;
      const uuid = this.loginCredential.user.uid;
      const isAdmin = email === "atelierkarin@gmail.com";
      const expirationDate = new Date(new Date().getTime() + (2*60*60*1000));        
      const user = new User(email, displayName, uuid, token, expirationDate);
      localStorage.setItem('userData', JSON.stringify(user));
      if (this.redirectUrl) this.router.navigate([this.redirectUrl]);
      return new AdminActions.AuthSuccess({email, displayName, uuid, token, expirationDate, isAdmin})      
    }),
    catchError(errorRes => {
      this.router.navigate(['/']);
      return handleError(errorRes);
    })
  )

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AdminActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        displayName: string;
        uuid: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(
        userData.email,
        userData.displayName,
        userData.uuid,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        const isAdmin = loadedUser.email === "atelierkarin@gmail.com";
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        if (expirationDuration > 0) {
          return new AdminActions.AuthSuccess({
            email: loadedUser.email,
            displayName: loadedUser.displayName,
            uuid: loadedUser.uuid,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            isAdmin
          });
        }
      }
      return { type: 'DUMMY' };
    })
  )

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}
}