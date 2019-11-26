import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as HistoryActions from '../../history/store/history.actions';

import { History } from '../../history/history.model';

import * as VersionData from '../../data/VersionData';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.css']
})
export class AdminHistoryComponent implements OnInit, OnDestroy {

  @ViewChild("f", { static: true }) historyCreateForm: NgForm;

  public loading: boolean;
  public updateError: string;

  public descriptionList: string[] = [""];
  public fmVersionList: string[] = VersionData.fmVersionList;

  private historySubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.historySubscription = this.store.select('history').subscribe(historyState => {
      this.loading = historyState.loading;
      this.updateError = historyState.updateError;

      if (!this.loading) {
        this.initForm();
      }
    })
  }

  ngOnDestroy() {
    if (this.historySubscription) {
      this.historySubscription.unsubscribe();
    }
  }

  onAddDescription() {
    this.descriptionList.push("");
  }

  onSubmitCreate(form: NgForm) {
    const fmVersion = form.value.fmVersion;
    const version = form.value.version;
    const updateDate = this.formatDate(new Date(form.value.updateDate), 'yyyy/MM/dd');
    const content = this.descriptionList.map((d, index) => {
      return form.value['description_' + index]
    }).filter(d => d)
    const newHistory = new History(updateDate, version, content, fmVersion);
    this.store.dispatch(new HistoryActions.AddHistory(newHistory));
  }

  // PRIVATE

  private formatDate(date: Date, format: string) {
    format = format.replace(/yyyy/g, '' + date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    return format;
  };

  private initForm() {
    this.descriptionList = [""];
    this.historyCreateForm.reset();
  }

}
