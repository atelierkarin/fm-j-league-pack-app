import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from '../../../../../admin/user.model';
import { Comment } from '../../comment.interface';

import * as fromApp from '../../../../../store/app.reducer';
import * as AdminActions from '../../../../../admin/store/admin.actions';
import * as DisucssAreaActions from '../../store/discuss-area.actions';
import * as SharedActions from "../../../../../shared/store/shared.actions";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit, OnDestroy {

  @Input() playerId: number;
  @Output('reload') reload = new EventEmitter<boolean>();

  public displayName: string;
  public comment: string;

  public user: User;
  private isAdmin: boolean;

  public submitting: boolean;
  public loading: boolean;
  public errString: string;

  private adminAuthSubscription: Subscription;
  private discussAreaSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    if (localStorage) {
      const tempUsername = localStorage.getItem("default-user-name");
      if (tempUsername) {
        this.displayName = tempUsername;
      }
    }
    this.adminAuthSubscription = this.store.select('admin').subscribe(adminState => {
      this.user = adminState.user;
      this.isAdmin = adminState.isAdmin;
      if (this.user && !this.displayName) this.displayName = this.user.displayName;      
    });
    this.discussAreaSubscription = this.store.select('discussArea').subscribe(discussAreaState => {
      this.loading = discussAreaState.loading;
      this.errString = discussAreaState.errMsg;      
      if (this.submitting && !this.loading) {
        this.comment = "";
        this.submitting = false;
        this.store.dispatch(new SharedActions.SetToastContent({
          content: "コメント成功しました",
          style: "success"
        }));
        this.reload.emit(true);
      }
    });
  }

  ngOnDestroy() {
    if (this.adminAuthSubscription) {
      this.adminAuthSubscription.unsubscribe();
    }
    if (this.discussAreaSubscription) {
      this.discussAreaSubscription.unsubscribe();
    }
  }

  onLogin() {
    this.store.dispatch(
      new AdminActions.LoginStart()
    );
  }

  onReset() {
    this.comment = "";
  }

  onComment() {
    if (localStorage) {
      localStorage.setItem("default-user-name", this.displayName);
    }
    let newComment: Comment = {
      username: this.displayName,
      googleAccount: this.user.uuid,
      playerId: this.playerId,
      message: this.comment,
    };
    this.submitting = true;
    this.store.dispatch(
      new DisucssAreaActions.AddComment({ comment: newComment, admin: this.isAdmin})
    );
  }

}
