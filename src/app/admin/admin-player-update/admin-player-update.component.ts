import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as PlayerUpdateActions from '../../player-update/store/player-update.actions';

import { PlayerType } from '../../shared/player-type.enum';
import { DatapackFiletype } from '../../shared/datapack-filetype.enum';
import * as PlayerUpdateModel from '../../player-update/player-update.model'

import { nationality } from '../../shared/nationality';

import * as VersionData from '../../data/VersionData';

import { ClubData } from '../../shared/database-filetype'

function removeEmpty(obj) {
  Object.keys(obj).forEach(function(key) {
    if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key])
    else if (obj[key] == null) delete obj[key]
  });
};

@Component({
  selector: 'app-admin-player-update',
  templateUrl: './admin-player-update.component.html',
  styleUrls: ['./admin-player-update.component.css']
})
export class AdminPlayerUpdateComponent implements OnInit {

  @ViewChild("f", { static: true }) form: NgForm;

  public fmVersion: string;

  public loading: boolean;
  public updateError: string;

  public fmVersionList: string[] = VersionData.fmVersionList;
  public clubs: string[];

  public playerTypeList: { key: number, val: string }[] = Object.keys(PlayerType)
    .map(Number)
    .filter(Number.isInteger)
    .map(k => ({ key: k, val: PlayerType[k] }));
  public playerUpdateTypeList: { key: number, val: string }[];
  public datepackFileTypeList: { key: number, val: string }[];
  public nationalityList: {
    name: string,
    code: string
  }[] = nationality;
  public nationalityListWithFree: {
    name: string,
    code: string
  }[] = [
    ...nationality,
    {
      name: "フリー",
      code: ""
    }
  ];

  public nationalityDropdownSettings = {
    singleSelection: true,
    idField: 'code',
    textField: 'name',
    allowSearchFilter: true
  };

  public playerNationality: string;
  public clubNationality: string;
  public previousClubNationality: string;
  public futureTransferClubNationality: string;
  public selectedFmVersion: string;
  public activeDate: string;
  public selectedPlayerType: number[] = [0];

  public keepData: boolean = false;

  private coreSubscription: Subscription;
  private playerUpdateSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.setPlayerUpdateType();
    this.setDatepackFileType();

    this.coreSubscription = this.store.select('core').subscribe(coreState => {
      this.fmVersion = coreState.fmVersion;
      this.clubs = coreState.clubs.map(c => c.clubName);
    })
    this.playerUpdateSubscription = this.store.select('playerUpdate').subscribe(playerUpdateState => {
      this.loading = playerUpdateState.loading;
      this.updateError = playerUpdateState.updateError;

      if (!this.loading) {
        this.initForm();
      }
    })
  }

  ngOnDestroy() {
    if (this.playerUpdateSubscription) {
      this.playerUpdateSubscription.unsubscribe();
    }
    if (this.coreSubscription) {
      this.coreSubscription.unsubscribe();
    }
  }

  onSubmitCreate(form: NgForm) {
    const playerName = form.value.playerName;
    const playerNameEng = form.value.playerNameEng;
    const selectedPlayerType: PlayerType[] = this.selectedPlayerType.map(v => v);
    const playerNationality = this.playerNationality;
    const player: PlayerUpdateModel.PlayerUpdatePlayer = {
      name: playerName,
      nameEng: playerNameEng,
      playerType: selectedPlayerType,
      nationality: playerNationality
    }

    const playerUpdateType = parseInt(form.value.playerUpdateType);
    const activeDate = form.value.activeDate;
    const updateDate = form.value.updateDate ? this.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss") : null;

    const clubName = form.value.clubName;
    const clubNationality = this.clubNationality;
    const club: PlayerUpdateModel.PlayerUpdateClub = {
      name: clubName,
      nationality: clubNationality,
    }

    const previousClubName = form.value.previousClubName;
    const previousClubNationality = this.previousClubNationality;
    const previousClub: PlayerUpdateModel.PlayerUpdateClub = previousClubName ? {
      name: previousClubName,
      nationality: previousClubNationality,
    } : null;

    const filetype = parseInt(form.value.filetype);
    const previousFiletype = form.value.previousFiletype !== undefined && form.value.previousFiletype !== null && form.value.previousFiletype !== '' ? parseInt(form.value.previousFiletype) : null;

    const futureTransferClubName = form.value.futureTransferClubName;
    const futureTransferClubNationality = this.futureTransferClubNationality;
    const futureTransferDate = form.value.futureTransferDate;
    const futureTransfer: {
      club: PlayerUpdateModel.PlayerUpdateClub,
      transferDate: string
    } = futureTransferClubName ? {
      club: {
        name: futureTransferClubName,
        nationality: futureTransferClubNationality,
      },
      transferDate: futureTransferDate
    } : null

    const remarks = form.value.remarks;

    const newPlayerUpdate: PlayerUpdateModel.PlayerUpdate = {
      player,
      updateType: playerUpdateType,
      activeDate,
      updateDate,
      club,
      previousClub,
      filetype,
      previousFiletype,
      futureTransfer,
      remarks,
    }
    removeEmpty(newPlayerUpdate);

    this.store.dispatch(new PlayerUpdateActions.AddPlayerHistory(newPlayerUpdate));
  }
  
  public onSearch(text$: Observable<string>) {
    return text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.clubs.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
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

  private resetPlayerType() {
    this.selectedPlayerType = [0];
  }

  private setPlayerUpdateType() {
    this.playerUpdateTypeList = Object.keys(PlayerUpdateModel.PlayerUpdateType)
      .map(Number)
      .filter(Number.isInteger)
      .map(k => ({ key: k, val: PlayerUpdateModel.PlayerUpdateType[k] }));
  }

  private setDatepackFileType() {
    this.datepackFileTypeList = Object.keys(DatapackFiletype)
      .map(Number)
      .filter(Number.isInteger)
      .map(k => ({ key: k, val: DatapackFiletype[k] }));
  }

  private initForm() {
    if (!this.keepData) {
      this.form.reset();
      this.resetPlayerType();

      setTimeout(() => {
        this.selectedFmVersion = this.fmVersion;
        this.playerNationality = "JPN";
        this.clubNationality = "JPN";
        this.previousClubNationality = "JPN";
        this.futureTransferClubNationality = "JPN";
        this.activeDate = this.formatDate(new Date(), "yyyy-MM-dd");
      }, );
    } else {
      setTimeout(() => {
        this.form.controls['playerName'].reset();
        this.form.controls['playerNameEng'].reset();
        this.activeDate = this.formatDate(new Date(), "yyyy-MM-dd");
      }, );
    }
  }

}
