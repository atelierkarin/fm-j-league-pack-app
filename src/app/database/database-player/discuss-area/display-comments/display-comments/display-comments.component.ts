import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from '../../../../../admin/user.model';
import { Comment } from '../../comment.interface';

import * as fromApp from '../../../../../store/app.reducer';

import * as DisucssAreaActions from '../../store/discuss-area.actions';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';

@Component({
  selector: 'app-display-comments',
  templateUrl: './display-comments.component.html',
  styleUrls: ['./display-comments.component.css']
})
export class DisplayCommentsComponent implements OnInit, OnDestroy {

  @Input() playerId: string;

  public comments: Comment[];

  public user: User;

  private deleting: boolean = false;

  private adminAuthSubscription: Subscription;
  private discussAreaSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private modalService: NgbModal) { }

  ngOnInit() {
    this.adminAuthSubscription = this.store.select('admin').subscribe(adminState => {
      this.user = adminState.user;
    });
    this.discussAreaSubscription = this.store.select('discussArea').subscribe(discussAreaState => {
      let loading = discussAreaState.loading;
      let comments = discussAreaState.comments;
      if (comments) {
        this.comments = comments.sort((a, b) => {
          return b.createDate.valueOf() - a.createDate.valueOf()
        })
      } else {
        this.comments = []
      }

      if (!loading && this.deleting) {
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
    return this.user !== null && comment.loginToken === this.user.uuid
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

  onConfirmDelete(deleteId: string) {
    if (deleteId) {
      this.deleting = true;
      this.store.dispatch(
        new DisucssAreaActions.DeleteComment(deleteId)
      );
    }
  }

  onReload() {
    this.store.dispatch(
      new DisucssAreaActions.FetchComments(this.playerId)
    );
  }
}
