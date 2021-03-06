import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as fromApp from '../../store/app.reducer';

import { ClubData, LeagueData } from '../../shared/database-filetype'
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-database-main',
  templateUrl: './database-main.component.html',
  styleUrls: ['./database-main.component.css']
})
export class DatabaseMainComponent implements OnInit, OnDestroy {

  admin$ = this.store.pipe(
    select('admin'),
    map((state) => state.isAdmin)
  );

  public loading: boolean;
  public leagues: LeagueData[];
  public latestUpdatePlayers: {id: string, name: string, dob?: string, updateDate: string, clubId?: number}[];
  public mostAccessedPlayers: {id: string, name: string, dob?: string, updateDate: string, clubId?: number}[];

  public activeId;

  private clubList: ClubData[];  

  private coreSubscription: Subscription;
  private databaseSubscription: Subscription;

  private season: number;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit() {
    if (localStorage) {
      const tempTab = localStorage.getItem("database-main-tab");
      if (tempTab) {
        this.activeId = parseInt(tempTab);
      };
    }

    this.coreSubscription = this.store.select('core').subscribe(coreState => {
      this.clubList = coreState.clubs;
      this.leagues = coreState.leagues;
    })
    this.databaseSubscription = this.store
      .select("database")
      .subscribe(databaseState => {
        this.latestUpdatePlayers = databaseState.latestPlayers;
        this.mostAccessedPlayers = databaseState.mostAccessedPlayers;
        this.season = databaseState.season;
        this.loading = databaseState.loading || databaseState.loadingMostAccessedPlayers;
      });
  }

  ngOnDestroy() {
    if (this.coreSubscription) {
      this.coreSubscription.unsubscribe();
    }
    if (this.databaseSubscription) {
      this.databaseSubscription.unsubscribe();
    }
  }

  getTeamCounts(leagueId) {
    try {
      const targetLeague = this.leagues.find(l => l.id === leagueId);
      const targetLeagueSeason = targetLeague.seasons.find(s => s.season === this.season);
      return targetLeagueSeason.teams.length;
    } catch (err) {}
    return 0;    
  }

  getClub(clubId) {
    if (clubId) {
      const club = this.clubList.find(c => c.id === clubId);
      return club ? club.clubName : "所属クラブ未登録";
    }
    return "フリー";
  }

  onClickLeague(leagueId) {
    this.router.navigate(['/database/league/' + leagueId]);
  }

  onNavigateToPlayers(player: {id: string, name: string, dob?: string}) {
    this.router.navigate(['/database/player/' + player.id]);
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (localStorage) {
      localStorage.setItem("database-main-tab", changeEvent.nextId);
    }
  }
}
