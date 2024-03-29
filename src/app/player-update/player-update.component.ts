import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as moment from 'moment';
import 'moment/locale/ja'
moment.locale('ja');

import * as fromApp from '../store/app.reducer';
import * as PlayerUpdateActions from './store/player-update.actions';

import * as PlayerUpdateModel from './player-update.model';

import { ClubData } from '../shared/database-filetype'

import { LocaleConfig } from 'ngx-daterangepicker-material';

@Component({
  selector: 'app-player-update',
  templateUrl: './player-update.component.html',
  styleUrls: ['./player-update.component.css'],
})
export class PlayerUpdateComponent implements OnInit, OnDestroy {

  public isAdmin: boolean;
  private adminAuthSubscription: Subscription;

  public datepickerLocale: LocaleConfig = {
    applyLabel: '確認',
    customRangeLabel: ' - ',
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: moment.localeData().firstDayOfWeek(),
  }

  public fmVersion: string;
  public records: PlayerUpdateModel.PlayerUpdate[];

  public displayRecords: PlayerUpdateModel.PlayerUpdate[];

  public filterPlayerUpdateType: number[];
  public playerUpdateTypeList: { key: number, val: string }[];

  public filterClubname: string;
  public clubList: ClubData[];

  public filterPlayerName: string;

  public dateSelected: {startDate: moment.Moment, endDate: moment.Moment};

  public loadingData: boolean = true;

  public defaultDisplayDay: number = moment().month() > 10 ? 3 : 7;

  private coreSubscription: Subscription;
  private playerUpdateSubscription: Subscription;
  private loadingSubscription: Subscription;
  private reloadSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.loadingData = true;
    
    this.dateSelected = {
      startDate: moment().subtract(this.defaultDisplayDay, 'days').set('hour', 0).set('minute', 0).set('second', 0),
      endDate: moment().set('hour', 0).set('minute', 0).set('second', 0),
    }

    this.adminAuthSubscription = this.store.select('admin').subscribe(adminState => {
      this.isAdmin = adminState.isAdmin;
    });

    this.playerUpdateTypeList = Object.keys(PlayerUpdateModel.PlayerUpdateType)
      .map(Number)
      .filter(Number.isInteger)
      .map(k => ({ key: k, val: PlayerUpdateModel.PlayerUpdateType[k] }));

    this.coreSubscription = this.store.select('core').subscribe(coreState => {
      this.fmVersion = coreState.fmVersion;
      this.clubList = coreState.clubs;
    })
    this.playerUpdateSubscription = this.store
      .select('playerUpdate')
      .pipe(map(playerUpdateState => playerUpdateState.playerUpdateRecords))
      .subscribe((records: PlayerUpdateModel.PlayerUpdate[]) => {
        const sortRecords = [...records]
        this.records = sortRecords.sort((a,b) => {
          const dateA = moment(a.activeDate).valueOf();
          const dateB = moment(b.activeDate).valueOf();
          if (dateB === dateA) {
            const dateA = moment(a.updateDate).valueOf();
            const dateB = moment(b.updateDate).valueOf();
            return dateB - dateA;
          } else {
            return dateB - dateA;
          }
        });
        this.refreshDisplayRecords();
      });
    this.loadingSubscription = this.store
      .select('playerUpdate')
      .pipe(map(playerUpdateState => playerUpdateState.loading))
      .subscribe((loading: boolean) => {
        this.loadingData = loading;
      });
    this.reloadSubscription = this.store
      .select('playerUpdate')
      .pipe(map(playerUpdateState => playerUpdateState.reloadData))
      .subscribe((flagReloadData: boolean) => {
        if (flagReloadData) {
          this.onReloadPlayerUpdateRecords();
        }
      });
  }

  ngOnDestroy() {
    if (this.playerUpdateSubscription)
      this.playerUpdateSubscription.unsubscribe();
    if (this.coreSubscription)
      this.coreSubscription.unsubscribe();
    if (this.loadingSubscription)
      this.loadingSubscription.unsubscribe();
    if (this.adminAuthSubscription) 
      this.adminAuthSubscription.unsubscribe();
    if (this.reloadSubscription) 
      this.reloadSubscription.unsubscribe();
  }

  refreshDisplayRecords() {
    this.displayRecords = this.records.filter(r => {
      if (!this.filterPlayerUpdateType || this.filterPlayerUpdateType.length <= 0) return true;
      return this.filterPlayerUpdateType.includes(r.updateType)
    }).filter(r => {
      if (!this.filterClubname) return true;
      return this.filterClubname === r.club.name;
    }).filter(r => {
      if (!this.filterPlayerName) return true;
      return r.player.name.includes(this.filterPlayerName);
    })
  }

  async onReloadPlayerUpdateRecords() {
    await this.store.dispatch(new PlayerUpdateActions.ClearReloadData());
    this.loadingData = true;
    await this.store.dispatch(this.isAdmin ? new PlayerUpdateActions.FetchPlayerUpdateNU() : new PlayerUpdateActions.FetchPlayerUpdate({
      startDate: this.dateSelected.startDate.format("YYYY-MM-DD"),
      endDate: this.dateSelected.endDate.format("YYYY-MM-DD"),
    }));
  }

  onChangeDate() {
    if (this.dateSelected.endDate.diff(this.dateSelected.startDate, 'days') > this.defaultDisplayDay) {
      this.dateSelected.startDate = this.dateSelected.endDate.subtract(this.defaultDisplayDay + 1, 'days').set('hour', 0).set('minute', 0).set('second', 0);
    }
    this.onReloadPlayerUpdateRecords();
  }

  onChangeFilters() {
    this.refreshDisplayRecords();
  }

}
