import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { TranslateService } from '@ngx-translate/core';

import { Router, NavigationEnd } from '@angular/router';
import { GaService } from './shared/ga.service';

import { filter } from 'rxjs/operators';

import * as fromApp from './store/app.reducer';
import * as CoreActions from './core/store/core.actions';
import * as AdminActions from './admin/store/admin.actions';
import * as DatabaseActions from './database/store/database.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fm-j-league-pack';

  loaded = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private gaService: GaService,
    private translate: TranslateService
  ) {
    let browserLang = translate.getBrowserLang();
    console.log("BROWSER LANG", browserLang)
    translate.setDefaultLang('ja');
    translate.use(browserLang === 'ja' ? 'ja' : 'en');
  }

  ngOnInit() {
    this.loaded = true;

    this.store.dispatch(new AdminActions.AutoLogin());

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((params: any) => {
        this.gaService.sendPageView(params.url);
      });
    this.store.dispatch(new CoreActions.LoadBasicData());
    this.store.dispatch(new DatabaseActions.LoadLatestUpdatePlayers());
  }

  ngOnDestroy() {
    
  }
}
