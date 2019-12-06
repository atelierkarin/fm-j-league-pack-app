import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { PlayerType } from '../../shared/player-type.enum';
import { DatapackFiletype } from '../../shared/datapack-filetype.enum';
import { nationality } from '../../shared/nationality';
import * as PlayerUpdateModel from '../player-update.model';

import * as fromApp from '../../store/app.reducer';
import * as PlayerUpdateActions from '../store/player-update.actions';

@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent implements OnInit, OnDestroy {
  @Input() data: PlayerUpdateModel.PlayerUpdate[];
  @ViewChild('playerUpdateTable', { static: false }) table: any;

  public isAdmin: boolean;
  private adminAuthSubscription: Subscription;

  public updatedIds: string[];

  public tableMessage = {
    emptyMessage: '記録がありません',
    totalMessage: '選手を見つかりました'
  }

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.updatedIds = [];
    this.adminAuthSubscription = this.store.select('admin').subscribe(adminState => {
      this.isAdmin = adminState.isAdmin;
    });
  }

  ngOnDestroy() {
    if (this.adminAuthSubscription) {
      this.adminAuthSubscription.unsubscribe();
    }
  }

  onToggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onConfirmUpdate(targetRecord: PlayerUpdateModel.PlayerUpdate) {
    if (targetRecord && targetRecord.id && this.isAdmin) {
      this.updatedIds.push(targetRecord.id);
      this.store.dispatch(new PlayerUpdateActions.ConfirmPlayerHistory(targetRecord));
    }
  }

  getDisplayConfirmUpdateBtn(updateValue: string, targetRecord: PlayerUpdateModel.PlayerUpdate) {
    if (!this.isAdmin) return false;
    if (updateValue) return false;
    if (this.updatedIds.includes(targetRecord.id)) return false;
    return true;
  }

  getPlayerUpdateType(type) {
    return PlayerUpdateModel.PlayerUpdateType[type];
  }

  getPlayerType(type) {
    return PlayerType[type];
  }

  getDatapackFiletype(type) {
    return DatapackFiletype[type];
  }

  getPlayerUpdateTypeContentStyle(type) {
    switch (type) {
      case PlayerUpdateModel.PlayerUpdateType.追加:
        return 0;
      case PlayerUpdateModel.PlayerUpdateType.レンタル:
        return 1;
      case PlayerUpdateModel.PlayerUpdateType.レンタル延長:
        return 1;
      case PlayerUpdateModel.PlayerUpdateType.レンタル終了:
        return 2;
      case PlayerUpdateModel.PlayerUpdateType.契約更新:
        return 0;
      case PlayerUpdateModel.PlayerUpdateType.契約終了:
        return 0;
      case PlayerUpdateModel.PlayerUpdateType.移籍:
        return 3;
      case PlayerUpdateModel.PlayerUpdateType.将来の移籍:
        return 4;
      case PlayerUpdateModel.PlayerUpdateType.引退:
        return 0;
      case PlayerUpdateModel.PlayerUpdateType.役職変更:
        return 0;
      default:
        return -1
    }
  }

  getFlag(nat) {
    const targetNationality = nationality.find(n => n.code === nat)
    if (targetNationality) {
      return targetNationality.iso ? "flag-icon flag-icon-" + targetNationality.iso : ""
    }
    return ""
  }

  formattedRemarks(remark) {
    const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    const replacedText = remark.replace(replacePattern1, '<a href="$1" target="_blank">参考</a>');
    return replacedText;
  }

}
