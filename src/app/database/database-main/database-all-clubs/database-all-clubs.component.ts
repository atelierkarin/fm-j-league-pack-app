import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromApp from '../../../store/app.reducer';

import { LeagueData } from '../../../shared/database-filetype'

@Component({
  selector: 'app-database-all-clubs',
  templateUrl: './database-all-clubs.component.html',
  styleUrls: ['./database-all-clubs.component.css']
})
export class DatabaseAllClubsComponent implements OnInit, OnDestroy {

  public leagues: LeagueData[];

  private coreSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit(): void {
    this.coreSubscription = this.store.select('core').subscribe(coreState => {
      this.leagues = coreState.leagues;
    })
  }

  ngOnDestroy() {
    if (this.coreSubscription) {
      this.coreSubscription.unsubscribe();
    }
  }

  onClickLeague(leagueId) {
    this.router.navigate(['/database/league/' + leagueId]);
  }

}
