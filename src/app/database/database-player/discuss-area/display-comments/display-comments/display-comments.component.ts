import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from '../../../../../admin/user.model';
import { Comment } from '../../comment.interface';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';

import * as fromApp from '../../../../../store/app.reducer';
import * as DisucssAreaActions from '../../store/discuss-area.actions';

@Component({
  selector: 'app-display-comments',
  templateUrl: './display-comments.component.html',
  styleUrls: ['./display-comments.component.css']
})
export class DisplayCommentsComponent implements OnInit, OnDestroy {

  @Input() playerId: number;

  public comments: Comment[];

  public user: User;

  public lastCommentIndex: number = 0;

  public loading: boolean = false;
  private deleting: boolean = false;
  public admin: boolean = false;

  private adminAuthSubscription: Subscription;
  private discussAreaSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private modalService: NgbModal) { }

  ngOnInit() {
    this.adminAuthSubscription = this.store.select('admin').subscribe(adminState => {
      this.user = adminState.user;
      this.admin = adminState.isAdmin;
    });
    this.discussAreaSubscription = this.store.select('discussArea').subscribe(discussAreaState => {
      this.loading = discussAreaState.loading;
      this.comments = discussAreaState.comments;
      this.lastCommentIndex = this.comments ? this.comments.length : 0;
      
      if (!this.loading && this.deleting) {
        this.deleting = false;
        this.onReload();
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

  checkIfOwnComment(comment: Comment) {
    return this.user !== null && comment.googleAccount === this.user.uuid
  }

  formatDate(date: Date) {
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
  }

  onDelete(content, deleteId) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result) {
        this.onConfirmDelete(deleteId);
      }
    });
  }

  onConfirmDelete(deleteId: number) {
    if (deleteId) {
      this.deleting = true;
      this.store.dispatch(
        new DisucssAreaActions.DeleteComment({ id: deleteId, playerId: this.playerId, admin: this.admin })
      );
    }
  }

  onLoadMore() {
    this.store.dispatch(
      new DisucssAreaActions.FetchCommentsByPlayerId({id: this.playerId, startIndex: this.lastCommentIndex, admin: this.admin})
    );
  }

  onReload() {
    this.store.dispatch(
      new DisucssAreaActions.FetchCommentsByPlayerId({id: this.playerId, admin: this.admin})
    );
  }
}
