import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { take, map } from "rxjs/operators"

import * as fromApp from "../store/app.reducer"
import * as fromAdmin from "./store/admin.reducer"

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select("admin").pipe(
      take(1),
      map((adminState: fromAdmin.State) => {
        const isAuth = adminState.isAdmin;
        if (!isAuth) {
          this.router.navigate(['/']);
        }
        return isAuth;
      })
    );
  }
}
