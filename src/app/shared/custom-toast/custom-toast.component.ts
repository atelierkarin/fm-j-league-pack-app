import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as SharedActions from '../store/shared.actions';

@Component({
  selector: 'app-custom-toast',
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.css']
})
export class CustomToastComponent implements OnInit, OnDestroy {

  public display: boolean;
  public toastMessage: string;
  public toastStyle: string;

  private subscription: Subscription;
  private timer;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shared').subscribe(state => {
      if (state.toastContent) {
        this.display = true;
        this.toastMessage = state.toastContent;
        this.toastStyle = state.toastStyle;
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => this.hideToast(), 5000);
      }
    })
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  hideToast() {
    this.display = false;
    this.toastMessage = null;
    this.toastStyle = null;
    this.store.dispatch(new SharedActions.ClearToastContent());
  }

}
