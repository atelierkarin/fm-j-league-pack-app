import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromApp from '../../store/app.reducer';

import * as Leagues from '../../data/fmJDatabase/Leagues.data'

import * as moment from 'moment';

@Component({
  selector: 'app-database-main',
  templateUrl: './database-main.component.html',
  styleUrls: ['./database-main.component.css']
})
export class DatabaseMainComponent implements OnInit {

  public leagues: Leagues.LeagueData[] = Leagues.Leagues;

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {}

  getTeamCounts(leagueId) {
    try {
      const targetLeague = this.leagues.find(l => l.id === leagueId);
      const targetLeagueSeason = targetLeague.seasons.find(s => s.year === moment().year());
      return targetLeagueSeason.teams.length;
    } catch (err) {}
    return 0;    
  }

  onClickLeague(leagueId) {
    this.router.navigate(['/database/league/' + leagueId]);
  }
}
