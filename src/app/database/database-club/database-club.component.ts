import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
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

import { nationality } from "../../shared/nationality";

import * as moment from 'moment';

@Component({
  selector: "app-database-club",
  templateUrl: "./database-club.component.html",
  styleUrls: ["./database-club.component.css"]
})
export class DatabaseClubComponent implements OnInit, OnDestroy {
  public clubAlias: string;
  public club: Clubs.ClubData;
  public clubs: Clubs.ClubData[] = Clubs.Clubs;
  public league: Leagues.LeagueData;

  public loading: boolean = true;

  public dbPlayers: {player: PlayerData, id: string}[];

  public getClubByAlias = Clubs.getClubByAlias;

  public staff: {
    id: string;
    name: string;
    nameEng: string;
    nationality: string;
    dob: string;
    job: PlayerType;
  }[];

  public players: {
    id: string;
    squardNo: number;
    name: string;
    nameEng: string;
    nationality: string;
    dob: string;
    position: string;
    loanOut?: boolean;
    loanIn?: boolean;
    ca?: number;
    pa?: number;
    updateThisWeek: boolean;
    updateDate: string;
  }[];

  private databaseSubscription: Subscription;

  public innerWidth: any;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;

    this.staff = [];
    this.players = [];
    this.route.paramMap.subscribe(paramMap => {
      this.clubAlias = paramMap.get("alias");
      this.loadSeasonInfo();
    });
    this.databaseSubscription = this.store
      .select("database")
      .subscribe(databaseState => {
        this.dbPlayers = databaseState.searchPlayers;
        this.loading = databaseState.loading;

        if (this.dbPlayers) {
          this.getPlayersList();
          this.getStaffList();
        }
      });
  }

  ngOnDestroy() {
    if (this.databaseSubscription) {
      this.databaseSubscription.unsubscribe();
    }
    this.titleService.setTitle("Football Manager Jリーグデータパック");
  }

  loadSeasonInfo() {
    if (this.clubAlias) {
      this.club = this.getClubByAlias(this.clubAlias);
      this.league = Leagues.getCurrentLeague(this.club.id, moment().year());
      this.store.dispatch(new DatabaseActions.SearchPlayersByClub(this.club.id));
      this.titleService.setTitle(this.club.name + " - Football Manager Jリーグデータパック");
    } 
  }

  getPlayersList() {
    this.players = this.dbPlayers
      ? this.dbPlayers.map(({player, id}) => {
          const currentClub = player.clubInfo;
          if (player.basicInfo.isPlayer) {
            const currentLoan = player.loanInfo;
            const loanOut =
              currentClub && currentLoan ? currentClub.id === this.club.id : false;
            const loanIn =
              currentClub && currentLoan ? currentLoan.id === this.club.id : false;
            
            const ca = player.playerData && player.playerData.general && player.playerData.general.ca ? player.playerData.general.ca : null;
            const pa = player.playerData && player.playerData.general && player.playerData.general.pa ? player.playerData.general.pa : null;

            let squardNo = null;
            if (loanIn && currentLoan.squardNumber) squardNo = currentLoan.squardNumber;
            if (!currentLoan && currentClub.squardNumber) squardNo = currentClub.squardNumber;

            let updateThisWeek = false;
            if (player.basicInfo.updateDate) {
              const updateFrom = moment().diff(moment(player.basicInfo.updateDate), 'days');
              updateThisWeek = updateFrom < 7;
            }

            return {
              id,
              squardNo,
              name: player.basicInfo.name,
              nameEng: player.basicInfo.nameEng,
              nationality: player.basicInfo.nationality,
              dob: player.basicInfo.dob,
              position: Players.getPlayerPosition(player),
              loanOut,
              loanIn,
              ca,
              pa,
              updateThisWeek,
              updateDate: player.basicInfo.updateDate
            };
          } else return null
        }).filter(v => v)
      : null;
  }

  getStaffList() {
    const allStaff = this.dbPlayers
    ? this.dbPlayers.map(({player, id}) => {
        const currentClub = player.clubInfo;
          if (player.basicInfo.isNonPlayer) {
            return {
              id,
              name: player.basicInfo.name,
              nameEng: player.basicInfo.nameEng,
              nationality: player.basicInfo.nationality,
              dob: player.basicInfo.dob,
              job: currentClub.job
            };
          } else return null
        }).filter(v => v)
      : null;

    let staff = [];
    const staffTypeList = [
      PlayerType["オーナー／社長"],
      PlayerType.取締役,
      PlayerType.フットボールディレクター,
      PlayerType.ユース管理責任者, 
      PlayerType.監督,
      PlayerType.アシスタントマネージャー,
      PlayerType.コーチ,
      PlayerType.GKコーチ,
      PlayerType.フィジカルコーチ,
      PlayerType.チーフスカウト,
      PlayerType.スカウト,
      PlayerType.チーフデータアナリスト,
      PlayerType.データアナリスト,
      PlayerType.ヘッドフィジオ,
      PlayerType.トレーナー,
      PlayerType.チーフスポーツサイエンティスト,
      PlayerType.スポーツサイエンティスト
     ]

    staffTypeList.forEach(playerType => {
      const anyStaffBelongToThisType = allStaff.filter(s => s.job && Array.isArray(s.job) && s.job.includes(playerType))
      if (anyStaffBelongToThisType && anyStaffBelongToThisType.length > 0) {
        staff = [...staff, ...anyStaffBelongToThisType.map(s => ({
          ...s,
          job: playerType
        }))]
      }
    })
    this.staff = staff;
  }

  getJobType(job: PlayerType) {
    return PlayerType[job]
  }

  getClubStyle() {
    return this.club.color
      ? {
          backgroundColor: this.club.color[1],
          color: this.club.color[0]
        }
      : null;
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

  getRowClass(row): string {
    if (row.loanOut) return "loan-out";
    if (row.loanIn) return "loan-in";
    return "";
  }

  getCAClass(ca) {    
    if (!this.league) return "avereage-ca";
    const leagueGuideline = this.league.caGuideline;
    if (leagueGuideline.length !== 4) return "avereage-ca";
    if (ca >= leagueGuideline[0]) return "overrate-ca";
    else if (ca >= leagueGuideline[1]) return "good-ca";
    else if (ca >= leagueGuideline[2]) return "avereage-ca";
    else if (ca >= leagueGuideline[3]) return "poor-ca";
    else return "bad-ca"
  }

  sortSquadNo(valueA, valueB, rowA, rowB, sortDirection) {
    let defaultEmptyValue = sortDirection === "asc" ? 99999 : 0;
    let sortValueA = valueA ? valueA : defaultEmptyValue;
    let sortValueB = valueB ? valueB : defaultEmptyValue;

    return sortValueA > sortValueB ? 1 : sortValueA < sortValueB ? -1 : 0;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
}
