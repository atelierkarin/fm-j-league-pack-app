import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from "@ngrx/store";

import { nationality } from "../../../shared/nationality";
import { ClubData, LeagueData } from '../../../shared/database-filetype';

import * as fromApp from "../../../store/app.reducer";

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.css']
})
export class ListPlayersComponent implements OnInit {
  @Input() players: {
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
  @Input() league: LeagueData;
  @Input() loanout: boolean;
  @Input() innerWidth: number;

  private clubs: ClubData[];

  displayPlayers: {
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

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.displayPlayers = this.loanout ? this.players.filter(p => p.loanOut) : this.players.filter(p => !p.loanOut);

    this.coreSubscription = this.store.select("core").subscribe((coreState) => {
      this.clubs = coreState.clubs;
    });
  }

  ngOnDestroy() {
    if (this.coreSubscription) this.coreSubscription.unsubscribe();
  }

  getClubName(clubId) {
    const club = this.clubs.find(c => c.id === clubId)
    return club && club.clubName ? club.clubName : "";    
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

  sortSquadNo(valueA, valueB, rowA, rowB, sortDirection) {
    let defaultEmptyValue = sortDirection === "asc" ? 99999 : 0;
    let sortValueA = valueA ? parseInt(valueA) : defaultEmptyValue;
    let sortValueB = valueB ? parseInt(valueB) : defaultEmptyValue;

    return sortValueA > sortValueB ? 1 : sortValueA < sortValueB ? -1 : 0;
  }
}
