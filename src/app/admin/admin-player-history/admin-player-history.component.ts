import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ClubData, LeagueData } from "../../shared/database-filetype";

import * as fromApp from "../../store/app.reducer";
import * as DatabaseActions from "../../database/store/database.actions";

@Component({
  selector: 'app-admin-player-history',
  templateUrl: './admin-player-history.component.html',
  styleUrls: ['./admin-player-history.component.css']
})
export class AdminPlayerHistoryComponent implements OnInit, OnDestroy {

  public clubs: ClubData[];
  public leagues: LeagueData[];

  public seasons: number[] = [
    2020, 2019, 2018, 2017
  ];

  public clubId: number;
  public leagueId: number;
  public season: number;

  public players: {
    id: number;
    squadNo: number;
    name: string;
  }[];

  public idList: number[];

  public playerHistoryNameInfo: {playerId?: number, playerName: string}[];

  private coreSubscription: Subscription;
  private databaseSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.coreSubscription = this.store.select("core").subscribe((coreState) => {
      this.clubs = coreState.clubs;
      this.leagues = coreState.leagues;
    });
    this.databaseSubscription = this.store.select("database").subscribe((state) => {
      this.playerHistoryNameInfo = state.playerHistoryNameInfo;
      if (this.playerHistoryNameInfo) {
        this.playerHistoryNameInfo.forEach(d => {
          this.idList[d.playerName] = d.playerId;
        })
      }
      this.players = state.searchPlayers ? state.searchPlayers.filter(p => p.isPlayer).map(p => ({
        id: p.id,
        squadNo: p.squadNo,
        name: p.name
      })) : null;
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

  onSearch() {
    this.idList = [];
    this.store.dispatch(new DatabaseActions.LoadPlayerHistoryName({season: this.season, clubId: this.clubId, leagueId: this.leagueId}));
    if (this.clubId) this.store.dispatch(new DatabaseActions.SearchPlayersByClub(this.clubId));
  }

  onUpdate(name: string) {
    let data: {season: number, clubId: number, leagueId: number, playerId: number, playerName: string} = {
      season: this.season,
      clubId: this.clubId,
      leagueId: this.leagueId,
      playerId: this.idList[name],
      playerName: name
    }
    this.store.dispatch(new DatabaseActions.UpdatePlayerHistoryName(data));
  }

  onUpdateByDefault(name: string) {
    const id = this.findRecommendPlayerId(name);
    if (id) {
      let data: {season: number, clubId: number, leagueId: number, playerId: number, playerName: string} = {
        season: this.season,
        clubId: this.clubId,
        leagueId: this.leagueId,
        playerId: id,
        playerName: name
      }
      this.store.dispatch(new DatabaseActions.UpdatePlayerHistoryName(data));
    }
  }

  findRecommendPlayerId(name: string) {
    if (this.players) {
      const recommendPlayer = this.players.find(p => p.name === name);
      return recommendPlayer ? recommendPlayer.id : null
    }
    return null;
  }

}
