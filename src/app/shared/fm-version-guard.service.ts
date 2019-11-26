import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { take, map } from "rxjs/operators"

import * as fromApp from "../store/app.reducer"
import * as fromCore from "../core/store/core.reducer";

import * as VersionData from '../data/VersionData';

@Injectable()
export class FmVersionGuard implements CanActivate {

  private fmVersionDataList: VersionData.VersionData[] = VersionData.fmVersionDataList;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('core').pipe(
      take(1),
      map((coreState: fromCore.State) => {
        const fmVersion = coreState.fmVersion;
        const currVersionData = this.getCurrentVersionData(fmVersion)
        if (!currVersionData) {
          this.router.navigate(['/playerUpdate']);
        }
        return true;
      })
    );
  }

  private getCurrentVersionData(version): VersionData.VersionData {
    return this.fmVersionDataList.find((versionData: VersionData.VersionData) => versionData.fmVersion === version);
  }
}