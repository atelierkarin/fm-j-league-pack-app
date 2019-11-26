import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from '../../../../admin/user.model';

import * as fromApp from '../../../../store/app.reducer';
import * as DisucssAreaActions from '../store/discuss-area.actions';

@Component({
  selector: 'app-discuss-area-main',
  templateUrl: './discuss-area-main.component.html',
  styleUrls: ['./discuss-area-main.component.css']
})
export class DiscussAreaMainComponent implements OnInit, OnDestroy {

  @Input() playerId: string;

  public user: User;

  private adminAuthSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.adminAuthSubscription = this.store.select('admin').subscribe(adminState => {
      this.user = adminState.user;
    });
    this.onReload();
  }

  ngOnDestroy() {
    if (this.adminAuthSubscription) {
      this.adminAuthSubscription.unsubscribe();
    }
  }

  onReload() {
    this.store.dispatch(
      new DisucssAreaActions.FetchComments(this.playerId)
    );
  }

}
