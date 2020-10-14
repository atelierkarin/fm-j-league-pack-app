import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as DatabaseActions from '../database/store/database.actions';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  public isCollapsed: boolean = true;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new DatabaseActions.LoadLatestUpdatePlayers());
    this.store.dispatch(new DatabaseActions.LoadMostAccessedPlayers());
  }

  onClearCache() {
    if (window.localStorage) {
      Object.keys(window.localStorage).forEach(key => {
        if (key.indexOf("club_") >= 0) {
          window.localStorage.removeItem(key)
        }
      });
    }
  }
}
