import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";

import * as fromApp from "../../../store/app.reducer";

import { ClubData } from "../../../shared/database-filetype";
import { nationality } from "../../../shared/nationality";

@Component({
  selector: "app-database-recent-updates",
  templateUrl: "./database-recent-updates.component.html",
  styleUrls: ["./database-recent-updates.component.css"],
})
export class DatabaseRecentUpdatesComponent implements OnInit, OnDestroy {
  public loading: boolean;
  public latestUpdatePlayers: {
    id: string;
    name: string;
    dob?: string;
    updateDate: string;
    clubId?: number;
  }[];

  private clubList: ClubData[];

  private coreSubscription: Subscription;
  private databaseSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    this.coreSubscription = this.store.select("core").subscribe((coreState) => {
      this.clubList = coreState.clubs;
    });
    this.databaseSubscription = this.store
      .select("database")
      .subscribe((databaseState) => {
        this.latestUpdatePlayers = databaseState.latestPlayers;
        this.loading = databaseState.loading;
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

  getClub(clubId) {
    if (clubId) {
      const club = this.clubList.find((c) => c.id === clubId);
      return club ? club.clubName : "所属クラブ未登録";
    }
    return "フリー";
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

  onNavigateToPlayers(player: { id: string; name: string; dob?: string }) {
    this.router.navigate(["/database/player/" + player.id]);
  }
}
