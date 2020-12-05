import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromApp from "../../../store/app.reducer";
import * as DatabaseActions from "../../store/database.actions";

import { PlayerHistory } from 'src/app/shared/database-filetype';

@Component({
  selector: 'app-player-history',
  templateUrl: './player-history.component.html',
  styleUrls: ['./player-history.component.css']
})
export class PlayerHistoryComponent implements OnInit {

  @Input() playerId: number;

  playerHistory: PlayerHistory[] = [];

  private databaseSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new DatabaseActions.LoadPlayerHistory(this.playerId));
    this.databaseSubscription = this.store
      .select("database")
      .subscribe((databaseState) => {
        this.playerHistory = databaseState.playerHistory;
      });
  }

  ngOnDestroy() {
    if (this.databaseSubscription) {
      this.databaseSubscription.unsubscribe();
    }
  }

}
