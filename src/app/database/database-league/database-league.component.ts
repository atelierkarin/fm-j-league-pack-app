import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import * as fromApp from '../../store/app.reducer';

import * as Leagues from '../../data/fmJDatabase/Leagues.data'
import { ClubData } from '../../shared/database-filetype'

import anime from 'animejs';

@Component({
  selector: 'app-database-league',
  templateUrl: './database-league.component.html',
  styleUrls: ['./database-league.component.css']
})
export class DatabaseLeagueComponent implements OnInit, OnDestroy {
  @Input() leagueId: number;
  
  public season: number;
  public clubs: number[];

  public league: Leagues.LeagueData;
  public leagues: Leagues.LeagueData[] = Leagues.Leagues;

  private clubList: ClubData[];

  private coreSubscription: Subscription;
  private databaseSubscription: Subscription;

  private animated: boolean = false;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.coreSubscription = this.store.select('core').subscribe(coreState => {
      
      this.clubList = coreState.clubs;
      console.log(this.clubList);
    })
    this.databaseSubscription = this.store.select('database').subscribe(databaseState => {
      this.season = databaseState.season;
      this.getLeagueTeam();
    })
  }

  ngOnDestroy() {
    if (this.coreSubscription)
      this.coreSubscription.unsubscribe();
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
        this.animateTeamButtons();
      } catch (err) {}
    }
  }

  getClubName(clubId) {
    const club = this.clubList.find(c => c.id === clubId)
    return club && club.clubName ? club.clubName : "";    
  }

  getClubStyle(clubId) {
    const club = this.clubList.find(c => c.id === clubId);
    return club && club.clubColor1 ? {
      'backgroundColor': club.clubColor2,
      'color': club.clubColor1,
    } : null;
  }

  private animateTeamButtons() {
    if (this.animated === false) {
      this.animated = true;
      
      let tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 500
      });

      tl
        .add({
          targets: '.club-button-of-league-' + this.leagueId,
          translateY: [500, 0],
          opacity: [0, 1],
          delay: anime.stagger(100)
        })
    }
  }

}
