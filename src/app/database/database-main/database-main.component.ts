import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
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
export class DatabaseMainComponent implements OnInit, OnDestroy {

  public leagues: Leagues.LeagueData[] = Leagues.Leagues;

  public latestUpdatePlayers: {id: string, name: string, dob?: string}[];

  private databaseSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {
    this.databaseSubscription = this.store
      .select("database")
      .subscribe(databaseState => {
        this.latestUpdatePlayers = databaseState.latestPlayers;
      });
  }

  ngOnDestroy() {
    if (this.databaseSubscription) {
      this.databaseSubscription.unsubscribe();
    }
  }

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

  onNavigateToPlayers(player: {id: string, name: string, dob?: string}) {
    this.router.navigate(['/database/player/'], { queryParams: {name: player.name, id: player.id, dob: player.dob} });
  }
}
