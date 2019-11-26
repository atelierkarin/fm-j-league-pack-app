import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import * as fromApp from '../../store/app.reducer';

import * as Leagues from '../../data/fmJDatabase/Leagues.data'
import * as Clubs from '../../data/fmJDatabase/Clubs.data'

@Component({
  selector: 'app-database-league',
  templateUrl: './database-league.component.html',
  styleUrls: ['./database-league.component.css']
})
export class DatabaseLeagueComponent implements OnInit, OnDestroy {

  public leagueId: number;
  public season: number;
  public clubs: number[];

  public league: Leagues.LeagueData;
  public leagues: Leagues.LeagueData[] = Leagues.Leagues;

  public getClubByAlias = Clubs.getClubByAlias;

  private databaseSubscription: Subscription;  

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.leagueId = parseInt(paramMap.get('id'));
      this.getLeagueTeam();
    })
    this.databaseSubscription = this.store.select('database').subscribe(databaseState => {
      this.season = databaseState.season;

      this.getLeagueTeam();
    })
  }

  ngOnDestroy() {
    if (this.databaseSubscription) {
      this.databaseSubscription.unsubscribe();
    }
  }

  onClickClub(clubId) {
    this.router.navigate(['/database/club/' + clubId]);
  }

  getLeagueTeam() {
    if (this.leagueId) {
      try {
        this.league = this.leagues.find(l => l.id === this.leagueId);
        const targetLeagueSeason = this.league.seasons.find(s => s.year === this.season);
        this.clubs = targetLeagueSeason.teams.sort((a, b) => a - b);
      } catch (err) {}
    }
  }

  getClubName(clubId) {
    const club = this.getClubByAlias(clubId);
    return club.name;
  }

  getClubStyle(clubId) {
    const club = this.getClubByAlias(clubId);
    return club.color ? {
      'backgroundColor': club.color[1],
      'color': club.color[0],
    } : null;
  }

}
