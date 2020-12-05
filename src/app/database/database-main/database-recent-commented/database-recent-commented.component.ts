import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";

import * as fromApp from "../../../store/app.reducer";

import { Comment } from "../../database-player/discuss-area/comment.interface";

@Component({
  selector: 'app-database-recent-commented',
  templateUrl: './database-recent-commented.component.html',
  styleUrls: ['./database-recent-commented.component.css']
})
export class DatabaseRecentCommentedComponent implements OnInit, OnDestroy {

  public loading: boolean;
  public comments: Comment[];

  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.store
      .select("discussArea")
      .subscribe(state => {
        this.comments = state.latestComments;
        this.loading = state.loading;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onNavigate(comment: Comment) {
    if (comment.clubId) {
      this.router.navigate(["/database/club/" + comment.clubId]);
    }
    if (comment.playerId) {
      this.router.navigate(["/database/player/" + comment.playerId]);
    }
  }

}
