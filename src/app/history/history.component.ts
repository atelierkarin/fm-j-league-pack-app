import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { History } from './history.model';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {

  public fmVersion: string;
  public history: History[];

  private historySubscription: Subscription;
  private coreSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.coreSubscription = this.store.select('core').subscribe(coreState => {
      this.fmVersion = coreState.fmVersion;
    })
    this.historySubscription = this.store
      .select('history')
      .pipe(map(historyState => historyState.history))
      .subscribe((history: History[]) => {
        this.history = history;
      });
  }

  getCurrentHistory(): History[] {
    const currentHistory = this.history.filter((h: History) => h.fmVersion === this.fmVersion);
    return currentHistory ? currentHistory : []
  }

  ngOnDestroy() {
    if (this.historySubscription)
      this.historySubscription.unsubscribe();
    if (this.coreSubscription)
      this.coreSubscription.unsubscribe();
  }

}
