import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { Router, ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";

import * as fromApp from "../../store/app.reducer";
import * as DatabaseActions from "../store/database.actions";

import { ClubData, LeagueData } from "../../shared/database-filetype";
import * as Players from "../../data/fmJDatabase/Players.data";
import { PlayerData } from "../../data/fmJDatabase/PlayerData.interface";

import { PlayerType } from "../../shared/player-type.enum";
import { DatapackFiletype } from "../../shared/datapack-filetype.enum";

import { nationality } from "../../shared/nationality";

import { getCurrentLeague, getPAUpperLimit } from "../../shared/common";

import * as moment from "moment";

@Component({
  selector: "app-database-player",
  templateUrl: "./database-player.component.html",
  styleUrls: ["./database-player.component.css"],
})
export class DatabasePlayerComponent implements OnInit, OnDestroy {
  public clubContract;
  public club: ClubData;
  public loanClubContract;
  public loanClub: ClubData;
  public league: LeagueData;
  public leagues: LeagueData[];

  public jobs: PlayerType[];
  public isPlayer: boolean;

  public playerId: number;
  public player: PlayerData;
  public playerAlias: string;
  public playerSecAlias: string;

  public loading: boolean = true;

  private clubs: ClubData[];

  private coreSubscription: Subscription;
  private databaseSubscription: Subscription;

  private coreLoaded: boolean = false;
  private databaseLoaded: boolean = false;
  private initDone: boolean = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = parseInt(paramMap.get("id"));
      this.store.dispatch(new DatabaseActions.LoadPlayer(id));
    });
    this.coreSubscription = this.store.select("core").subscribe((coreState) => {
      this.clubs = coreState.clubs;
      this.leagues = coreState.leagues;
      this.coreLoaded = true;
      this.init();
    });
    this.databaseSubscription = this.store
      .select("database")
      .subscribe((databaseState) => {
        this.player = databaseState.editPlayer;
        this.loading = databaseState.loadingPlayer;
        if (this.player) this.playerId = databaseState.editPlayer.id;
        this.databaseLoaded = true;
        this.init();
      });
  }

  ngOnDestroy() {
    if (this.coreSubscription) this.coreSubscription.unsubscribe();
    if (this.databaseSubscription) {
      this.databaseSubscription.unsubscribe();
    }
    this.titleService.setTitle("Football Manager Jリーグデータパック");
  }

  getFlag(nat) {
    const targetNationality = nationality.find((n) => n.code === nat);
    if (targetNationality) {
      return targetNationality.iso
        ? "flag-icon flag-icon-" + targetNationality.iso
        : "";
    }
    return "";
  }

  getNationalityName(nat) {
    const targetNationality = nationality.find((n) => n.code === nat);
    return targetNationality ? targetNationality.name : "";
  }

  getAge() {
    return this.player.basicInfo.dob
      ? moment().diff(this.player.basicInfo.dob, "years")
      : 0;
  }

  getDatapackFiletype(type) {
    return DatapackFiletype[type];
  }

  getPlayerPosition() {
    return this.player &&
      this.player.playerData &&
      this.player.playerData.positions
      ? Players.getPlayerPosition(this.player.playerData.positions)
      : "";
  }

  getJobType(job: PlayerType[]) {
    return job.map((j) => PlayerType[j]).join(", ");
  }

  getClubStyle() {
    if (this.loanClub) {
      return this.loanClub.clubColor1
        ? {
            backgroundColor: this.loanClub.clubColor2,
            color: this.loanClub.clubColor1,
          }
        : null;
    } else if (this.club) {
      return this.club.clubColor1
        ? {
            backgroundColor: this.club.clubColor2,
            color: this.club.clubColor1,
          }
        : null;
    }
    return null;
  }

  getCAClass() {
    const ca = this.player.playerData.general.ca;
    if (!this.league) return "avereage-ca";
    const leagueGuideline = this.league.leagueCaGuideline;
    if (leagueGuideline.length !== 4) return "avereage-ca";
    if (ca >= leagueGuideline[0]) return "overrate-ca";
    else if (ca >= leagueGuideline[1]) return "good-ca";
    else if (ca >= leagueGuideline[2]) return "avereage-ca";
    else if (ca >= leagueGuideline[3]) return "poor-ca";
    else return "bad-ca";
  }

  getPAClass() {
    let realPa = this.player.playerData.general.pa;
    if (realPa < 0) {
      realPa = getPAUpperLimit(realPa);
    }
    if (!this.league) return "avereage-ca";
    const leagueGuideline = this.league.leagueCaGuideline;
    if (leagueGuideline.length !== 4) return "avereage-ca";
    if (realPa >= leagueGuideline[0]) return "overrate-ca";
    else if (realPa >= leagueGuideline[1]) return "good-ca";
    else if (realPa >= leagueGuideline[2]) return "avereage-ca";
    else if (realPa >= leagueGuideline[3]) return "poor-ca";
    else return "bad-ca";
  }

  getNormalValueClass(val) {
    if (val > 15) return "overrate-ca";
    else if (val > 10) return "good-ca";
    else if (val > 5) return "avereage-ca";
    else return "poor-ca";
  }

  private init() {
    if (this.coreLoaded && this.databaseLoaded && !this.initDone) {
      if (this.player) {
        this.clubContract = this.player.clubInfo;
        this.loanClubContract = this.player.loanInfo;
        if (this.clubContract) {
          this.club = this.clubs.find((c) => c.id === this.clubContract.id);
          this.league = this.club
            ? getCurrentLeague(this.leagues, this.club.id)
            : null;
        }
        if (this.loanClubContract) {
          this.loanClub = this.clubs.find(
            (c) => c.id === this.loanClubContract.id
          );
          this.league = getCurrentLeague(this.leagues, this.loanClub.id);
        }
        this.titleService.setTitle(
          this.player.basicInfo.name + " - Football Manager Jリーグデータパック"
        );
        this.initDone = true;
        this.store.dispatch(new DatabaseActions.BrowsePlayer(this.playerId));
      }
    }
  }
}
