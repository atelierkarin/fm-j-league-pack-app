import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";

import * as fromApp from "../../store/app.reducer";
import * as DatabaseActions from "../store/database.actions";

import { ClubData, LeagueData } from '../../shared/database-filetype'
import * as Players from "../../data/fmJDatabase/Players.data";
import { PlayerDataSimple } from "../../data/fmJDatabase/PlayerData.interface";

import { PlayerType } from "../../shared/player-type.enum";

import { getCurrentLeague } from "../../shared/common";

import * as moment from 'moment';

@Component({
  selector: "app-database-club",
  templateUrl: "./database-club.component.html",
  styleUrls: ["./database-club.component.css"]
})
export class DatabaseClubComponent implements OnInit, OnDestroy {
  public clubAlias: string;
  public club: ClubData;
  public clubs: ClubData[];
  public league: LeagueData;
  public leagues: LeagueData[];

  public loading: boolean = true;

  public dbPlayers: PlayerDataSimple[];

  public staff: {
    id: number;
    name: string;
    nameEng: string;
    nationality: string;
    dob: string;
    job: PlayerType;
  }[];

  public players: {
    id: number;
    squadNo: number;
    name: string;
    nameEng: string;
    nationality: string;
    dob: string;
    position: string;
    loanOut?: boolean;
    loanIn?: boolean;
    loanClubId?: number;
    ca?: number;
    pa?: number;
    updateThisWeek: boolean;
    updateDate: string;
  }[];

  private coreSubscription: Subscription;
  private databaseSubscription: Subscription;

  private coreLoading: boolean = false;

  public innerWidth: any;

  public activeTabId: number = 2;

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
    });
    this.coreSubscription = this.store.select('core').subscribe(coreState => {
      this.clubs = coreState.clubs;
      this.leagues = coreState.leagues;
      this.coreLoading = coreState.loading;
      if (!this.coreLoading) {
        this.loadSeasonInfo();
      }
    })
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
    if (this.coreSubscription)
      this.coreSubscription.unsubscribe();
    if (this.databaseSubscription) {
      this.databaseSubscription.unsubscribe();
    }
    this.titleService.setTitle("Football Manager Jリーグデータパック");
  }

  loadSeasonInfo() {
    if (this.clubs && this.clubAlias) {
      this.club = this.clubs.find(c => (c.id === parseInt(this.clubAlias) || c.clubName === this.clubAlias || c.clubShortname === this.clubAlias));
      this.league = getCurrentLeague(this.leagues, this.club.id);
      this.store.dispatch(new DatabaseActions.SearchPlayersByClub(this.club.id));
      this.titleService.setTitle(this.club.clubName + " - Football Manager Jリーグデータパック");
      this.loading = true;
    } 
  }

  getPlayersList() {
    this.players = this.dbPlayers
      ? this.dbPlayers.map((player) => {
          const id = player.id;
          const currentClubId = player.clubId;
          if (player.isPlayer) {
            const currentLoanClubId = player.loanClubId;
            const loanOut =
              currentClubId && currentLoanClubId ? currentClubId === this.club.id : false;
            const loanIn =
              currentClubId && currentLoanClubId ? currentLoanClubId === this.club.id : false;
            
            let loanClubId = null;
            if (loanOut) {
              loanClubId = currentLoanClubId;
            }
            
            const ca = player.ca;
            const pa = player.pa;

            let squadNo = player.squadNo;

            let updateThisWeek = false;
            if (player.updateDate) {
              const updateFrom = moment().diff(moment(player.updateDate), 'days');
              updateThisWeek = updateFrom < 7;
            }

            return {
              id,
              squadNo,
              name: player.name,
              nameEng: player.nameEng,
              nationality: player.nationality,
              dob: player.dob,
              position: Players.getPlayerPosition(player.positions),
              loanOut,
              loanIn,
              loanClubId,
              ca,
              pa,
              updateThisWeek,
              updateDate: player.updateDate
            };
          } else return null
        }).filter(v => v)
      : null;
  }

  getStaffList() {
    const allStaff = this.dbPlayers
    ? this.dbPlayers.map((player) => {
        const currentClubId = player.clubId;
          if (player.isNonPlayer) {
            return {
              id: player.id,
              name: player.name,
              nameEng: player.nameEng,
              nationality: player.nationality,
              dob: player.dob,
              job: player.job
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

  getClubStyle() {
    if (this.club)
      return this.club.clubColor1
        ? {
            backgroundColor: this.club.clubColor2,
            color: this.club.clubColor1
          }
        : null;
    return null;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
}
