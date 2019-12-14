import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { Router, ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";

import * as fromApp from "../../store/app.reducer";
import * as DatabaseActions from "../store/database.actions";

import * as Leagues from '../../data/fmJDatabase/Leagues.data'
import * as Clubs from "../../data/fmJDatabase/Clubs.data";
import * as Players from "../../data/fmJDatabase/Players.data";
import { PlayerData } from "../../data/fmJDatabase/PlayerData.interface";

import { PlayerType } from "../../shared/player-type.enum";
import { DatapackFiletype } from '../../shared/datapack-filetype.enum';

import { nationality } from "../../shared/nationality";

import * as moment from 'moment';

@Component({
  selector: 'app-database-player',
  templateUrl: './database-player.component.html',
  styleUrls: ['./database-player.component.css']
})
export class DatabasePlayerComponent implements OnInit, OnDestroy {

  public clubContract;
  public club: Clubs.ClubData;
  public loanClubContract;
  public loanClub: Clubs.ClubData;
  public league: Leagues.LeagueData;

  public jobs: PlayerType[];
  public isPlayer: boolean;

  public playerId: string;
  public player: PlayerData;
  public playerAlias: string;
  public playerSecAlias: string;

  public loading: boolean = true;

  private databaseSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      const id = params['id'];
      const dob = params['dob'];
      this.store.dispatch(new DatabaseActions.LoadPlayer({
        id,
        name,
        dob
      }))
    });
    this.databaseSubscription = this.store
      .select("database")
      .subscribe(databaseState => {
        this.player = databaseState.editPlayer ? databaseState.editPlayer.player : null;
        this.loading = databaseState.loadingPlayer;
        if (this.player) {
          this.playerId = databaseState.editPlayer.id;
          this.clubContract = this.player.clubInfo;
          this.loanClubContract = this.player.loanInfo;
          if (this.clubContract) {
            this.club = Clubs.getClubByAlias(this.clubContract.id);
            this.league = this.club ? Leagues.getCurrentLeague(this.club.id, moment().year()) : null;
          }
          if (this.loanClubContract) {
            this.loanClub = Clubs.getClubByAlias(this.loanClubContract.id);
            this.league = Leagues.getCurrentLeague(this.loanClub.id, moment().year());
          }
          this.titleService.setTitle(this.player.basicInfo.name + " - Football Manager Jリーグデータパック");
        }
      });
  }

  ngOnDestroy() {
    if (this.databaseSubscription) {
      this.databaseSubscription.unsubscribe();
    }
    this.titleService.setTitle("Football Manager Jリーグデータパック");
  }

  getFlag(nat) {
    const targetNationality = nationality.find(n => n.code === nat);
    if (targetNationality) {
      return targetNationality.iso
        ? "flag-icon flag-icon-" + targetNationality.iso
        : "";
    }
    return "";
  }  

  getNationalityName(nat) {
    const targetNationality = nationality.find(n => n.code === nat);
    return targetNationality ? targetNationality.name : "";
  }

  getAge() {
    return this.player.basicInfo.dob ? moment().diff(this.player.basicInfo.dob, 'years') : 0;
  }

  getDatapackFiletype(type) {
    return DatapackFiletype[type];
  }

  getPlayerPosition() {
    return this.player ? Players.getPlayerPosition(this.player) : "";
  }

  getJobType(job: PlayerType[]) {
    return job.map(j => PlayerType[j]).join(", ")
  }

  getClubStyle() {
    if (this.loanClub) {
      return this.loanClub.color
      ? {
          backgroundColor: this.loanClub.color[1],
          color: this.loanClub.color[0]
        }
      : null;
    } else if (this.club) {
      return this.club.color
      ? {
          backgroundColor: this.club.color[1],
          color: this.club.color[0]
        }
      : null;
    }
    return null;
  }

  getCAClass() {
    const ca =  this.player.playerData.general.ca;
    if (!this.league) return "avereage-ca";
    const leagueGuideline = this.league.caGuideline;
    if (leagueGuideline.length !== 4) return "avereage-ca";
    if (ca >= leagueGuideline[0]) return "overrate-ca";
    else if (ca >= leagueGuideline[1]) return "good-ca";
    else if (ca >= leagueGuideline[2]) return "avereage-ca";
    else if (ca >= leagueGuideline[3]) return "poor-ca";
    else return "bad-ca"
  }

  getNormalValueClass(val) {
    if (val > 15) return "overrate-ca";
    else if (val > 10) return "good-ca";
    else if (val > 5) return "avereage-ca";
    else return "poor-ca";
  }

}
